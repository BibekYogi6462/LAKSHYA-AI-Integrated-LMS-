import Order from "../model/orderModel.js";
import Course from "../model/courseModel.js";
import User from "../model/userModel.js";
import axios from "axios";

// Get PayPal access token
const getPayPalAccessToken = async () => {
  try {
    const auth = Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET
    ).toString("base64");

    const response = await axios.post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting PayPal access token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create PayPal order
export const createPayPalOrder = async (req, res) => {
  try {
    console.log("=== PAYPAL ORDER DEBUG ===");
    console.log("User ID:", req.userId);
    console.log("Course ID:", req.body.courseId);

    const { courseId } = req.body;
    const userId = req.userId;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Find course and user
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Course price:", course.price);
    console.log("Course title:", course.title);

    // Check if user already purchased this course
    const existingOrder = await Order.findOne({
      user: userId,
      course: courseId,
      status: "completed",
    });

    if (existingOrder) {
      return res
        .status(400)
        .json({ message: "You already purchased this course" });
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();
    console.log("PayPal access token received");

    // Create PayPal order using REST API
    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: course.price.toString(),
          },
          description: `Purchase of course: ${course.title}`,
        },
      ],
      application_context: {
        brand_name: "Lakshya LMS",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${process.env.FRONTEND_URL}/payment-success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
      },
    };

    console.log("Creating PayPal order with data:", orderData);

    const response = await axios.post(
      "https://api.sandbox.paypal.com/v2/checkout/orders",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paypalOrder = response.data;
    console.log("PayPal order created:", paypalOrder.id);

    // Create order in database
    const newOrder = await Order.create({
      user: userId,
      course: courseId,
      orderId: paypalOrder.id,
      amount: course.price,
      status: "pending",
    });

    console.log("Order saved to database:", newOrder._id);

    res.status(201).json({
      orderID: paypalOrder.id,
      status: paypalOrder.status,
    });
  } catch (error) {
    console.log("=== PAYPAL ERROR DETAILS ===");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    if (error.response) {
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
    }
    console.log("Error stack:", error.stack);
    console.log("=== END PAYPAL ERROR ===");

    res.status(500).json({
      message: "Failed to create PayPal order",
      error: error.message,
    });
  }
};

// Capture PayPal payment
export const capturePayPalOrder = async (req, res) => {
  try {
    const { orderID } = req.body;
    const userId = req.userId;

    console.log("Capturing PayPal order:", orderID);

    // Find the order in database
    const order = await Order.findOne({ orderId: orderID, user: userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Capture payment with PayPal REST API
    const response = await axios.post(
      `https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const capture = response.data;

    if (capture.status === "COMPLETED") {
      // Update order status
      order.status = "completed";
      order.paymentId = capture.purchase_units[0].payments.captures[0].id;
      order.payerId = capture.payer.payer_id;
      await order.save();

      // DEBUG: Log before adding to enrolledCourses
      console.log("=== ENROLLMENT DEBUG ===");
      console.log("User ID:", userId);
      console.log("Course ID to enroll:", order.course);

      // Add course to user's enrolled courses
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { enrolledCourses: order.course },
        },
        { new: true } // Return updated document
      );

      // DEBUG: Log after update
      console.log("Updated user enrolledCourses:", updatedUser.enrolledCourses);
      console.log("=== END ENROLLMENT DEBUG ===");

      res.status(200).json({
        message: "Payment completed successfully",
        order: order,
        capture: capture,
      });
    } else {
      order.status = "failed";
      await order.save();
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("PayPal capture error:", error);
    if (error.response) {
      console.error("PayPal capture error response:", error.response.data);
    }
    res
      .status(500)
      .json({ message: "Failed to capture payment", error: error.message });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId })
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get orders", error: error.message });
  }
};

// Check if user has purchased a course
export const checkCoursePurchase = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const order = await Order.findOne({
      user: userId,
      course: courseId,
      status: "completed",
    });

    res.status(200).json({ purchased: !!order });
  } catch (error) {
    res.status(500).json({
      message: "Failed to check purchase status",
      error: error.message,
    });
  }
};

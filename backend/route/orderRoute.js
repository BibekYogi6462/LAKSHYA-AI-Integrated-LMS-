import express from "express";
import {
  createPayPalOrder,
  capturePayPalOrder,
  getUserOrders,
  checkCoursePurchase,
} from "../controller/orderController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

// All routes are protected
router.post("/create-paypal-order", isAuth, createPayPalOrder);
router.post("/capture-paypal-order", isAuth, capturePayPalOrder);
router.get("/user-orders", isAuth, getUserOrders);
router.get("/check-purchase/:courseId", isAuth, checkCoursePurchase);

export default router;

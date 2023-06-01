import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import { createOrder, getOrders } from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

router.post("/create-payment-intent", verifyToken, paymentIntent);

export default router;

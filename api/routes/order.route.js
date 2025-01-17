import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import {  getOrders, intent } from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

router.post("/create-payment-intent/:id", verifyToken, intent);

export default router;

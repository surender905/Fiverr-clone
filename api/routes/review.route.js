import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import {
  createReview,
  deleteReview,
  getReviews,
} from "../controllers/review.controller.js";

const router = express.Router();
router.post("/", verifyToken, createReview);
router.get("/:id", getReviews);
router.delete("/:id", deleteReview);

export default router;

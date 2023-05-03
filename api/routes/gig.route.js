import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.get("/:id", getGig);
router.get("/", getGigs);
router.delete("/:id", verifyToken, deleteGig);
export default router;

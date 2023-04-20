import express from "express";
import { verifyToken } from "../middlewares/jwt";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gig.controller";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.get("/:id", verifyToken, getGig);
router.get("/", verifyToken, getGigs);
router.delete("/:id", verifyToken, deleteGig);
export default router;

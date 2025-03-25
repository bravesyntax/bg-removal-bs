import express from "express";
import { clerkWebHooks } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebHooks
);

export default userRouter;

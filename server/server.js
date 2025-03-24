import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express server...");
});
app.use("/api/user", userRouter);

// ✅ Start server only after connecting to the database
(async () => {
  try {
    await dbConnect();
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log("Listening on port " + PORT);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process if DB connection fails
  }
})();

// ✅ Export app for Vercel (for serverless functions)
export default app;

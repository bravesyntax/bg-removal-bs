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

app.get("/", (req, res) => {
  res.send("Welcome to the Express server...");
});

app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
// ✅ Export app instead of starting server directly
export default app;

// ✅ Start database connection separately
await dbConnect();

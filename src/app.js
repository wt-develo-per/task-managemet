import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(helmet()); // it will add security headers
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
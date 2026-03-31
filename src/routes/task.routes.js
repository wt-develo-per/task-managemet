import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getTasks, createTask, getSingleTask, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.get("/:id", authMiddleware, getSingleTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
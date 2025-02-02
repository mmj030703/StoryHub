import express from "express";

const app = express();

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Applying routers to specific routes
import postRouter from "./routes/post.route.js";

// Routes
app.use("/api/v1/posts", postRouter);

export { app };
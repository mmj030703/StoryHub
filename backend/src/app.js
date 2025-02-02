import express from "express";
import cors from "cors";

const app = express();

// Configure CORS
const corsOptions = {
    origin: [
        "https://story-hub-6vd5.onrender.com",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Applying routers to specific routes
import postRouter from "./routes/post.route.js";

// Routes
app.use("/api/v1/posts", postRouter);

export { app };
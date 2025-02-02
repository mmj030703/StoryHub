import { Router } from "express";
import { addPost, deletePostById, getAllPosts, getPostById, updatePostById } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const postRouter = Router();

postRouter.get("/all-posts", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/add", upload.single("image"), addPost);
postRouter.patch("/update/:id", upload.single("image"), updatePostById);
postRouter.delete("/delete/:id", deletePostById);

export default postRouter;

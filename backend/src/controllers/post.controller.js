import mongoose from "mongoose";
import Post from "../models/post.model.js";
import { deleteImage, uploadImageToImageKit } from "../utils/imagekit.js";

export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find();

        res.status(200).send({
            statusCode: "success",
            message: "Posts fetched successfully !",
            data: posts
        });
    } catch (error) {
        console.log("Get All Posts Error: ", error.message || error);
        return res.status(500).json({
            statusCode: "GET_ALL_POSTS_ERROR",
            message: `Get All Posts Error: ${error.message || error}`
        });
    }
}

export async function getPostById(req, res) {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            res.status(400).send({
                statusCode: "GET_POST_BY_ID_ERROR",
                message: "An error occurred while getting the post !",
            });
        }

        res.status(200).send({
            statusCode: "success",
            message: "Post fetched successfully !",
            data: post
        });
    } catch (error) {
        console.log("Get Post By Id Error: ", error.message || error);
        return res.status(500).json({
            statusCode: "GET_POST_BY_ID_ERROR",
            message: `Get Post By Id Error: ${error.message || error}`
        });
    }
}

export async function addPost(req, res) {
    try {
        const { title, description } = req.body;

        if (!title || !description || title.trim() === "" || description.trim() === "") {
            return res.status(400).json({
                statusCode: "EMPTY_FIELDS_ERROR",
                message: "Fields cannot be empty !"
            });
        }

        // Handling Image
        const postImage = req.file;

        if (!postImage) {
            return res.status(400).json({
                statusCode: "IMAGE_NOT_UPLOADED_ERROR",
                message: "Image is mandatory !"
            });
        }

        // Check images type and size
        if (!postImage.mimetype.startsWith("image")) {
            return res.status(400).json({ errorCode: "NOT_IMAGE_ERROR", message: "Post image should be an image file !" });
        }

        if (postImage.size > 2 * 1024 * 1024) {
            return res.status(400).json({ errorCode: "IMAGE_SIZE_EXCEEDED", message: "Image upto 2mb size is only allowed !" });
        }

        let postImagefromImageKit;

        try {
            // Uploading image to imagekit
            postImagefromImageKit = await uploadImageToImageKit(postImage.path);
        } catch (error) {
            console.log("Upload Image to Imagekit Error: ", error.message || error);
            return res.status(500).json({
                statusCode: "ADD_POST_ERROR",
                message: `Upload Image to Imagekit Error: ${error.message || error}`
            });
        }

        const post = await Post.create({
            title,
            description,
            imageSrc: postImagefromImageKit.url,
            imageId: postImagefromImageKit.fileId
        });

        if (!post) {
            return res.status(400).json({
                statusCode: "ADD_POST_ERROR",
                message: "An error occurred while creating the post !"
            });
        }

        res.status(201).send({
            status: "success",
            message: "Post created successfully !",
            data: post
        });

    } catch (error) {
        console.log("Add Post Error: ", error.message || error);
        return res.status(500).json({
            statusCode: "ADD_POST_ERROR",
            message: `Add Post Error: ${error.message || error}`
        });
    }
}

export async function updatePostById(req, res) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!id || id.trim() === "") {
            return res.status(400).json({ errorCode: POST_ID_MISSING_ERROR, message: "Post Id is missing !" });
        }

        if ((title && (title.trim() === "")) || (description && (description.trim() === ""))) {
            return res.status(400).json({ errorCode: "FIELDS_EMPTY_ERROR", message: "Title and Description cannot be empty !" });
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ errorCode: "INVALID_ID_ERROR", message: "Post Id is not a valid Id !" });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(400).json({ errorCode: "POST_DOES_NOT_EXIST", message: "Post do not exist !" });
        }

        let postImage = null;

        if (req.file) {
            const image = req.file;
            try {
                // Check images type and size
                if (!image.mimetype.startsWith("image")) {
                    return res.status(400).json({ errorCode: "NOT_IMAGE_ERROR", message: "Post image should be an image file !" });
                }

                if (image.size > 2 * 1024 * 1024) {
                    return res.status(400).json({ errorCode: "IMAGE_SIZE_EXCEEDED", message: "Image upto 2mb size is only allowed !" });
                }

                // delete current image which has to be updated
                await deleteImage(post.imageId);
                postImage = await uploadImageToImageKit(image.path);
            } catch (error) {
                console.log("Imagekit Image Updation Error: ", error.message || error);
                return res.status(500).json({ error: error.message || error, errorCode: "UPDATE_POST_ERROR", message: "Imagekit Image Updation:: Internal Server Error !" });
            }
        }

        // Update fields explicitly
        if (title) post.title = title;
        if (description) post.description = description;

        if (postImage) {
            post.imageSrc = postImage.url;
            post.imageId = postImage.fileId;
        }

        await post.save();

        res.status(200)
            .send({
                status: "success",
                message: "Post details updated successfully",
                data: post
            });

    } catch (error) {
        console.log("Update Post Error: ", error.message || error);
        return res.status(500).json({
            statusCode: "UPDATE_POST_ERROR",
            message: `Update Post Error: ${error.message || error}`
        });
    }
}

export async function deletePostById(req, res) {
    try {
        const { id } = req.params;

        if (!id || id.trim() === "") {
            return res.status(400).json({ errorCode: POST_ID_MISSING_ERROR, message: "Post Id is missing !" });
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ errorCode: "INVALID_ID_ERROR", message: "Post Id is not a valid Id !" });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(400).json({ errorCode: "POST_DOES_NOT_EXIST", message: "Post do not exist !" });
        }

        let postImageId = post.imageId;

        try {
            // delete image for the post
            await deleteImage(post.imageId);
        } catch (error) {
            console.log("Imagekit Image Deletion Error: ", error.message || error);
            return res.status(500).json({ error: error.message || error, errorCode: "DELETE_POST_ERROR", message: "Imagekit Image Deletion:: Internal Server Error !" });
        }

        // Delete post from db
        const deletedPost = await Post.findByIdAndDelete(id);

        res.status(200)
            .send({
                status: "success",
                message: "Post deleted successfully !",
                data: post
            });

    } catch (error) {
        console.log("Delete Post Error: ", error.message || error);
        return res.status(500).json({
            statusCode: "DELETE_POST_ERROR",
            message: `Delete Post Error: ${error.message || error}`
        });
    }
}
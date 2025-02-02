import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    },
    imageId: String,
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
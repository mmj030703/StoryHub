import ImageKit from "imagekit";
import fs from "fs";

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


// File Upload
export const uploadImageToImageKit = async (filePath) => {
    try {
        const result = await imagekit.upload({
            file: fs.readFileSync(filePath), // Path to the image
            fileName: `image-${new Date()}-${Math.floor(Math.random() * 1e6)}`, // Desired file name
            folder: "/StoryHub",
        });
        console.log("Image uploaded successfully:", result.url);
        return result;
    } catch (error) {
        console.error("Error uploading image:", error.message);
        throw error;
    } finally {
        fs.unlinkSync(filePath);
    }
};

export async function deleteImage(fileId) {
    try {
        const deletedImage = await imagekit.deleteFile(fileId);
        return true;
    } catch (error) {
        throw new Error("An error occurred while deleting file !");
    }
}
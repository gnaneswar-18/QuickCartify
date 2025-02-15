import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});

const deleteImageCloudinary = async (imageUrl) => {
    try {
        const imageid = extractPublicId(imageUrl);
        if (!imageid) {
            throw new Error("Invalid image URL");
        }

        const result = await cloudinary.uploader.destroy(imageid);
        console.log("Delete Response:", result);
        return result;
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
    }
};

const extractPublicId = (url) => {
    try {
        const parts = url.split("/");
        const filename = parts[parts.length - 1]; 
        const publicId = filename.split(".")[0]; 
        return `ecommerce/${publicId}`; 
    } catch (error) {
        console.error("Failed to extract Public ID:", error);
        return null;
    }
};

export default deleteImageCloudinary;

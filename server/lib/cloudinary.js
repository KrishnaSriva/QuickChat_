import { v2 as cloudinary } from "cloudinary";

let cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

if (process.env.CLOUDINARY_URL) {
    // cloudinary://API_KEY:API_SECRET@CLOUD_NAME
    const match = process.env.CLOUDINARY_URL.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
    if (match) {
        cloudinaryConfig = {
            api_key: match[1],
            api_secret: match[2],
            cloud_name: match[3]
        };
    }
}

cloudinary.config(cloudinaryConfig);

export default cloudinary;
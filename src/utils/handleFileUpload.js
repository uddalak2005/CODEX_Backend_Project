import uploadToCloudinary from '../services/cloudinary.service.js';
import fs from 'fs';

async function handleMultipleUploads(req, resourceType = 'image') {
    if (!req.files || !req.files.images || req.files.images.length === 0) {
        return [];
    }

    const uploadedImages = [];

    for (const file of req.files.images) {
        const filePath = file.path;

        try {
            const type = resourceType || (file.mimetype.startsWith('image/') ? 'image' : 'raw');
            const result = await uploadToCloudinary(filePath, type);

            // Remove file from local temp storage after upload
            fs.unlinkSync(filePath);

            // Push only secure URL or public ID (based on model requirement)
            uploadedImages.push(result.url);

        } catch (err) {
            fs.unlinkSync(filePath);
            console.error(`Failed to upload ${file.originalname}: ${err.message}`);
        }
    }

    return uploadedImages;
}

export default handleMultipleUploads;
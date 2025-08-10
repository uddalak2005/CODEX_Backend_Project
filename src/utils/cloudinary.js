import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
// import dotenv from "dotenv";

// dotenv.config({
//     path: './.env'
// })

cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary=async (localFilePath) => {
        try{
            if(!localFilePath) return null;
            const response =await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
            // console.log("response dedo bhai",response);

            //file has been uploaded successfull
            console.log("file is uploaded on cloudinary",
            response.url);
            return response;
        }catch(error){
                console.error("Cloudinary upload error:", error);
                
                // Safely unlink if file exists
                if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
                }
                
                return null; // ✅ Return null if upload failed // remove the locally saved temporary  file as the upload 
        }
    }

    const deleteFromCloudinary=async(public_id,resource_type="image")=>{
        try {
            console.log("lalalala",public_id);
            if(!public_id) return null;
            const response=await cloudinary.uploader.destroy(public_id,{
                resource_type:resource_type,
            })
            console.log("Deleted",response);
            return response;
        } catch (error) {
            console.error("Cloudinary couldn't delete",error);
        return null;
        }
        
    }

export {
    uploadOnCloudinary,
    deleteFromCloudinary
};
// Upload an image
//         const uploadResult = await cloudinary.uploader
//         .upload(
//         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//             public_id: 'shoes',
//         }
//         )
//         .catch((error) => {
//         console.log(error);
//         });

// console.log(uploadResult);
import B2 from "backblaze-b2";
import { B2_KEY_ID, APPLICATIONKEY, B2_BUCKET_ID, B2_BUCKET_NAME } from "../config/env.js";

const b2 = new B2({
    applicationKeyId: B2_KEY_ID, 
    applicationKey: APPLICATIONKEY, 
});

// Initialize Backblaze B2
const initializeB2 = async () => {
    try {
        await b2.authorize(); 
    } catch (error) {
        console.error("Error initializing Backblaze B2:", error);
        throw error;
    }
};

// Upload a file to Backblaze B2
export const uploadToB2 = async (fileBuffer, fileName) => {
    try {
        await initializeB2();

        // Get the upload URL
        const { data: uploadUrlData } = await b2.getUploadUrl({
            bucketId: B2_BUCKET_ID,
        });

        // Upload the file
        const { data: uploadData } = await b2.uploadFile({
            uploadUrl: uploadUrlData.uploadUrl,
            uploadAuthToken: uploadUrlData.authorizationToken,
            fileName: fileName,
            data: fileBuffer,
        });

        // Return the file URL
        return `https://f002.backblazeb2.com/file/${B2_BUCKET_NAME}/${uploadData.fileName}`;
    } catch (error) {
        console.error("Error uploading to Backblaze B2:", error);
        throw error;
    }
};
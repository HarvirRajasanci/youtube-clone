import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

const storage = new Storage();

const rawVideoBucketName = "hr-yt-raw-videos";
const processedVideoBucketName = "hr-yt-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * Creates the local directories for the raw and processed videos.
 * @returns void
*/
export function setupDirectories() {
    
}

/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}
 * @returns A promise that resolves to the path of the processed video
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
        .outputOptions("-vf", "scale=1280:720")
        .outputOptions("-c:v", "libx264")
        .outputOptions("-preset", "medium")
        .outputOptions("-crf", "23")
        .outputOptions("-c:a", "aac")
        .outputOptions("-b:a", "128k")
        .on("end", () => { 
            console.log("Video processing completed");
            resolve();
        })
        .on("error", (err) => {
            console.error("Error processing video:", err);
            reject(err);
        })
        .save(`${localProcessedVideoPath}/${processedVideoName}`)
    })
}

/**
 * @param fileName - The name of the file to download from the
 * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been downloaded.
 */
export async function downloadRawVideo(fileName: string) {
    
}

/**
 * @param fileName - The name of the file to download from the
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}.
 * @returns A promise that resolves when the file has been downloaded.
 */
export async function uploadProcessedVideo(fileName: string){
}
import express, { Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/process-video", (req: Request, res: Response) => {
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        return res.status(400).json({ error: "Bad Request: Missing input or output file path" });
    }

    ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=1280:720")
    .outputOptions("-c:v", "libx264")
    .outputOptions("-preset", "medium")
    .outputOptions("-crf", "23")
    .outputOptions("-c:a", "aac")
    .outputOptions("-b:a", "128k")
    .on("end", () => { 
        res.status(200).json({ message: "Video processing completed" });
    })
    .on("error", (err) => {
        console.error("Error processing video:", err);
        res.status(500).json({ error: "Internal Server Error: " + err.message });
    })
    .save(outputFilePath)
});

// Simple test endpoint
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Video Processing Service is running!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video processing service running on port ${port}`);
});

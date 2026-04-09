import { NextRequest, NextResponse } from "next/server";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import { requireAuth } from "@/lib/auth";

// FTP configuration
const FTP_CONFIG = {
  host: process.env.FTP_HOST || "",
  user: process.env.FTP_USER || "",
  password: process.env.FTP_USER_PASSWORD || "",
  secure: true,
};

const allowedUploadDirectories = new Set([
  "bicycle-photos",
  "carpentry-photos",
  "electronics-photos",
  "finance-receipts",
  "team-photos",
]);

const maxUploadBytes = 10 * 1024 * 1024;

type DetectedUploadType = {
  extension: string;
};

function detectUploadType(buffer: Buffer): DetectedUploadType | null {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]))) {
    return { extension: "png" };
  }

  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { extension: "jpg" };
  }

  if (
    buffer.length >= 6 &&
    (buffer.subarray(0, 6).toString("ascii") === "GIF87a" ||
      buffer.subarray(0, 6).toString("ascii") === "GIF89a")
  ) {
    return { extension: "gif" };
  }

  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return { extension: "webp" };
  }

  if (buffer.length >= 5 && buffer.subarray(0, 5).toString("ascii") === "%PDF-") {
    return { extension: "pdf" };
  }

  return null;
}

function getTargetDirectory(path: string[]) {
  if (path.length !== 1) {
    return null;
  }

  const [directory] = path;
  return allowedUploadDirectories.has(directory) ? `/${directory}` : null;
}

// Handle POST requests to upload files
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const token = await requireAuth(request);
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const targetDir = getTargetDirectory(path);
    if (!targetDir) {
      return NextResponse.json(
        { error: "Invalid upload directory" },
        { status: 400 }
      );
    }

    if (file.size <= 0 || file.size > maxUploadBytes) {
      return NextResponse.json(
        { error: "File must be between 1 byte and 10MB" },
        { status: 400 }
      );
    }
    
    // Get the file as an ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const detectedType = detectUploadType(buffer);

    if (!detectedType) {
      return NextResponse.json(
        { error: "Only PNG, JPEG, GIF, WEBP, and PDF files are allowed" },
        { status: 400 }
      );
    }

    // Generate a unique filename using the detected type, not the client-provided name.
    const uniqueId = uuidv4();
    const fileName = `${uniqueId}.${detectedType.extension}`;
    
    // Create a readable stream from the buffer
    const stream = Readable.from(buffer);

    // Upload to FTP server
    const client = new ftp.Client();
    try {
      await client.access(FTP_CONFIG);
      
      // Create a directory if it doesn't exist
      try {
        await client.ensureDir(targetDir);
      } catch (error) {
        console.error("Error creating directory:", error);
      }
      
      // Upload the file directly from the stream
      const filePath = `${targetDir}/${fileName}`;
      await client.uploadFrom(stream, filePath);
      
      // Return the file path
      return NextResponse.json({ 
        success: true, 
        filePath: filePath
      });
    } catch (error) {
      console.error("FTP upload error:", error);
      return NextResponse.json(
        { error: "Failed to upload file to FTP server" },
        { status: 500 }
      );
    } finally {
      client.close();
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
} 

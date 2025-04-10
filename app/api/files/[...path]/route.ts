import { NextRequest, NextResponse } from "next/server";
import ftp from "basic-ftp";
import { getToken } from "next-auth/jwt";
import { Readable } from "stream";
import { Writable } from "stream";
import { v4 as uuidv4 } from "uuid";

// FTP configuration
const FTP_CONFIG = {
  host: process.env.FTP_HOST || "",
  user: process.env.FTP_USER || "",
  password: process.env.FTP_USER_PASSWORD || "",
  secure: true,
};

// Handle GET requests to retrieve files
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    // Check authentication using the existing NextAuth JWT
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the file path from the URL
    const filePath = `/${path.join("/")}`;
    
    // Connect to FTP server
    const client = new ftp.Client();
    try {
      await client.access(FTP_CONFIG);
      
      // Create a buffer to store the file
      const chunks: Buffer[] = [];
      
      // Create a writable stream that collects chunks
      const writable = new Writable({
        write(chunk, encoding, callback) {
          chunks.push(Buffer.from(chunk));
          callback();
        }
      });
      
      // Download the file to the writable stream
      await client.downloadTo(writable, filePath);
      
      // Combine the chunks into a single buffer
      const buffer = Buffer.concat(chunks);
      
      // Determine the content type based on the file extension
      const fileExtension = filePath.split(".").pop()?.toLowerCase();
      let contentType = "application/octet-stream";
      
      if (fileExtension === "jpg" || fileExtension === "jpeg") {
        contentType = "image/jpeg";
      } else if (fileExtension === "png") {
        contentType = "image/png";
      } else if (fileExtension === "gif") {
        contentType = "image/gif";
      } else if (fileExtension === "webp") {
        contentType = "image/webp";
      }
      
      // Return the file as a response
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `inline; filename="${filePath.split("/").pop()}"`,
        },
      });
    } catch (error) {
      console.error("FTP download error:", error);
      return NextResponse.json(
        { error: "Failed to download file from FTP server" },
        { status: 500 }
      );
    } finally {
      client.close();
    }
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to process download" },
      { status: 500 }
    );
  }
}

// Handle POST requests to upload files
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    // Check authentication using the existing NextAuth JWT
    const token = await getToken({ req: request });
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

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const uniqueId = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uniqueId}.${fileExtension}`;
    
    // Get the file as an ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a readable stream from the buffer
    const stream = Readable.from(buffer);
    
    // Determine the target directory from the path parameter or use default
    const targetDir = path.length > 0 
      ? `/${path.join("/")}` 
      : "/bicycle-photos";
    
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
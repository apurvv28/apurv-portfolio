const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

try {
  const envPath = path.join(__dirname, "..", ".env");
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const firstEqual = trimmed.indexOf("=");
    if (firstEqual === -1) return;
    const key = trimmed.slice(0, firstEqual).trim();
    const val = trimmed.slice(firstEqual + 1).trim();
    process.env[key] = val;
  });
} catch (e) {
  console.log("No .env file found or read error:", e.message);
}

const client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function run() {
  try {
    const bucket = process.env.AWS_S3_BUCKET;
    const region = process.env.AWS_REGION || "us-east-1";
    
    console.log("Writing public-read test file with ACL: 'public-read'...");
    const putCmd = new PutObjectCommand({
      Bucket: bucket,
      Key: "uploads/blogs/test-public-acl.txt",
      Body: "Hello from public S3 with ACL!",
      ContentType: "text/plain",
      ACL: "public-read"
    });
    await client.send(putCmd);
    
    const url = `https://${bucket}.s3.${region}.amazonaws.com/uploads/blogs/test-public-acl.txt`;
    console.log("HTTP GET request to URL:", url);
    
    const resp = await fetch(url);
    console.log("HTTP Response Status:", resp.status);
    if (resp.ok) {
      const text = await resp.text();
      console.log("Success! File is publicly readable with ACL. Content:", text);
    } else {
      console.log("Failed! File with ACL is NOT publicly readable. Status text:", resp.statusText);
    }
  } catch (error) {
    console.error("ERROR during check:", error);
  }
}

run();

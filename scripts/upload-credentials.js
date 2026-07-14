const fs = require("node:fs/promises");
const path = require("node:path");
const { put } = require("@vercel/blob");

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("Error: BLOB_READ_WRITE_TOKEN environment variable is not defined.");
    console.error("Please run the script by setting the token. For example, in PowerShell:");
    console.error('  $env:BLOB_READ_WRITE_TOKEN="your_token_here"; node scripts/upload-credentials.js');
    process.exit(1);
  }

  const credentialsPath = path.join(__dirname, "..", "config", "admin-credentials.json");
  try {
    const raw = await fs.readFile(credentialsPath, "utf8");
    console.log("Uploading credentials to Vercel Blob...");
    const blob = await put("admin-credentials.json", raw, {
      access: "public",
      addRandomSuffix: false,
      token: token
    });
    console.log("\nSuccess!");
    console.log("Uploaded URL: " + blob.url);
    console.log("\nPlease copy this URL and update the 'ADMIN_CREDENTIALS_BLOB_URL' environment variable in your Vercel Project Settings.");
  } catch (error) {
    console.error("Failed to upload credentials:", error.message || error);
    process.exit(1);
  }
}

main();

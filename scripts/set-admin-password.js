const fs = require("node:fs/promises");
const path = require("node:path");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const bcrypt = require("bcryptjs");

async function loadEnvFiles(projectRoot) {
  const files = [".env", ".env.local"];
  for (const file of files) {
    try {
      const content = await fs.readFile(path.join(projectRoot, file), "utf8");
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const index = trimmed.indexOf("=");
        if (index === -1) return;
        const key = trimmed.slice(0, index).trim();
        let val = trimmed.slice(index + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      });
    } catch {
      // ignore missing env files
    }
  }
}

async function main() {
  const rl = readline.createInterface({ input, output });
  const projectRoot = path.resolve(__dirname, "..");
  await loadEnvFiles(projectRoot);

  try {
    const password = await rl.question("Enter the new admin password: ");
    const confirm = await rl.question("Confirm the new admin password: ");

    if (!password || password !== confirm) {
      throw new Error("Passwords did not match.");
    }

    if (password !== password.trim()) {
      throw new Error("Password has leading or trailing spaces. Remove them and try again.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const credentials = {
      passwordHash: hashedPassword,
      updatedAt: new Date().toISOString()
    };

    const configDir = path.join(projectRoot, "config");
    await fs.mkdir(configDir, { recursive: true });
    const credentialsPath = path.join(configDir, "admin-credentials.json");
    await fs.writeFile(
      credentialsPath,
      `${JSON.stringify(credentials, null, 2)}\n`,
      "utf8"
    );

    console.log(`Saved locally to ${credentialsPath}`);

    // Auto-upload to S3 if configured
    const s3Configured = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_S3_BUCKET;
    if (s3Configured) {
      console.log("AWS S3 config detected. Uploading admin-credentials.json to S3...");
      const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
      const client = new S3Client({
        region: process.env.AWS_REGION || "us-east-1",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
      });
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: "config/admin-credentials.json",
        Body: JSON.stringify(credentials, null, 2),
        ContentType: "application/json"
      });
      await client.send(command);
      console.log(`Successfully uploaded admin credentials to S3 bucket: ${process.env.AWS_S3_BUCKET}`);
    } else {
      console.log("AWS S3 not configured. Saved locally only.");
    }

    const verified = await bcrypt.compare(password, hashedPassword);
    if (!verified) {
      throw new Error("Password hash verification failed after writing credentials.");
    }
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
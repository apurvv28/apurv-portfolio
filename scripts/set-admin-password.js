const fs = require("node:fs/promises");
const path = require("node:path");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const bcrypt = require("bcryptjs");

async function main() {
  const rl = readline.createInterface({ input, output });
  const projectRoot = path.resolve(__dirname, "..");

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

    const verified = await bcrypt.compare(password, hashedPassword);
    if (!verified) {
      throw new Error("Password hash verification failed after writing credentials.");
    }

    console.log(`Saved ${credentialsPath}`);
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
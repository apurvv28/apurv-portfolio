const fs = require("node:fs/promises");
const path = require("node:path");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const bcrypt = require("bcryptjs");

async function main() {
  const rl = readline.createInterface({ input, output });
  const projectRoot = path.resolve(__dirname, "..");

  try {
    const password = await rl.question("Enter the password to verify: ");
    const credentialsPath = path.join(projectRoot, "config", "admin-credentials.json");
    const raw = await fs.readFile(credentialsPath, "utf8");
    const credentials = JSON.parse(raw);

    if (!credentials.passwordHash) {
      throw new Error("passwordHash is missing from config/admin-credentials.json");
    }

    const match = await bcrypt.compare(password, credentials.passwordHash);
    console.log(match ? "MATCH" : "NO MATCH");
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
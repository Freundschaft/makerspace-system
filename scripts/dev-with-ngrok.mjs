import ngrok from "@ngrok/ngrok";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadDotEnv() {
  const envPath = resolve(process.cwd(), ".env");

  try {
    const contents = readFileSync(envPath, "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      const value = rawValue.replace(/^"(.*)"$/, "$1");

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignore missing local env file in dev launcher.
  }
}

loadDotEnv();

const port = process.env.PORT || "3000";
const authUrl = process.env.NEXTAUTH_URL || "";
const ngrokAuthtoken = process.env.NGROK_AUTHTOKEN || "";
let ngrokListener = null;

function startProcess(command, args, label) {
  const useShell = process.platform === "win32";
  const child = spawn(command, args, {
    stdio: "inherit",
    env: process.env,
    shell: useShell,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`${label} exited with signal ${signal}`);
      return;
    }

    if (typeof code === "number" && code !== 0) {
      console.error(`${label} exited with code ${code}`);
      process.exitCode = code;
    }
  });

  return child;
}

function getNgrokDomain(url) {
  if (!url) {
    return null;
  }

  try {
    const hostname = new URL(url).hostname;
    return hostname.includes("ngrok") ? hostname : null;
  } catch {
    return null;
  }
}

const children = [];

const nextArgs = ["next", "dev", "--turbopack", "--hostname", "0.0.0.0", "--port", port];
children.push(startProcess("npx", nextArgs, "Next.js dev server"));

const ngrokDomain = getNgrokDomain(authUrl);
if (ngrokDomain) {
  try {
    ngrokListener = await ngrok.forward({
      addr: Number(port),
      authtoken: ngrokAuthtoken || undefined,
      domain: ngrokDomain,
    });
    console.log(`ngrok tunnel established at ${ngrokListener.url()}`);
  } catch (error) {
    console.error("Failed to start ngrok tunnel:", error);
  }
} else {
  console.warn("Skipping ngrok startup because NEXTAUTH_URL is not an ngrok URL.");
}

async function shutdown(signal) {
  if (ngrokListener) {
    await ngrokListener.close();
  }
  for (const child of children) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});
process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

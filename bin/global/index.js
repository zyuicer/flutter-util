import { fileURLToPath } from "url";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";

export const __dirname = resolve(fileURLToPath(import.meta.url), "../../");
export const mapPath = resolve(__dirname, "./map");
export const mapDetail = JSON.parse(
  readFileSync(resolve(mapPath, "./index.json"), "utf-8")
);

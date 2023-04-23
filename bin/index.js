#!/usr/bin/env node
import { createWidgetProcess } from "./command/index.js";
import { fileURLToPath } from "node:url";
import { program } from "commander";
import { initCustomTemplateProcess } from "./command/initCustomTemplate.js";

createWidgetProcess();
initCustomTemplateProcess();
program.version("0.0.1").name("fu");
try {
  program.parse();
} catch (err) {
  console.log(err.message);
}

const __dirname = fileURLToPath(import.meta.url);

// async function main() {
//   const { staticPath, customPath } = JSON.parse(
//     readFileSync(resolve(mapPath, "./index.json"))
//   );
//   console.log(staticPath);
//   const { mapMatch } = await querstionsProcess({
//     ...staticPath,
//     ...customPath,
//   });
// }

// function parsetMapEjs(path) {}

// async function querstionsProcess(map) {
//   const questionsDetail = await questions(map);
//   console.log(questionsDetail);
// }

// createMkdirProcess("foo");
// main();

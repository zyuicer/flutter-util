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

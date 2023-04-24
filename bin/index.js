#!/usr/bin/env node
import { program } from "commander";
import {
  createWidgetProcess,
  initCustomTemplateProcess,
} from "./command/index.js";

createWidgetProcess();
initCustomTemplateProcess();
program.version("0.0.1").name("fu");

try {
  program.parse();
} catch (err) {
  console.log(err.message);
}

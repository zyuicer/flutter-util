import { program } from "commander";
import { resolve } from "node:path";
import { mapPath, mapDetail } from "../global/index.js";
import { hasOwn } from "../shared/verify/index.js";
import { customerHasOwnKey } from "../questions/initCustomTemplate.js";
import { cwd } from "node:process";
import { existsSync, writeFileSync } from "node:fs";
import chalk from "chalk";
export function initCustomTemplateProcess(fileName) {
  program
    .command("init")
    .argument("<customeKey>")
    .argument("<templatePath>")
    .action(initCustomTemplateAction);
}

async function initCustomTemplateAction(customeKey, templatePath) {
  if (hasOwn(mapDetail.customPath, customeKey)) {
    const { isChange } = await customerHasOwnKey(customeKey);
    if (isChange) {
      const isExist = await createCustomTemplate(customeKey, templatePath);
      isExist && console.log(chalk.green(`[${customeKey}]模板替换成功`));
    }
    return;
  } else {
    const isExist = await createCustomTemplate(customeKey, templatePath);
    isExist && console.log(chalk.green(`[${customeKey}]模板收纳成功`));
    return;
  }
}

async function createCustomTemplate(key, path) {
  const fullPath = resolve(cwd(), path);
  const isExist = existsSync(fullPath);
  if (!isExist) {
    console.log(chalk.yellow(`[${fullPath}]路径文件不存在`));
    return false;
  }
  mapDetail.customPath[key] = fullPath;
  writeFileSync(resolve(mapPath, "./index.json"), JSON.stringify(mapDetail));
}

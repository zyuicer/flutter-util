import { program } from "commander";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import chalk from "chalk";
import questions from "../questions/index.js";
import { mapPath, mapDetail, __dirname } from "../global/index.js";
import ejs from "ejs";
import { hasOwn } from "../shared/verify/index.js";
import { converSnackKey, converGreatHump } from "../shared/replace/snack.js";
import { cwd } from "node:process";
import { createFile, createFolderProcess } from "../shared/mkdir/index.js";

export function createWidgetProcess() {
  program
    .command("create")
    .argument("<filename>")
    .option("-F --fold <foldname>")
    .option("-C --className <classname>")
    .action(crateWidgetAction);
}

async function crateWidgetAction(filename, options) {
  const mapMatch = await questionProcess();
  const template = parsetMatchFile(mapMatch);
  const code = renderEjs(template, {
    data: {
      filename: converGreatHump(
        converSnackKey(options.className ? options.className : filename)
      ),
    },
  });
  if (options.fold) {
    createFolderProcess(options.fold);
    createFileProcess(
      resolve(cwd(), `${options.fold}/${converSnackKey(filename)}.dart`),
      code
    );
    console.log(
      chalk.green(`[${options.fold}/${converSnackKey(filename)}.dart]创建成功`)
    );
  } else {
    createFileProcess(resolve(cwd(), `${converSnackKey(filename)}.dart`), code);
    chalk.green(`[${converSnackKey(filename)}.dart]创建成功`);
  }
}

async function questionProcess() {
  const { staticPath, customPath } = JSON.parse(
    readFileSync(resolve(mapPath, "./index.json"))
  );

  const { mapMatch } = await querstionsProcess({
    ...staticPath,
    ...customPath,
  });
  return mapMatch;
}

/** 获得提问答案 */
async function querstionsProcess(map) {
  const questionsDetail = await questions(map);
  return questionsDetail;
}

/** 匹配静态的 模板和自定义的模板 */
function parsetMatchFile(mapMatch) {
  if (hasOwn(mapDetail.customPath, mapMatch)) {
    if (existsSync(mapDetail.customPath[mapMatch]))
      return console.log(
        chalk.red(`[${mapDetail.customPath[mapMatch]}]文件路径失效`)
      );
    return readFileSync(resolve(mapDetail.customPath[mapMatch]), "utf-8");
  } else if (hasOwn(mapDetail.staticPath, mapMatch)) {
    return readFileSync(
      resolve(mapPath, mapDetail.staticPath[mapMatch]),
      "utf-8"
    );
  }
  console.log(chalk.redBright("模板查找错误"));
}

/** ejs创建文件数据 */
function renderEjs(template, options) {
  const ejsCode = ejs.render(template, options);
  return ejsCode;
}

/** 创建文件 */
function createFileProcess(filename, code) {
  createFile(resolve(cwd(), filename), code);
}

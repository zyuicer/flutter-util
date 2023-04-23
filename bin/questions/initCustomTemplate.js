import chalk from "chalk";
import inquirer from "inquirer";

export async function customerHasOwnKey(customeKey) {
  return await inquirer.prompt({
    type: "confirm",
    name: "isChange",
    message: chalk.yellowBright(`[${customeKey}]模板已存在是否替换`),
  });
}

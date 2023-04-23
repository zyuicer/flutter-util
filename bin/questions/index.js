import inquirer from "inquirer";
export const widgetMap = {
  statelessWidget: "statelessWidget",
};

export default async (map) => {
  const mapMatchList = Object.keys(map).map((key) => {
    return {
      name: key,
    };
  });
  const r = await inquirer.prompt([
    {
      type: "rawlist",
      name: "mapMatch",
      message: "模板选择",
      choices: mapMatchList,
    },
  ]);
  return r;
};

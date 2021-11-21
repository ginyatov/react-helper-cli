import fs from "fs";
import chalk from "chalk";

export const setFirstLetterBig = (name: string) => {
  console.log("name", name);
  return name[0].toUpperCase() + name.slice(1);
};

export const writeFile = (
  pathToFile: string,
  content: string,
  fileName?: string
) => {
  fs.writeFile(pathToFile, content, (error) => {
    if (error) {
      console.log(`Error create saga file: ${error}`);
    } else {
      if (fileName) {
        console.log(`✅  ${chalk.green(`${fileName} - created successfully`)}`);
      }
    }
  });
};

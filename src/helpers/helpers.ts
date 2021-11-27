import fs, { existsSync, outputFile, outputFileSync } from "fs-extra";
import chalk from "chalk";
import { environment } from "@config/environment";
import { prompt } from "inquirer";
import { generatorsProps, ReturnGeneratorProps } from "@customTypes/index";

export const setFirstLetterBig = (name: string) =>
  name[0].toUpperCase() + name.slice(1);

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

export const jsonFile = `${environment.CONFIG_NAME_JSON}.json`;

export const tryCreateFile = (templateComponent: ReturnGeneratorProps) => {
  if (existsSync(templateComponent.componentPath)) {
    return prompt([
      {
        type: "confirm",
        name: "overwriteFile",
        message: `File ${templateComponent.filename} is existing, overwrite?`,
        default: false,
      },
    ]).then((answers) => {
      console.log(answers);
      if (answers.overwriteFile) {
        return outputFile(
          templateComponent.componentPath,
          templateComponent.template
        );
      }
    });
  } else {
    return outputFile(
      templateComponent.componentPath,
      templateComponent.template
    );
  }
};

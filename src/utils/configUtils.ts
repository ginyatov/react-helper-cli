import chalk from "chalk";
import { prompt } from "inquirer";
import { outputFileSync } from "fs-extra";
import { environment } from "@config/environment";
import { jsonFile } from "@helpers/helpers";

const basicQuestions = [
  {
    type: "confirm",
    name: "usesTypeScript",
    message: "Does this project use TypeScript?",
  },
  {
    type: "confirm",
    name: "usesCssModule",
    message: "Does this project use CSS modules?",
  },
  {
    type: "list",
    name: "cssPreprocessor",
    message: "Does this project use a CSS Preprocessor?",
    choices: ["css", "scss", "less", "styl"],
  },
];

export async function createCLIConfigFile() {
  try {
    console.log();
    console.log(
      chalk.cyan(
        "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
      )
    );
    console.log(
      chalk.cyan(
        `It looks like this is the first time that you're running ${environment.CONFIG_NAME_JSON} within this project.`
      )
    );
    console.log();
    console.log(
      chalk.cyan(
        `Answer a few questions to customize ${environment.CONFIG_NAME_JSON} for your project needs (this will create a "${jsonFile}" config file on the root level of this project).`
      )
    );
    console.log(
      chalk.cyan(
        "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
      )
    );
    console.log();

    const answers = await prompt(basicQuestions);

    outputFileSync(jsonFile, JSON.stringify(answers, null, 2));

    console.log();
    console.log(
      chalk.cyan(
        `The "${jsonFile}" config file has been successfully created on the root level of your project.`
      )
    );

    console.log("");
    console.log(chalk.cyan("You can always go back and update it as needed."));
    console.log("");
    console.log(chalk.cyan("Thanks!"));
    console.log("");
    console.log("");

    return answers;
  } catch (e) {
    console.error(
      chalk.red.bold(`ERROR: Could not create a "${jsonFile}" config file.`)
    );
    return e;
  }
}

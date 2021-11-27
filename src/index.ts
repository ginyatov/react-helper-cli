import inquirer from "inquirer";
import minimist from "minimist";
import entitiesHandle from "@models/entities";
import componentsHandler from "@models/components";
import getCLIConfigFile from "@config/config";
import { reactHelperCli } from "@customTypes/index";

const questions = [
  {
    type: "list",
    name: "type",
    message: "What you want?",
    choices: ["Create new entities", "Create new component"],
    filter(val: string) {
      return val.toLowerCase();
    },
  },
];

const startDefaultQuestions = (cliConfigFile: reactHelperCli) => {
  inquirer.prompt(questions).then((answers: any) => {
    switch (answers.type) {
      case "create new entities":
        entitiesHandle().then(() => {
          //console.log('Successfully created')
        });
        return;
      case "create new component":
        componentsHandler(cliConfigFile).then(() => {
          //console.log('Successfully created')
        });
        return;
      default:
        console.error("Not correct answer");
    }
  });
};

async function cli() {
  const cliConfigFile = await getCLIConfigFile();

  console.log(cliConfigFile);

  const args = minimist(process.argv.slice(2));
  console.log(args);

  startDefaultQuestions(cliConfigFile);
  return;
  /* if (1 === 2) {
  } else {
    startDefaultQuestions();
  }*/
}

cli();

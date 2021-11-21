import inquirer from "inquirer";
import entitiesHandle from "./models/entities/index.js";
import componentsHandler from "./models/components/index.js";

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

inquirer.prompt(questions).then((answers) => {
  switch (answers.type) {
    case "create new entities":
      entitiesHandle().then(() => {
        //console.log('Successfully created')
      });
      return;
    case "create new component":
      componentsHandler().then(() => {
        //console.log('Successfully created')
      });
      return;
    default:
      console.error("Not correct answer");
  }
});

import fs from "fs";
import inquirer from "inquirer";
import { createComponent } from "./files/component.js";
import { setFirstLetterBig } from "../../helpers/helpers.js";

const questionsDefault = [
  {
    type: "input",
    name: "componentName",
    message: "What name component?",
    filter(val: string) {
      return setFirstLetterBig(val);
    },
    validate(value: string) {
      if (!value.trim().length) {
        return "Please enter a component name";
      }

      return true;
    },
  },
  {
    type: "confirm",
    name: "stylesheet",
    message: "Create stylesheet file?",
    default: true,
  },
  {
    type: "input",
    name: "componentPath",
    message: "Which way to create a component?",
    filter(val: string) {
      if (val[0] === "/") {
        return val.slice(1);
      }
      return val;
    },
    validate(value: string) {
      if (!value.trim().length) {
        return "Please enter path";
      }
      return true;
    },
  },
];

const componentsHandler = async (pathToFile?: string) => {
  let questions = pathToFile ? questionsDefault.slice(0, -1) : questionsDefault;

  return inquirer.prompt(questions).then(async (answers) => {
    const componentName = answers.componentName;
    const path = pathToFile ?? answers.componentPath;
    const hasStylesheet = answers.stylesheet;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true,
      });
    }

    createComponent(componentName, hasStylesheet, path);
  });
};

export default componentsHandler;

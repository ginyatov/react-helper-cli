import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import componentsHandler from "@models/components";
import { createSelector } from "./files/selector";
import { createReducer } from "./files/reducer";
import { createSaga } from "./files/saga";

export const ENTITIES_PATH = process.env.ENTITIES_PATH ?? "/entities/";

const questions = [
  {
    type: "input",
    name: "entitiesName",
    message: "What name entities?",
    filter(val: string) {
      return val.toLowerCase();
    },
    validate(value: string) {
      if (!value.trim().length) {
        return "Please enter a entity name";
      }

      const entitiesPath = path.join("./", ENTITIES_PATH, value);

      if (fs.existsSync(entitiesPath)) {
        return `Entities name "${value}" is existing`;
      }

      return true;
    },
  },
  {
    type: "checkbox",
    name: "selectFiles",
    message: "Choose what need create:",
    choices: [
      {
        name: "reducer",
        checked: true,
      },
      {
        name: "saga",
        checked: true,
      },
      {
        name: "selector",
        checked: true,
      },
      {
        name: "images",
      },
      {
        name: "components",
      },
    ],
    validate(answer: []) {
      if (answer.length < 1) {
        return "You must choose at least one topping.";
      }

      return true;
    },
  },
];

const entitiesHandle = async () => {
  if (!fs.existsSync(path.join("./", ENTITIES_PATH))) {
    console.log(
      `${ENTITIES_PATH} - directory is not exist, please create it or change path in .env. ex:ENTITIES_PATH='/entities/'`
    );
    return;
  }

  return inquirer.prompt(questions).then(async (answers) => {
    const entitiesName = answers.entitiesName;
    const entitiesPath = path.join("./", ENTITIES_PATH, entitiesName);

    const checkboxSelected = answers.selectFiles;
    const selectedSaga = checkboxSelected.includes("saga");
    const selectedReducer = checkboxSelected.includes("reducer");
    const selectedSelector = checkboxSelected.includes("selector");

    fs.mkdirSync(entitiesPath);

    if (checkboxSelected.includes("components")) {
      const componentsPath = path.join(entitiesPath, "/components");
      fs.mkdirSync(componentsPath);

      // await componentsHandler(componentsPath);
    }

    if (selectedSaga || selectedReducer || selectedSelector) {
      fs.mkdirSync(path.join(entitiesPath, "/meta"), {
        recursive: true,
      });
    }

    if (selectedSaga) {
      createSaga(entitiesName);
    }

    if (selectedReducer) {
      createReducer(entitiesName, selectedSaga);
    }

    if (selectedSelector && selectedReducer) {
      createSelector(entitiesName);
    }

    if (checkboxSelected.includes("images")) {
      fs.mkdirSync(path.join(entitiesPath, "/images"));
    }

    return true;
  });
};

export default entitiesHandle;

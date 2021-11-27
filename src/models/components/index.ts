import { prompt } from "inquirer";
import { setFirstLetterBig, tryCreateFile } from "@helpers/helpers";
import generateTemplatesMap from "@models/templates";
import { reactHelperCli, ReturnGeneratorProps } from "@customTypes/index";
import path from "path";

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

      if (!/^[\w\-. ]+$/.test(value)) {
        return "Not valid file name";
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
    default() {
      return process.env.INIT_CWD?.replace(process.cwd(), "") || ".";
    },
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

const componentsHandler = async (
  cliConfigFile: reactHelperCli,
  pathToFile?: string
) => {
  let questions = pathToFile ? questionsDefault.slice(0, -1) : questionsDefault;

  return prompt(questions).then(async (answers) => {
    const componentName = answers.componentName;
    const path = pathToFile ?? answers.componentPath;
    const hasStylesheet = answers.stylesheet;

    const templateComponent: ReturnGeneratorProps = generateTemplatesMap[
      "component"
    ]({
      cliConfigFile,
      cmd: {
        path,
        withStyle: hasStylesheet,
      },
      componentName,
    });

    console.log(templateComponent.componentPath);

    try {
      tryCreateFile(templateComponent).then(() => {
        if (hasStylesheet) {
          const templateStyle: ReturnGeneratorProps = generateTemplatesMap[
            "style"
          ]({
            cliConfigFile,
            cmd: {
              path,
            },
            componentName,
          });

          tryCreateFile(templateStyle);
        }
      });
    } catch (e) {
      console.log(`Ooops, could not create file ${componentName}`);
    }
  });
};

export default componentsHandler;

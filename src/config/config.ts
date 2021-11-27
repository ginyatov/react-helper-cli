import { accessSync, constants, readFileSync } from "fs-extra";
import chalk from "chalk";
import { jsonFile } from "@helpers/helpers";
import { createCLIConfigFile } from "@utils/configUtils";

async function getCLIConfigFile() {
  try {
    accessSync("./package.json", constants.R_OK);

    try {
      accessSync(`./${jsonFile}`, constants.R_OK);
      return JSON.parse(readFileSync(`./${jsonFile}`).toString());
    } catch (e) {
      return await createCLIConfigFile();
    }
  } catch (error) {
    console.error(
      chalk.red.bold(
        "ERROR: Please make sure that you're running the generate-react-cli commands from the root level of your React project"
      )
    );
    return process.exit(1);
  }
}

export default getCLIConfigFile;

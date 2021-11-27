import { setFirstLetterBig, writeFile } from "@helpers/helpers";
import path from "path";
import { ENTITIES_PATH } from "../index";

const createTextSelector = (name: string) => {
  const firstLetterBig = setFirstLetterBig(name);

  return `
import { createSelector } from 'reselect'
import { I${firstLetterBig}State } from './reducer'

const get${firstLetterBig} = (state: { ${name}: I${firstLetterBig}State }): I${firstLetterBig}State => state.${name}

`;
};

export const createSelector = (name: string) => {
  const text = createTextSelector(name);
  const pathToFile = path.join("./", ENTITIES_PATH, name, "/meta/selector.ts");

  writeFile(pathToFile, text, "selector");
};

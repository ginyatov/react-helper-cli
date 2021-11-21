import path from "path";
import { ENTITIES_PATH } from "../index.js";
import { setFirstLetterBig, writeFile } from "../../../helpers/helpers.js";

const createTextReducer = (name: string, selectedSaga: boolean) => {
  const firstLetterBig = setFirstLetterBig(name);
  const sagaText = selectedSaga ? "sagaTest() {}" : "";

  return `
import { createActionCreators, createReducerFunction, ImmerReducer } from 'immer-reducer'

export interface I${firstLetterBig}State {}

const initialState: I${firstLetterBig}State = {}

class ${name}Reducer extends ImmerReducer<I${firstLetterBig}State> {
  ${sagaText}
}

const ${name}ActionCreators = createActionCreators(${name}Reducer)
export const reducerFunction = createReducerFunction(${name}Reducer, initialState)
export default ${name}ActionCreators
`;
};

export const createReducer = (name: string, selectedSaga: boolean) => {
  const text = createTextReducer(name, selectedSaga);
  const pathToFile = path.join("./", ENTITIES_PATH, name, "/meta/reducer.ts");

  writeFile(pathToFile, text, "reducer");
};

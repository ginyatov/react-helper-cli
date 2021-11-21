import path from "path";
import { ENTITIES_PATH } from "../index.js";
import { writeFile } from "../../../helpers/helpers.js";

const createTextSaga = (name: string) => `
import ${name}ActionCreators from './reducer'

export function* sagaTest({ payload }: ReturnType<typeof ${name}ActionCreators.sagaTest>) {
    try {
     // try
    } catch (error) {
     // catch
    } finally {
     // finally
    }
}

export default function* root() {
  yield all([takeLatest(${name}ActionCreators.sagaTest.type, sagaTest)])
}
`;

export const createSaga = (name: string) => {
  const text = createTextSaga(name);

  const pathToFile = path.join("./", ENTITIES_PATH, name, "/meta/saga.ts");
  writeFile(pathToFile, text, "saga");
};
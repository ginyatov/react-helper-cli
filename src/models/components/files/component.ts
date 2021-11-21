import { writeFile } from "../../../helpers/helpers.js";
import path from "path";

const createComponentText = (name: string, hasStyle: boolean) => {
  const includeStyle = hasStyle
    ? `import css from './${name}.module.scss';`
    : "";

  return `
import { FC } from 'react';
${includeStyle}

type ${name}Props = {};
const ${name}: FC<${name}Props> = (props) => {
  return (
    <div>

    </div>
  );
};

export default ${name};
`;
};

export const createComponent = (
  name: string,
  hasStyle: boolean,
  pathToFile: string
) => {
  const text = createComponentText(name, hasStyle);
  const filePath = path.join("./", pathToFile, `${name}.tsx`);

  if (hasStyle) {
    const filePathCss = path.join("./", pathToFile, `${name}.module.scss`);
    writeFile(filePathCss, "");
  }
  writeFile(filePath, text, "component");
};

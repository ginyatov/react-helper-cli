import { setFirstLetterBig, writeFile } from "../../../helpers/helpers.js";
import path from "path";

const createComponentText = (name: string, hasStyle: boolean) => {
  const firstLetterBig = setFirstLetterBig(name);

  const includeStyle = hasStyle
    ? `import css from './${name}.module.scss';`
    : "";

  return `
import { FC } from 'react';
${includeStyle}

type ${firstLetterBig}Props = {};
const ${firstLetterBig}: FC<${firstLetterBig}Props> = (props) => {
  return (
    <div>

    </div>
  );
};

export default ${firstLetterBig};
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

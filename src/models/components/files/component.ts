import { writeFile } from "@helpers/helpers";
import path from "path";

const createComponentText = (name: string, hasStyle: boolean) => {
  const includeStyle = hasStyle
    ? `import css from './${name}.module.scss';`
    : "";

  return `
import { ReactNode } from 'react';
${includeStyle}

type ${name}Props = {
  children?: ReactNode
};
const ${name} = (props: ${name}Props) => {
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

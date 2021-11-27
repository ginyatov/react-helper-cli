import { generatorsProps } from "@customTypes/index";
import componentsStyleFile from "@models/templates/components/componentsStyleFile";

export default function componentStyleGenerator({
  cmd,
  componentName,
  cliConfigFile,
}: generatorsProps) {
  const { cssPreprocessor, usesCssModule } = cliConfigFile;
  let template = componentsStyleFile;
  const module = usesCssModule ? ".module" : "";
  let filename = `${componentName}${module}.${cssPreprocessor}`;

  template = template.replace(/TemplateName/g, componentName);

  return {
    componentPath: `${cmd.path}/${componentName}/${filename}`,
    filename,
    template,
  };
}

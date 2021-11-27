import componentsJSFile from "@models/templates/components/componentsJSFile";
import componentsTSFile from "@models/templates/components/componentsTSFile";
import { generatorsProps } from "@customTypes/index";

export default function componentTemplateGenerator({
  cmd,
  componentName,
  cliConfigFile,
}: generatorsProps) {
  const { cssPreprocessor, usesCssModule, usesTypeScript } = cliConfigFile;
  let template = null;
  let filename = null;

  template = usesTypeScript ? componentsTSFile : componentsJSFile;
  filename = usesTypeScript ? `${componentName}.tsx` : `${componentName}.js`;

  // --- If it has a corresponding stylesheet

  if (cmd.withStyle) {
    const module = usesCssModule ? ".module" : "";
    const cssPath = `${componentName}${module}.${cssPreprocessor}`;

    // --- If the css module is true make sure to update the template accordingly

    if (module.length) {
      template = template.replace(
        `'./TemplateName.module.css'`,
        `'./${cssPath}'`
      );
    } else {
      template = template.replace(
        `{styles.TemplateName}`,
        `"${componentName}"`
      );
      template = template.replace(
        `styles from './TemplateName.module.css'`,
        `'./${cssPath}'`
      );
    }
  } else {
    // --- If no stylesheet, remove className attribute and style import from jsTemplate

    template = template.replace(` className={styles.TemplateName}`, "");
    template = template.replace(
      `import styles from './TemplateName.module.css';`,
      ""
    );
  }

  template = template.replace(/TemplateName/g, componentName);

  return {
    componentPath: `${cmd.path}/${componentName}/${filename}`,
    filename,
    template,
  };
}

export interface reactHelperCli {
  usesTypeScript: boolean;
  usesCssModule: boolean;
  cssPreprocessor: "css" | "scss" | "less" | "styl";
}

export interface generatorsProps {
  componentName: string;
  cmd: {
    withStyle?: boolean;
    path: string;
  };
  cliConfigFile: reactHelperCli;
}

export interface ReturnGeneratorProps {
  componentPath: string;
  filename: string;
  template: string;
}

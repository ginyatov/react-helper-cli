interface Environment {
  CONFIG_NAME_JSON: string;
}

export const environment: Environment = {
  CONFIG_NAME_JSON: process.env.CONFIG_NAME_JSON || "react-helper-cli",
};

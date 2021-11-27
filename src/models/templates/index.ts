import componentTemplateGenerator from "./generators/componentTemplateGenerator";
import componentStyleGenerator from "./generators/componentStyleGenerator";

const generateTemplatesMap = {
  component: componentTemplateGenerator,
  style: componentStyleGenerator,
};

export default generateTemplatesMap;

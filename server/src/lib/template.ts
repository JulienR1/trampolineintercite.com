import { readFileSync } from "fs";
import Mustache from "mustache";
import { join } from "path";
import { TemplateRegistry } from "../templates/template-registry";

const loadTemplate = async (templateName: string) => {
  const path = join(process.cwd(), "src", "templates", templateName);
  return readFileSync(path, "utf8");
};

export const parseTemplate = async <T extends keyof TemplateRegistry>(
  templateName: T,
  values: TemplateRegistry[T]
) => {
  const template = await loadTemplate(templateName);
  return Mustache.render(template, values);
};

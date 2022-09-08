import { existsSync, readdirSync } from "fs";

export function getFiles(filename: string) {
  return {
    up: `${filename}.up.sql`,
    down: `${filename}.down.sql`,
  };
}

export function getFilesInDirectory(dirPath: string) {
  if (!existsSync(dirPath)) {
    return [];
  }
  return readdirSync(dirPath);
}

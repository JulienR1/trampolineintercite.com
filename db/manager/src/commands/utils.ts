export function getFiles(filename: string) {
  return {
    up: `${filename}.up.sql`,
    down: `${filename}.down.sql`,
  };
}

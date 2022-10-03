import { existsSync, readdirSync } from "fs";
import path from "path";

import { Routes } from "./routes";

describe("Router", () => {
  it("should find each registered route files", () => {
    const missingFiles: string[] = [];
    getFilteredRoutes().forEach(route => {
      const filepath = path.join("src/pages", `${route}.tsx`);
      const secondFilepath = path.join("src/pages", route, "index.tsx");
      if (!(existsSync(filepath) || existsSync(secondFilepath))) {
        missingFiles.push(route);
      }
    });

    expect(missingFiles).toEqual([]);
  });

  it("should find the correct amount of pages", () => {
    const dirPath = path.join("src", "pages");
    const fileCount = readFileCountInDir(dirPath);
    expect(fileCount).toBe(getFilteredRoutes().size);
  });

  const getFilteredRoutes = (): Set<string> => {
    const filteredRoutes = new Set<string>();
    Object.values(Routes).forEach(route => {
      if (!route.startsWith("http")) {
        const routeWithoutAlias = route.split("#")[0];
        filteredRoutes.add(routeWithoutAlias);
      }
    });
    return filteredRoutes;
  };

  const readFileCountInDir = (dirPath: string): number => {
    const excludedPages = ["_app.tsx", "404.tsx", "500.tsx"];

    return readdirSync(dirPath, { withFileTypes: true }).reduce(
      (total, currentDirElement) => {
        if (currentDirElement.isDirectory()) {
          return (
            total +
            readFileCountInDir(path.join(dirPath, currentDirElement.name))
          );
        } else if (
          currentDirElement.name.endsWith(".tsx") &&
          !excludedPages.includes(currentDirElement.name)
        ) {
          return total + 1;
        } else {
          return total;
        }
      },
      0,
    );
  };
});

export {};

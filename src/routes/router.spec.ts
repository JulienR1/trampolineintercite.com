import path from "path";
import { existsSync } from "fs";
import { Routes } from "./routes";

describe("Router", () => {
	it("should find each registered route files", () => {
		const filteredRoutes = new Set<string>();
		Object.values(Routes).forEach((route) => {
			const routeWithoutAlias = route.split("#")[0];
			filteredRoutes.add(routeWithoutAlias);
		});

		const missingFiles: string[] = [];
		filteredRoutes.forEach((route) => {
			const filepath = path.join("src/pages", `${route}.tsx`);
			const secondFilepath = path.join("src/pages", route, "index.tsx");
			if (!(existsSync(filepath) || existsSync(secondFilepath))) {
				missingFiles.push(route);
			}
		});

		expect(missingFiles).toEqual([]);
	});
});

export {};

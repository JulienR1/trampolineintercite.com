import { readdirSync, readFileSync } from "fs";
import path from "path";

describe("Component styles", () => {
	it("should import every stylesheet in the components folder", () => {
		const componentsDir = path.join(__dirname);
		const stylesFile = readFileSync(path.join(componentsDir, "styles.scss"), "utf-8");

		const findStylesheetsInDir = (dir = componentsDir): string[] => {
			const files = readdirSync(dir, { withFileTypes: true });
			return files.reduce((allFiles, file) => {
				if (file.isDirectory()) {
					return [...allFiles, ...findStylesheetsInDir(path.join(dir, file.name))];
				} else if (file.isFile() && file.name.endsWith(".scss") && file.name !== "styles.scss") {
					allFiles.push(file.name);
				}
				return allFiles;
			}, [] as string[]);
		};

		const parseStylesFile = () =>
			stylesFile
				.split(/\r?\n/)
				.map((line) => {
					const importStatement = line.split('"').reverse()[1]; // 0 is the semicolon
					const filename = importStatement?.split("/").reverse()[0];
					return filename;
				})
				.filter((filename) => filename !== undefined);

		const allFiles = findStylesheetsInDir();
		const styleFile = parseStylesFile();

		expect(allFiles.length).toBe(styleFile.length);
		allFiles.forEach((file) => expect(styleFile.includes(file)).toBeTruthy());
	});
});

export {};

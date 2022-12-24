const { writeFileSync } = require("fs");
const path = require("path");

const cjsPackageJson = { type: "commonjs" };
const mjsPackageJson = { type: "module" };

writeFileSync(
  path.join(process.cwd(), "dist", "cjs", "package.json"),
  JSON.stringify(cjsPackageJson)
);
writeFileSync(
  path.join(process.cwd(), "dist", "mjs", "package.json"),
  JSON.stringify(mjsPackageJson)
);

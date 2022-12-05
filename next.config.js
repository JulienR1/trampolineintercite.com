const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()({
  reactStrictMode: true,
  pageExtensions: ["in.ts", "tsx"],
});

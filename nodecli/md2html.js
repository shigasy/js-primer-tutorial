const marked = require("marked");

module.exports = (markdown, cliOptions) => {
  return marked(markdown, {
    ...cliOptions,
  });
};

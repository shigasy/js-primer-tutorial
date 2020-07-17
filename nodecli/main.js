// console.log(process.argv);
const program = require("commander");
const fs = require("fs");
const marked = require("marked");
const md2html = require("./md2html");
program.option("--gfm", "GFMを有効にする");
program.parse(process.argv);
const options = program.opts();
const filePath = program.args[0];

const cliOptions = {
  gfm: false,
  ...options,
};

fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  const html = md2html(file, cliOptions);
  console.log(html);
});
fs.readFileSync;

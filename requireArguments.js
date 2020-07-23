const isRequired = () => {
  throw Error("引数が必須");
};

const requireArguments = (argument = isRequired()) => {
  return argument;
};
console.log(requireArguments("hoge"));
requireArguments();

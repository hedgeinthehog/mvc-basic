// add(2,3);
const args = process.argv.slice(2).map(function (value, index, fullArray) {
  return Number(value);
});

function add(a, b) {
  // console.log(a + b);
  return a + b;
}

console.log(add(args[0], args[1]));

require("./output.js");

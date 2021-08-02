const fs = require("fs");
const path = require("path");

// Use JSON for file storage
// That means - need to serialize, deserialize data objects to JSON

// define path as a resolved variable
const fileOrDirPath = path.resolve(
  __dirname,
  "../relative/path/to/directory",
  "or/file"
);

// check if directory/file exists
fs.access(fileOrDirPath, function (error) {
  if (error) {
    console.log("Directory/File does not exist.");
  } else {
    console.log("Directory/File exists.");
  }
});
// alternative way
try {
  if (fs.existsSync(fileOrDirPath)) {
    console.log("Directory/File exists.");
  } else {
    console.log("Directory/File does not exist.");
  }
} catch (e) {
  console.log("An error occurred.");
}

// read file content
const jsonData = fs.readFileSync(dataPath);
return JSON.parse(jsonData);

// create directory: if diretory doesn't exist (note I don't have "dirPath" defined, TODO)
fs.mkdirSync(dirPath);
fs.mkdirSync(dirPath, { recursive: true }); // if path containes multiple non-existing directories, usually safer to use

// create/write to file: serialize and use `path/to/file.json` as a path (must include file extension)
const stringifyData = JSON.stringify(data);
fs.writeFileSync(filePath, stringifyData);

// remove file
fs.unlinkSync(filePath);

// remove directory
fs.rmdirSync(dirPath);
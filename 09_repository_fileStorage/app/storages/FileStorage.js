const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// define default place for file storage data
const FILE_STORAGE_PATH = path.resolve(__dirname, "../../data/files");

class FileStorage {
  constructor(modelName) {
    this._path = path.resolve(FILE_STORAGE_PATH, modelName);
    // check if directory exists and create if needed
    fs.access(this._path, (error) => {
      if (error) fs.mkdirSync(this._path, { recursive: true });
    });
  }

  getAll() {
    const files = fs.readdirSync(this._path);
    const list = files
      .map((fileName) => {
        try {
          const data = fs.readFileSync(`${this._path}/${fileName}`);
          return JSON.parse(data);
        } catch (err) {
          console.error(
            `Can't parse content from file "${this._path}/${fileName}" as JSON`
          );
          return;
        }
      })
      .filter((data) => data);
    return list;
  }

  getById(id) {
    if (!id) throw new Error(`Missing "id" in data for FileStorage.getById`);
    try {
      const content = fs.readFileSync(`${this._path}/${id}.json`);
      return JSON.parse(content);
    } catch (err) {
      console.error(
        `Can't parse content from file "${this._path}/${id}.json" as JSON`
      );
      return;
    }
  }

  create(data) {
    const id = uuidv4();
    const storedData = Object.assign({}, data, { id });
    fs.writeFileSync(`${this._path}/${id}.json`, JSON.stringify(storedData));
    return storedData;
  }

  update(data) {
    const { id } = data;
    if (!id) throw new Error(`Missing "id" in data for FileStorage.update`);
    fs.writeFileSync(`${this._path}/${id}.json`, JSON.stringify(data));
    return data;
  }

  delete(id) {
    if (!id) throw new Error(`Missing "id" in data for FileStorage.delete`);
    return fs.unlinkSync(`${this._path}/${id}.json`);
  }

  /**
   * Will purge data, deletes storage directory for model
   */
  clear() {
    return fs.rmdirSync(this._path, { recursive: true });
  }
}

module.exports = FileStorage;
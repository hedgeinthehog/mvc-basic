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

    // which will hold { modelId: data }
    this._data = {};
    this._allFilesCached = false;
  }

  getAll() {
    // const cacheLength = Object.keys(this._data).length;
    if (this._allFilesCached) {
      return Object.values(this._data);
    }

    const files = fs.readdirSync(this._path);
    const list = files
      .map((fileName) => {
        try {
          const id = fileName.replace(".json", "");
          if (this._data[id]) {
            return this._data[id];
          }
          const data = fs.readFileSync(`${this._path}/${fileName}`);
          const parsedData = JSON.parse(data);
          this._data[parsedData.id] = parsedData;
          return parsedData;
        } catch (err) {
          console.error(
            `Can't parse content from file "${this._path}/${fileName}" as JSON`
          );
          return;
        }
      })
      .filter((data) => data);
    this._allFilesCached = true;
    return list;
  }

  getById(id) {
    if (!id) throw new Error(`Missing "id" in data for FileStorage.getById`);
    try {
      if (this._data[id]) {
        return this._data[id];
      }

      const content = fs.readFileSync(`${this._path}/${id}.json`);
      const parsedData = JSON.parse(content);
      // need to cache data
      this._data[parsedData.id] = parsedData;

      return parsedData;
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
    this._data[id] = storedData;
    fs.writeFileSync(`${this._path}/${id}.json`, JSON.stringify(storedData));
    return storedData;
  }

  update(data) {
    const { id } = data;
    if (!id) throw new Error(`Missing "id" in data for FileStorage.update`);
    this._data[id] = data;
    fs.writeFileSync(`${this._path}/${id}.json`, JSON.stringify(data));
    return data;
  }

  delete(id) {
    if (!id) throw new Error(`Missing "id" in data for FileStorage.delete`);
    delete this._data[id];
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

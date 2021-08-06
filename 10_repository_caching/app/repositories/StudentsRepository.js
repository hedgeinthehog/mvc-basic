const Student = require("../models/Student");
const FileStorage = require("../storages/FileStorage");
// const DbStorage = require("../storages/DbStorage");

// knowledge of how and where to store data
class StudentsRepository {
  constructor() {
    this._storage = new FileStorage("students");
    // this._storage = new DbStorage("students");
  }

  async getAll() {
    try {
      const list = await this._storage.getAll();
      return list.map((storedData) => {
        const studentModel = new Student(storedData);
        return studentModel.getData();
      });
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  async getById(id) {
    try {
      const storedData = await this._storage.getById(id);
      const studentModel = new Student(storedData);
      return studentModel.getData();
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  // data == req.body
  async create(data) {
    try {
      // model used to validate and parse data
      const studentModel = new Student(data);
      const dataToStore = studentModel.getDataForStorage();
      // save to storage and get back stored data (with id), update model's id
      const { id } = await this._storage.create(dataToStore);
      studentModel.setId(id);
      return studentModel.getData();
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  async update(id, data) {
    try {
      const studentModel = new Student(
        Object.assign({}, data, { id })
      );
      const dataToStore = studentModel.getDataForStorage();
      await this._storage.update(dataToStore);
      return studentModel.getData();
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  async delete(id) {
    try {
      return await this._storage.delete(id);
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }
}

module.exports = new StudentsRepository();

const Student = require("../models/Student");
const FileStorage = require("../storages/FileStorage");

// knowledge of how and where to store data
class StudentsRepository {
  constructor() {
    this._storage = new FileStorage("students");
  }

  getAll() {
    try {
      return this._storage.getAll().map((storedData) => {
        const studentModel = new Student(storedData);
        return studentModel.getData();
      });
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  getById(id) {
    try {
      const storedData = this._storage.getById(id);
      const studentModel = new Student(storedData);
      return studentModel.getData();
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  create(data) {
    try {
      // model used to validate and parse data
      const studentModel = new Student(data);
      const dataToStore = studentModel.getDataForStorage();
      // save to storage and get back stored data (with id), update model's id
      const { id } = this._storage.create(dataToStore);
      studentModel.setId(id);
      return studentModel.getData();
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  update(id, data) {
    try {
      const studentModel = new Student(Object.assign({}, data, { id }));
      const dataToStore = studentModel.getDataForStorage();
      this._storage.update(dataToStore);
      return studentModel.getData();
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  delete(id) {
    try {
      return this._storage.delete(id);
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }
}

module.exports = new StudentsRepository();

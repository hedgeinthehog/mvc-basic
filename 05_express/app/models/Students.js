const students = require("../../data");

class Students {
  constructor(data) {
    this._data = data;
  }

  getAll() {
    return this._data;
  }

  getById(id) {
    return this._data.find((entry) => Number(entry.id) === Number(id));
  }

  createStudent(data) {
    // should be validation for fields
    // business logic should be dfdone here before saving new entry for Students

    // generate id for hardcoded data
    const id = new Date().getTime();

    this._data.push(Object.assign({}, data, { id }));
  }
}

module.exports = new Students(students);

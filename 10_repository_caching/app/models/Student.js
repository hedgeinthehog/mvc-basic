// all business and app logic about model goes here
class Student {
  constructor(data) {
    // TODO: add validation

    this._data = Object.assign({}, data, {
      username: this._getUsername(data),
    });
  }

  // business logic example
  _getUsername({ name, age }) {
    return `${name}${age}`;
  }

  // used for views or other application parts except storage
  getData() {
    return Object.assign({}, this._data);
  }

  setId(id) {
    this._data.id = id;
  }

  /**
   * @returns data what should be stored
   */
  getDataForStorage() {
    const dataCopy = Object.assign({}, this._data);
    delete dataCopy.username;
    return dataCopy;
  }
}

module.exports = Student;

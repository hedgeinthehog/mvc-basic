const bcrypt = require('bcrypt');

class User {
  constructor(data) {
    // TODO: add validation

    this._data = Object.assign({}, data);
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
    return dataCopy;
  }

  async setPassword(password) {
    try {
      const hashedPwd = await bcrypt.hash(password, 10);
      this._data.password = hashedPwd;
    } catch (e) {
      throw new Error(e);          
    }
  }

  async comparePasswords(password) {
    try {
      return await bcrypt.compare(password, this._data.password);
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = User;

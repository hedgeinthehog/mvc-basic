const User = require("../models/User");
const DbStorage = require("../storages/DbStorage");

class UsersRepository {
  constructor() {
    this._storage = new DbStorage("users");
  }

  async getOne(filter) {
    try {
      const data = await this._storage.getOne(filter);
      return new User(data);
    } catch (e) {
      throw new Error(e);      
    }
  }

  async create(data) {
    try {
      const user = new User({ username: data.username });
      await user.setPassword(data.password);

      const dataToStore = user.getDataForStorage();
      await this._storage.create(dataToStore);
      return user.getData();
    } catch (e) {
      throw new Error(e);            
    }
  }
}

module.exports = new UsersRepository();
class BaseStorage {
  getAll() {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `${this.constructor.name} is missing getAll method implementation`
    );
    throw new Error(`${this.constructor.name} is missing getAll method implementation`);
  }
  getById() {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `${this.constructor.name} is missing getById method implementation`
    );
    throw new Error(`${this.constructor.name} is missing getById method implementation`);
  }
  create() {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `${this.constructor.name} is missing create method implementation`
    );
    throw new Error(`${this.constructor.name} is missing create method implementation`);
  }
  update() {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `${this.constructor.name} is missing update method implementation`
    );
    throw new Error(`${this.constructor.name} is missing update method implementation`);
  }
  delete() {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `${this.constructor.name} is missing delete method implementation`
    );
    throw new Error(`${this.constructor.name} is missing delete method implementation`);
  }
}

module.exports = BaseStorage;
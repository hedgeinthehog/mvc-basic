const mysql = require("mysql2");

// create a connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test123",
  database: "mvc_repository",
});

// connection.query("SQL HERE");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "test123",
  database: "mvc_repository",
  waitForConnections: true,
  connectionLimit: 10,
});

//
pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.query("SQL HERE");
});

class ExampleRepository {
  getAll(callback) {
    return pool.getConnection((err, connection) => {
      if (err) throw err;
      callback(connection.query("SELECT * from students"));
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        resolve(connection.query("SELECT * from students"));
      });
    });
  }
}

const data = await ExampleRepository.getAll();
ExampleRepository.getAll().then(data);

(async () => {
  // using mysql2 promises
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test123",
    database: "mvc_repository",
  });
  const [rows] = await connection.query("SELECT * FROM students");
})
//
(async () => {
  const mysql = require("mysql2");
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "test123",
    database: "mvc_repository",
    waitForConnections: true,
    connectionLimit: 10,
  });
  const [rows] = await pool.promise().query("SELECT * FROM students");
  console.log(1);
});

async function anyFn () {
    const data = await somePromiseMethod();
}

(async () => {
    await anyFn();
})()

// this wont work without specific nodejs flags
await anyFn();


import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sobolevExamDB',
};

export const getConnection = async () => {
  return mysql.createConnection(config);
};

export const getPool = async () => {
  return mysql.createPool({
    connectionLimit: 10,
    host,
    user,
    password,
    database,
  });
};

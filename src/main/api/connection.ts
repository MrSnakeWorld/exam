import mysql from 'mysql2/promise';

export const config = {
  host: 'localhost',
  user: 'app',
  password: 'pass',
  database: 'sobolevExamDB',
};

export const getConnection = async () => mysql.createConnection(config);

export const getPool = async () => mysql.createPool(config);

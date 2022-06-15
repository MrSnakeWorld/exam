/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const mysql = require('mysql2');

const host = 'localhost';
const user = 'root';
const password = '';

const connection = mysql.createConnection({host, user, password});

connection.query('CREATE DATABASE SobolevExamDB;', (err) => console.log(err));
connection.end();

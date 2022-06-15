/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const mysql = require('mysql2');

const data = [
	`
		CREATE TABLE users (
			id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			firstName VARCHAR(30) NOT NULL,
			lastName VARCHAR(30),
			age INT,
			email TEXT NOT NULL,
			password VARCHAR(30) NOT NULL
		);
	`,
	`
		CREATE TABLE products (
			id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			name VARCHAR(30) NOT NULL,
			description TEXT,
			price FLOAT(12, 2) NOT NULL,
			typeId INT
		);
	`,
	`
		CREATE TABLE types (
			id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			name VARCHAR(30) NOT NULL,
			description TEXT
		);
	`,
	`
		ALTER TABLE products
		ADD CONSTRAINT products_types_fk 
		FOREIGN KEY(typeId) REFERENCES types(id);
	`
];

const host = 'localhost';
const user = 'root';
const password = '';
const database = 'sobolevExamDB';

const connection = mysql.createConnection({host, user, password, database});

for (const item of data) {
	connection.query(item);
}

connection.end();

const exampleData = [
	`
		CREATE TABLE tableName (
			table_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			columnName VARCHAR(30),
			another_table_id INT NOT NULL
		)
	`,
	`
		ALTER TABLE tableName ADD CONSTRAINT  table_another_table_id_fk FOREIGN KEY (another_table_id) REFERENCES anotherTable(another_table_id)
	`
];
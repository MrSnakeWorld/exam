import mysql from 'mysql2/promise';
import { config } from './connection';

export const primaryConfig = {
  host: config.host,
  user: 'root',
  password: '',
};

export const secondaryConfig = {
  host: config.host,
  database: config.database,
  user: primaryConfig.user,
  password: primaryConfig.password,
};

const queries = [
  `
		CREATE TABLE IF NOT EXISTS users (
			id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			firstName VARCHAR(30) NOT NULL,
			lastName VARCHAR(30),
			age INT,
			email TEXT NOT NULL,
			password VARCHAR(30) NOT NULL,
      isAdmin BOOL
		);
	`,
  `
    CREATE TABLE IF NOT EXISTS types (
      id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
      name VARCHAR(30) NOT NULL,
      description TEXT
    );
  `,
  `
		CREATE TABLE IF NOT EXISTS products (
			id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			name VARCHAR(30) NOT NULL,
			description TEXT,
			price FLOAT(12, 2) NOT NULL,
			typeId INT,
      CONSTRAINT products_types_fk FOREIGN KEY(typeId) REFERENCES types(id)
		);
	`,
  `
    CREATE TABLE IF NOT EXISTS orders (
      id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
      userId INT NOT NULL,
      productId INT NOT NULL,
      orderDate DATETIME NOT NULL,
      CONSTRAINT orders_users_fk FOREIGN KEY(userId) REFERENCES users(id),
      CONSTRAINT order_products_fk FOREIGN KEY(productId) REFERENCES products(id)
    );
  `,
];

const getPrimaryConnection = async () => mysql.createConnection(primaryConfig);

const getSecondaryConnection = async () =>
  mysql.createConnection(secondaryConfig);

const init = async () => {
  const primaryConnection = await getPrimaryConnection();

  await primaryConnection.query(
    `CREATE DATABASE IF NOT EXISTS ${config.database};`
  );

  const secondaryConnection = await getSecondaryConnection();

  try {
    const [databaseUsers] = await primaryConnection.query(
      `SELECT User FROM mysql.user WHERE User = '${config.user}';`
    );

    if (Array.isArray(databaseUsers) && !databaseUsers.length) {
      const { host, password, database, user } = config;
      await primaryConnection.execute(
        `CREATE USER '${user}'@'${host}' IDENTIFIED BY '${password}';`
      );
      await primaryConnection.execute(
        `GRANT SELECT, INSERT, UPDATE, DELETE ON ${database}.* TO '${user}'@'${host}';`
      );
    }
    await primaryConnection.end();

    const promises: Array<Promise<unknown>> = [];
    queries.forEach((query) =>
      promises.push(secondaryConnection.execute(query))
    );

    await Promise.all(promises);
    await secondaryConnection.end();

    return true;
  } catch (e) {
    await primaryConnection.end();
    await secondaryConnection.end();

    return e;
  }
};

export default init;

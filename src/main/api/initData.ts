import mysql from 'mysql2/promise';
import { secondaryConfig } from './init';

const adminUser = {
  firstName: 'admin',
  email: 'admin',
  password: 'admin',
};

const getConnection = async () => mysql.createConnection(secondaryConfig);

const userQuery = `INSERT users(firstName, lastName, age, email, password, isAdmin) VALUES ('${adminUser.firstName}', '', '0', '${adminUser.email}', '${adminUser.password}', '1');`;

const typesQuery = `
  INSERT types(name, description)
  VALUES ('Сковорода', ''),
  ('Кружка', ''),
  ('Тарелка', ''),
  ('Столовый прибор', '');
`;

const productsQuery = `
  INSERT products(name, description, price, typeId)
  VALUES ('Металическая кружка', 'Объем 250мл', 400, 2),
  ('Стеклянная кружка', 'Объем 250мл', 300, 2),
  ('Кружка для супа', 'Объем 500мл', 600, 2),
  ('Набор ложек', 'Количество 20', 500, 4),
  ('Набор вилок', 'Количество 10', 400, 4);
`;

const initData = async () => {
  const connection = await getConnection();

  try {
    const promises: Array<Promise<unknown>> = [];

    await Promise.all(promises);

    const [users] = await connection.execute(
      `SELECT * FROM users WHERE email = '${adminUser.email}' AND password = '${adminUser.password}';`
    );

    if (Array.isArray(users) && !users.length) {
      await connection.execute(userQuery);
    }

    const [types] = await connection.execute('SELECT * FROM types');

    if (Array.isArray(types) && !types.length) {
      await connection.execute(typesQuery);
    }

    const [products] = await connection.execute('SELECT * FROM products');

    if (Array.isArray(products) && !products.length) {
      await connection.execute(productsQuery);
    }

    await connection.end();

    return { users, types, products };
  } catch (e) {
    await connection.end();

    return e;
  }
};

export default initData;

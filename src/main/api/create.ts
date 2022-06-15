import { ResultSetHeader } from 'mysql2';
import { getConnection } from './connection';

const create = async (
  tableName: string,
  fields: string[],
  values: Array<string | number | undefined>
): Promise<unknown> => {
  const connection = await getConnection();

  const createQuery = `INSERT ${tableName}(${fields.join(
    ', '
  )}) VALUES (${values
    .map((item) => `'${item !== undefined ? item : ''}'`)
    .join(', ')});`;

  try {
    const createRes = await connection.execute(createQuery);
    const result = createRes[0] as ResultSetHeader;
    const id = result.insertId;

    const readQuery = `SELECT * FROM ${tableName} WHERE id = ${id}`;
    const readRes = await connection.execute(readQuery);
    connection.end();

    return readRes[0];
  } catch (error) {
    connection.end();
    return { error, createQuery };
  }
};

export default create;

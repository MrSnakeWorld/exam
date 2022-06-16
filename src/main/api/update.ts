import { getConnection } from './connection';

const update = async (
  tableName: string,
  fields: string[],
  values: Array<string | number | undefined>,
  id: string
): Promise<unknown> => {
  const connection = await getConnection();

  const updateQuery = `UPDATE ${tableName} SET ${fields
    .map((val, i) => `${val} = '${values[i]}'`)
    .join(', ')} WHERE id = '${id}'`;

  const readQuery = `SELECT * FROM ${tableName} WHERE id = '${id}'`;

  try {
    const updateRes = await connection.execute(updateQuery);
    const readRes = await connection.execute(readQuery);
    connection.end();

    console.log({ updateRes, readRes });

    return readRes[0];
  } catch (error) {
    connection.end();
    return { error, updateQuery, readQuery };
  }
};

export default update;

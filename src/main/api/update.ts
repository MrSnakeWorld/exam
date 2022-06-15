import { getConnection } from './connection';

const update = async (
  tableName: string,
  fields: string[],
  values: Array<string | number | undefined>,
  id: string
): Promise<unknown> => {
  const connection = await getConnection();

  const updateQuery = `UPDATE ${tableName} SET ${fields
    .map((val, i) => `${val} = ${values[i]}`)
    .join(', ')} WHERE id = ${id}`;

  try {
    const updateRes = await connection.execute(updateQuery);
    connection.end();

    return updateRes[0];
  } catch (error) {
    connection.end();
    return { error, updateQuery };
  }
};

export default update;

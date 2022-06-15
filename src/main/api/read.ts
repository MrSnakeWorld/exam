import { getConnection } from './connection';

const read = async (
  tableName: string,
  conditions?: string[]
): Promise<unknown> => {
  const connection = await getConnection();

  const query = conditions
    ? `SELECT * FROM ${tableName} WHERE ${conditions
        .map((item) => `'${item}'`)
        .join(', ')}`
    : `SELECT * FROM ${tableName}`;

  try {
    const res = await connection.execute(query);
    connection.end();

    return res[0];
  } catch (error) {
    connection.end();
    return { error, query };
  }
};

export default read;

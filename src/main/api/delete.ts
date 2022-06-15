import { getConnection } from './connection';

const remove = async (tableName: string, condition: string) => {
  const connection = await getConnection();

  const deleteQuery = `DELETE FROM ${tableName} WHERE ${condition};`;

  try {
    const deleteRes = await connection.execute(deleteQuery);
    connection.end();

    return deleteRes[0];
  } catch (error) {
    connection.end();
    return { error, deleteQuery };
  }
};

export default remove;

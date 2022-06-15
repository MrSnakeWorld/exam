import { getConnection } from './connection';

const create = async (
	tableName: string,
  fields: string[],
  values: Array<string | number>
): Promise<unknown> => {
  const connection = await getConnection();

  try {
    const query = `INSERT ${tableName}(${fields.join(', ')}) VALUES (${values
      .map((item) => `'${item}'`)
      .join(', ')});`;

    const res = await connection.execute(query);
    connection.end();

    return res;
  } catch (e) {
    connection.end();
    return e;
  }
};

export default create;

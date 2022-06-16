import IType from '../interfaces/IType';

const validateType = (type: string, types: IType[]) => {
  let error;
  if (!type) {
    error = 'Введите название категории';
  }

  if (types.find((item) => item.name === type)) {
    error = 'Такая категория уже существует';
  }
  return error;
};

export default validateType;

import IProduct from '../interfaces/IProduct';
import IType from '../interfaces/IType';

export const validateName = (name: string, products: IProduct[]) => {
  let error;
  if (!name) {
    error = 'Введите название товара';
  }

  if (products.find((val) => val.name === name)) {
    error = 'Такой товар уже существует';
  }

  return error;
};

export const validatePrice = (price: number) => {
  let error;

  if (!price) {
    error = 'Введите цену';
  }

  if (price < 0) {
    error = 'Цена не может быть отрицательной';
  }

  return error;
};

export const validateType = (type: string, types: IType[]) => {
  let error;
  console.log({ types });
  if (!types.find((val) => val.name === type)) {
    error = 'Такой категории не существует';
  }
  return error;
};

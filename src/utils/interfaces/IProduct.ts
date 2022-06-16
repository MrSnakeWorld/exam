interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  typeId: number;
}

export interface IEditableProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
}

export default IProduct;

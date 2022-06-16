import {
  Button,
  Center,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbDotsVertical } from 'react-icons/tb';
import { productToCart } from '../../../store/cart/actions';
import { createProduct } from '../../../store/products/actions/create';
import { deleteProduct } from '../../../store/products/actions/delete';
import { ITypesState } from '../../../store/types/reducers';
import useAppDispatch from '../../../../utils/hooks/useAppDispatch';
import IProduct, { IEditableProduct } from '../../../../utils/interfaces/IProduct';
import IType from '../../../../utils/interfaces/IType';
import { IUser } from '../../../../utils/interfaces/IUser';
import ProductModal from './ProductModal';

interface IProductsProps {
  products: IProduct[];
  user?: IUser;
  typesData: ITypesState;
  types: IType[];
}

const Products = ({ products, typesData, user, types }: IProductsProps) => {
  const { onClose, onOpen, isOpen } = useDisclosure();

  const dispatch = useAppDispatch();
  const array = products.map(
    (product): IEditableProduct => ({
      ...product,
      type: typesData.byId[product.typeId]?.name,
    })
  );

  const handleCreate = useCallback(() => {
    onOpen();
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await deleteProduct(dispatch, id);
  }, []);

  const handleAddToCart = useCallback((product: IEditableProduct) => {
    dispatch(productToCart(product));
  }, []);

  const submitCreate = useCallback(async (product: IEditableProduct) => {
    const typeId = types?.find((item) => product.type === item.name)?.id ?? 0;
    const newProduct: IProduct = { ...product, typeId };

    await createProduct(dispatch, newProduct);
    onClose();
  }, []);

  return (
    <div>
      <Center position="relative">
        <Heading pb="5">Список товаров</Heading>
        {user?.isAdmin ? (
          <Button
            leftIcon={<AiOutlinePlus />}
            position="absolute"
            right="0"
            bgColor="#C62E3E"
            color="white"
            onClick={handleCreate}
          >
            Добавить
          </Button>
        ) : null}
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Название</Th>
              <Th>Описание</Th>
              <Th>Цена</Th>
              <Th>Категория</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {array.map((product) => (
              <Tr key={product.id}>
                <Th>{product?.name ? product.name : ''}</Th>
                <Th>{product?.description ? product.description : ''}</Th>
                <Th>{product?.price ? `${product.price} руб.` : ''}</Th>
                <Th>{product?.type ? product.type : 'Не указана'}</Th>
                <Th>
                  {user ? (
                    user.isAdmin ? (
                      <Menu>
                        <MenuButton as={IconButton} icon={<TbDotsVertical />} />
                        <MenuList>
                          <MenuItemOption
                            onClick={() => handleDelete(product.id)}
                          >
                            Удалить товар
                          </MenuItemOption>
                        </MenuList>
                      </Menu>
                    ) : (
                      <IconButton
                        onClick={() => handleAddToCart(product)}
                        aria-label="Add"
                        bgColor="#C62E3E"
                        color="white"
                      >
                        <AiOutlinePlus />
                      </IconButton>
                    )
                  ) : null}
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ProductModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={submitCreate}
        types={types}
        products={products}
      />
    </div>
  );
};

export default Products;

import { useEffect } from 'react';
import {
  Avatar,
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from '@chakra-ui/react';
import { ImArrowLeft2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import useAppSelector from '../../../utils/hooks/useAppSelector';
import { getCurrentUser } from '../../store/users/selectors';
import './Profile.css';
import { getOrdersAsArray } from '../../store/orders/selectors';
import { getTypesData } from '../../store/products/selectors';
import { getProductsData } from '../../store/types/selectors';
import moment from 'moment';
import Info from './components/Info';

const Profile = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const allOrders = useAppSelector(getOrdersAsArray);
  const typesData = useAppSelector(getTypesData);
  const productsData = useAppSelector(getProductsData);

  const orders = allOrders
    .filter((order) => order.userId === currentUser?.id)
    .map((order) => {
      const { id, orderDate } = order;
      const product = productsData.byId[order.productId];
      const type = typesData.byId[product.typeId];

      return { id, product, type, orderDate };
    });

  const navigate = useNavigate();

  const name = currentUser
    ? `${currentUser?.firstName} ${currentUser?.lastName}`
    : '';

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  const handleBack = () => navigate('/');

  return (
    <Box className="user">
      <Center className="user__title">
        <Heading>Профиль</Heading>
        <ImArrowLeft2 className="user__back" onClick={handleBack} />
      </Center>
      <Grid className="user__grid">
        <GridItem className="user__grid-avatar">
          <Avatar
            className="user__grid-avatar__image"
            size="full"
            fontSize={200}
            name={name}
          />
        </GridItem>
        <GridItem className="user__grid-info">
          {currentUser && <Info user={currentUser} />}
        </GridItem>
      </Grid>
      {orders && orders.length ? (
        <Box>
          <Center>
            <Heading pb="5">Список заказов</Heading>
          </Center>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Товар</Th>
                  <Th>Категория</Th>
                  <Th>Цена</Th>
                  <Th>Дата покупки</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order.id}>
                    <Th>{order?.product?.name ? order.product.name : ''}</Th>
                    <Th>{order?.type?.name ? order.type.name : ''}</Th>
                    <Th>{order?.product?.price ? order.product.price : ''}</Th>
                    <Th>
                      {order?.orderDate
                        ? moment(order.orderDate).format('DD.MM.YYYY HH:mm:ss')
                        : ''}
                    </Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : null}
    </Box>
  );
};

export default Profile;

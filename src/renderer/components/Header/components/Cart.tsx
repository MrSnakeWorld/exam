import {
  Box,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Button,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { IoCartSharp } from 'react-icons/io5';
import { CgSmileSad } from 'react-icons/cg';
import useAppSelector from '../../../../utils/hooks/useAppSelector';
import { clearCart } from '../../../store/cart/actions';
import getCart from '../../../store/cart/selectors';
import { createOrder } from '../../../store/orders/actions/create';
import { IUser } from '../../../../utils/interfaces/IUser';
import useAppDispatch from '../../../../utils/hooks/useAppDispatch';
import IOrder from '../../../../utils/interfaces/IOrder';
import moment from 'moment';

interface ICartProps {
  user?: IUser;
}

const Cart = ({ user }: ICartProps) => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(getCart);

  const handleBuy = useCallback(async () => {
    if (!cart || !user) {
      return;
    }

    const promises: Array<Promise<unknown>> = [];

    cart.forEach((item) => {
      const order: IOrder = {
        id: Math.random() * new Date().valueOf(),
        productId: item.id,
        userId: user.id,
        orderDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      console.log({ order });
      promises.push(createOrder(dispatch, order));
    });

    const responses = await Promise.all(promises);
    console.log({ responses });
    dispatch(clearCart());
  }, [cart, user]);

  const handleClear = useCallback(() => dispatch(clearCart()), []);

  return (
    <Box className="header__cart">
      <Popover>
        <PopoverTrigger>
          <IconButton aria-label="Cart" variant="outline">
            <IoCartSharp className="header__cart-icon" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent className="header__cart-content">
          <PopoverArrow />
          <PopoverHeader>
            <Flex className="header__cart-header" pos="relative">
              <Heading size="lg">Корзина</Heading>
              {!!cart.length && (
                <Button
                  pos="absolute"
                  right="0"
                  onClick={handleClear}
                  color="white"
                >
                  Очистить
                </Button>
              )}
            </Flex>
          </PopoverHeader>
          <PopoverBody overflowY="scroll" overflowX="hidden">
            {cart.map((product) => (
              <Flex
                justifyContent="space-between"
                align="center"
                key={product.id}
              >
                <Text>{product.name}</Text>
                <Heading size="sm">{product.price}</Heading>
              </Flex>
            ))}
            {!cart.length && (
              <Flex alignItems="flex-end">
                <Text mr={2}>Корзина пока что пуста </Text>
                <CgSmileSad size={20} />
              </Flex>
            )}
          </PopoverBody>

          <PopoverFooter>
            <Flex justifyContent="flex-end">
              <Button onClick={handleBuy} bgColor="#C62E3E" color="white">
                Приобрести
              </Button>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Cart;

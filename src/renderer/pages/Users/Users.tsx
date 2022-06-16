import {
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
} from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import {
  getCurrentUser,
  getUsersAsArray,
} from '../../store/users/selectors';
import useAppSelector from '../../../utils/hooks/useAppSelector';
import { TbDotsVertical } from 'react-icons/tb';
import { IUser } from '../../../utils/interfaces/IUser';
import useAppDispatch from '../../../utils/hooks/useAppDispatch';
import { updateUser } from '../../store/users/actions/update';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../store/users/actions/delete';

const Users = () => {
  const users = useAppSelector(getUsersAsArray);
  const currentUser = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || (currentUser && !currentUser.isAdmin)) {
      navigate('/');
    }
  }, [currentUser]);

  const handleRole = useCallback(async (user: IUser) => {
    const { isAdmin, ...rest } = user;
    const newUser: IUser = {
      ...rest,
      isAdmin: isAdmin !== 1 ? 1 : 0,
    };

    await updateUser(dispatch, newUser);
  }, []);

  const handleDelete = useCallback(async (user: IUser) => {
    await deleteUser(dispatch, user.id);
  }, []);

  return (
    <div>
      <Center>
        <Heading pb="5">Список пользователей</Heading>
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Имя</Th>
              <Th>Фамилия</Th>
              <Th>Возраст</Th>
              <Th>Электронная почта</Th>
              <Th>Права</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Th>{user.firstName ? user.firstName : ''}</Th>
                <Th>{user.lastName ? user.lastName : ''}</Th>
                <Th>{user.age ? user.age : ''}</Th>
                <Th>{user.email ? user.email : ''}</Th>
                <Th>{user.isAdmin ? 'Администратор' : 'Пользователь'}</Th>
                <Th>
                  {currentUser && currentUser.id !== user.id ? (
                    <Menu>
                      <MenuButton as={IconButton} icon={<TbDotsVertical />} />
                      <MenuList>
                        <MenuItemOption onClick={() => handleRole(user)}>
                          {user.isAdmin
                            ? 'Забрать права администратора'
                            : 'Выдать права администратора'}
                        </MenuItemOption>
                        <MenuItemOption onClick={() => handleDelete(user)}>
                          Удалить пользователя
                        </MenuItemOption>
                      </MenuList>
                    </Menu>
                  ) : null}
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;

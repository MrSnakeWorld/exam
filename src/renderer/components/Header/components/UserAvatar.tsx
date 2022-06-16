import {
  Avatar,
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItemOption,
  MenuList,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logoutUser from '../../../store/users/actions/logout';
import useAppDispatch from '../../../../utils/hooks/useAppDispatch';
import useSize from '../../../../utils/hooks/useSize';
import { IUser } from '../../../../utils/interfaces/IUser';

interface IUserAvatarProps {
  user: IUser;
}

const UserAvatar = ({ user }: IUserAvatarProps) => {
  const dispatch = useAppDispatch();
  const { isDesktop } = useSize();
  const name = `${user.firstName} ${user.lastName}`;
  const navigate = useNavigate();

  const handleProfile = () => navigate('/profile');
  const handleUsers = () => navigate('/users');
  const handleLogout = () => dispatch(logoutUser());

  return (
    <Box className="header__user-avatar" display="flex" alignItems="center">
      <Menu closeOnBlur closeOnSelect autoSelect={false}>
        <MenuButton
          as={Avatar}
          name={name}
          className="avatar"
          color="GrayText"
          bgColor="white"
        />
        <MenuList>
          <MenuGroup
            title={isDesktop ? '' : name}
            fontWeight="bold"
            fontSize="xl"
          >
            <MenuItemOption onClick={handleProfile}>Профиль</MenuItemOption>
            {user.isAdmin ? (
              <MenuItemOption onClick={handleUsers}>
                Пользователи
              </MenuItemOption>
            ) : null}
            <MenuItemOption onClick={handleLogout}>Выйти</MenuItemOption>
          </MenuGroup>
        </MenuList>
      </Menu>
      {isDesktop && <Heading>{name}</Heading>}
    </Box>
  );
};

export default UserAvatar;

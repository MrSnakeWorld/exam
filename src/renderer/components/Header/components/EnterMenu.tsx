import React from 'react';
import useSize from 'utils/hooks/useSize';
import {
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

interface IEnterMenuProps {
  onOpen: () => void;
  setAuth: React.Dispatch<React.SetStateAction<'login' | 'registration'>>;
}

const EnterMenu = ({ onOpen, setAuth }: IEnterMenuProps) => {
  const { isDesktop } = useSize();

  const handleLogin = () => {
    setAuth('login');
    onOpen();
  };

  const handleRegistration = () => {
    setAuth('registration');
    onOpen();
  };

  return isDesktop ? (
    <div className="header__user-login">
      <Text>
        <Link onClick={handleLogin}>Вход</Link>
        &nbsp;/&nbsp;
        <Link onClick={handleRegistration}>Регистрация</Link>
      </Text>
    </div>
  ) : (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMenu />}
        variant="outline"
        className="header__user-login"
      />
      <MenuList textAlign="center">
        <MenuGroup title="Авторизация" fontWeight="bold" fontSize="xl">
          <MenuItem justifyContent="center" onClick={handleLogin}>
            Вход
          </MenuItem>
          <MenuItem justifyContent="center" onClick={handleRegistration}>
            Регистрация
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default EnterMenu;

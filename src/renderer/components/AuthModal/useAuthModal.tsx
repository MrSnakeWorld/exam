import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAsync } from 'react-use';
import AuthModal from './AuthModal';
import { ILoginValues } from './components/Login';
import { IRegistrationValues } from './components/Registration';
import { IUser } from '../../../utils/interfaces/IUser';
import useAppDispatch from '../../../utils/hooks/useAppDispatch';
import { createUser } from '../../store/users/actions/create';

const useAuthModal = (
  auth: 'login' | 'registration' = 'login',
  open = true
) => {
  const { onClose, onOpen, isOpen } = useDisclosure({ isOpen: open });
  const [isAuth, setAuth] = useState(auth);

  const dispatch = useAppDispatch();
  // const users = useAppSelector(extractUsersAsArray);
  const users: IUser[] = [];
  const errorToast = useToast();

  const changeAuth = () =>
    setAuth(isAuth === 'login' ? 'registration' : 'login');

  const handleLogin = (values: ILoginValues) => {
    const { email, password } = values;
    const currentUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (currentUser) {
      // dispatch(loginUser(currentUser));
      onClose();
    } else {
      errorToast({
        position: 'bottom',
        title: 'Не верно введен пароль или такого пользователя не существует',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleRegistration = async (values: IRegistrationValues) => {
    const { firstName, lastName, email, age, password } = values;

    const user: IUser = {
      id: Math.random() * new Date().valueOf(),
      firstName,
      lastName,
      age,
      email,
      password,
    };

    const fields = ['firstName', 'lastName', 'age', 'email', 'password'];
    const arr: Array<string | number> = [
      firstName,
      lastName,
      age,
      email,
      password,
    ];
    const tableName = 'users';
    const query = `INSERT ${tableName}(${fields.join(', ')}) VALUES (${arr
      .map((item) => `'${item}'`)
      .join(', ')});`;

    console.log(query);
    const res = await window.electron.api.create('users', fields, arr);
    console.log({ res });
    onClose();
  };

  const modal = (
    <AuthModal
      handleRegistration={handleRegistration}
      handleLogin={handleLogin}
      isAuth={isAuth}
      setAuth={changeAuth}
      isOpen={isOpen}
      onClose={onClose}
    />
  );

  return {
    modal,
    onOpen,
    setAuth,
  };
};

export default useAuthModal;

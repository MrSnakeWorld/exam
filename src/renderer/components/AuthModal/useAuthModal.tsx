import { useDisclosure, useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { loginUser } from '../../store/users/actions/login';
import AuthModal from './AuthModal';
import { ILoginValues } from './components/Login';
import { IRegistrationValues } from './components/Registration';
import { IUser } from '../../../utils/interfaces/IUser';
import useAppDispatch from '../../../utils/hooks/useAppDispatch';
import { createUser } from '../../store/users/actions/create';
import { getUsersAsArray } from '../../store/users/selectors';
import useAppSelector from '../../../utils/hooks/useAppSelector';

const useAuthModal = (auth: 'login' | 'registration' = 'login') => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [isAuth, setAuth] = useState(auth);

  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsersAsArray);
  const errorToast = useToast();

  const changeAuth = () =>
    setAuth(isAuth === 'login' ? 'registration' : 'login');

  const handleLogin = useCallback(
    (values: ILoginValues) => {
      const { email, password } = values;
      const currentUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (currentUser) {
        dispatch(loginUser(currentUser));

        onClose();
        return;
      }

      errorToast({
        position: 'bottom',
        title: 'Не верно введен пароль или такого пользователя не существует',
        status: 'error',
        isClosable: true,
      });
    },
    [users]
  );

  const handleRegistration = useCallback(
    async (values: IRegistrationValues) => {
      const { firstName, lastName, email, age, password } = values;

      const user: IUser = {
        id: Math.random() * new Date().valueOf(),
        firstName,
        lastName,
        age,
        email,
        password,
      };

      if (users.find((item) => item.email === email)) {
        errorToast({
          position: 'bottom',
          title: 'Пользователь с такой почтой уже зарегистрирован',
          status: 'error',
          isClosable: true,
        });
        return;
      }

      const res = await createUser(dispatch, user);
      if (Array.isArray(res)) {
        dispatch(loginUser(res[0]));
      }

      onClose();
    },
    []
  );

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

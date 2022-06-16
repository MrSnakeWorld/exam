import { Modal, ModalOverlay } from '@chakra-ui/react';
import Login, { ILoginValues } from './components/Login';
import Registration, { IRegistrationValues } from './components/Registration';

interface IAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAuth: 'login' | 'registration';
  setAuth: () => void;
  handleLogin: (values: ILoginValues) => void;
  handleRegistration: (values: IRegistrationValues) => Promise<void>;
}

const AuthModal = ({
  isOpen,
  onClose,
  isAuth,
  setAuth,
  handleLogin,
  handleRegistration,
}: IAuthModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
    <ModalOverlay />
    {isAuth === 'login' ? (
      <Login setAuth={setAuth} onLogin={handleLogin} />
    ) : (
      <Registration setAuth={setAuth} onRegistration={handleRegistration} />
    )}
  </Modal>
);

export default AuthModal;

import { Button } from '@chakra-ui/react';
import React from 'react';
import useAuthModal from '../../components/AuthModal/useAuthModal';
import './Hello.css';

const Hello = () => {
  const { modal, onOpen, setAuth } = useAuthModal('login');

	return (
    <div>
      <Button onClick={onOpen}>Открыть окно регистрации</Button>
      {modal}
    </div>
  );
};

export default Hello;

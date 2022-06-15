import { Button, IconButton } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { IUser } from '../../../utils/interfaces/IUser';
import EnterMenu from './components/EnterMenu';
import UserAvatar from './components/UserAvatar';
import './Header.css';

interface IHeaderProps {
  load: () => Promise<void>;
  user?: IUser;
  onOpen: () => void;
  setAuth: React.Dispatch<React.SetStateAction<'login' | 'registration'>>;
}

const Header = ({ load, user, onOpen, setAuth }: IHeaderProps) => {
  const handleReload = useCallback(async () => {
    await load();
  }, [load]);

  return (
    <div className="header">
      <div className="header__user">
        {user ? (
          <UserAvatar user={user} />
        ) : (
          <EnterMenu onOpen={onOpen} setAuth={setAuth} />
        )}
      </div>
      <IconButton aria-label="Reload" onClick={handleReload} variant="outline">
        <AiOutlineReload />
      </IconButton>
    </div>
  );
};

export default Header;

import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Text,
  Center,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import { ImArrowLeft2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import useAppSelector from 'utils/hooks/useAppSelector';
import { getCurrentUser } from 'renderer/store/users/selectors';
import './Profile.css';
import Info from './components/Info';

const Profile = () => {
  const currentUser = useAppSelector(getCurrentUser);
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
    </Box>
  );
};

export default Profile;

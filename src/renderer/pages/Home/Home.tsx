import React, { useEffect } from 'react';
import readUsers from 'renderer/store/users/actions/read';
import useAppDispatch from 'utils/hooks/useAppDispatch';
import './Home.css';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await readUsers(dispatch);
    })();
  }, [dispatch]);

  return <div />;
};

export default Home;

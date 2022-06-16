import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import useAppDispatch from '../utils/hooks/useAppDispatch';
import useAppSelector from '../utils/hooks/useAppSelector';
import './App.css';
import useAuthModal from './components/AuthModal/useAuthModal';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Titlebar from './components/Titlebar/Titlebar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';
import readOrders from './store/orders/actions/read';
import readProducts from './store/products/actions/read';
import readTypes from './store/types/actions/read';
import readUsers from './store/users/actions/read';
import { getCurrentUser } from './store/users/selectors';

export default function App() {
  const { modal, onOpen, setAuth } = useAuthModal('login');
  const [isInitLoad, setInitLoad] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getCurrentUser);
  const [state, loadAllData] = useAsyncFn(async () => {
    const res = await Promise.all([
      readUsers(dispatch),
      readProducts(dispatch),
      readTypes(dispatch),
      readOrders(dispatch),
    ]);
    console.log({ res });
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await window.api.init();
      await window.api.initData();

      setInitLoad(true);
    })();
  }, []);

  useEffect(() => {
    loadAllData();
  }, [isInitLoad]);

  return (
    <Router>
      <Titlebar />
      <Header
        onOpen={onOpen}
        setAuth={setAuth}
        load={loadAllData}
        user={currentUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <Loader loading={state.loading} />
      {modal}
    </Router>
  );
}

import { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import useAppDispatch from 'utils/hooks/useAppDispatch';
import useAppSelector from 'utils/hooks/useAppSelector';
import './App.css';
import useAuthModal from './components/AuthModal/useAuthModal';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import readUsers from './store/users/actions/read';
import { getCurrentUser } from './store/users/selectors';

export default function App() {
  const { modal, onOpen, setAuth } = useAuthModal('login');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getCurrentUser);
  const [state, loadAllData] = useAsyncFn(async () => {
    await Promise.all([readUsers(dispatch)]);
  }, [dispatch]);

  useEffect(() => {
    (async () => window.api.init())();
    loadAllData();
  }, []);

  return (
    <Router>
      <Header
        onOpen={onOpen}
        setAuth={setAuth}
        load={loadAllData}
        user={currentUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Loader loading={state.loading} />
      {modal}
    </Router>
  );
}

import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../renderer/store';

export default () => useDispatch<AppDispatch>();
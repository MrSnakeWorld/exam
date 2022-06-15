import { ActionCreator, AnyAction } from 'redux';
import { AppDispatch } from '../renderer/store';

const apiAction = async <R>(
  dispatch: AppDispatch,
  request: ActionCreator<AnyAction>,
  success: ActionCreator<AnyAction>,
  failure: ActionCreator<AnyAction>,
  call: () => Promise<R>
) => {
  try {
    dispatch(request());

    const res = await call();
    console.log('another res', { res });
    dispatch(success(res));
  } catch (e) {
    dispatch(failure(e));
  }
};

export default apiAction;

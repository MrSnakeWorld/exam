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
    dispatch(success(res));

    return res;
  } catch (e) {
    dispatch(failure(e));

    return e;
  }
};

export default apiAction;

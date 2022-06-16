import { IState } from '..';

export const getTypesData = (state: IState) => state.types;

export const getTypesAsArray = (state: IState) => {
  const { types } = state;

  return types.allIds.map((id) => types.byId[id]);
};

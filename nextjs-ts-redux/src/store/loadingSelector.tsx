// loading state selector for all api loading state
import _ from 'lodash';

export const createLoadingSelector = (actions: any) => (state: any) => {
  // returns true only when all actions is not loading
  return _(actions).some(action => _.get(state, `loading.${action}`));
};

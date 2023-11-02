import { getMe as _getMe } from 'api-hooks/auth';
import { UserModel } from 'api-hooks/user';
import { produce } from 'immer';
import * as React from 'react';

export interface AuthState {
  userData?: UserModel;
}

interface SelectorResult extends AuthState {
  dispatch: React.Dispatch<{
    type: 'setUser' | 'reset';
    payload: any;
  }>;
  getMe: () => Promise<UserModel | undefined>;
}

const initialState: AuthState = {
  userData: undefined,
};

const context = React.createContext<SelectorResult>({
  dispatch() {},
  async getMe() {
    return undefined;
  },
});

const { Provider } = context;

interface SelectorProviderProps {
  children: React.ReactNode;
}

function reducer({
  state,
  action,
}: {
  state: any;
  action: {
    type: 'setUser' | 'reset';
    payload: any;
  };
}) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'setUser':
      return produce(state, (draft) => {
        draft.userData = action.payload;
      });
    default:
      return state;
  }
}

export function SelectorProvider(props: SelectorProviderProps) {
  const [state, dispatch] = React.useReducer(
    (state, action) => reducer({ state, action }),
    initialState,
  );

  const getMe = React.useCallback(async () => {
    try {
      const user = await _getMe();
      dispatch({ type: 'setUser', payload: user });
      return user;
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Provider
      value={{
        ...state,
        dispatch,
        getMe,
      }}
    >
      {props.children}
    </Provider>
  );
}

export function useSelector() {
  return React.useContext(context);
}

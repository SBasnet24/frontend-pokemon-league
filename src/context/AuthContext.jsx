import { createContext, useContext, useReducer } from "react";
import { removeAccessToken, setAccessToken } from "../helpers/accessToken";

const initialState = {
  isAuthenticated: false,
  trainer: null,
};

const AuthContext = createContext();

export const AUTH_TYPE = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_TYPE.LOGIN:
      setAccessToken(action.payload.token);
      localStorage.setItem("trainerId", action.payload.trainer.id);
      return {
        ...state,
        isAuthenticated: true,
        trainer: action.payload.trainer,
      };
    case AUTH_TYPE.LOGOUT:
      removeAccessToken();
      localStorage.removeItem("trainerId");
      return {
        ...state,
        isAuthenticated: false,
        trainer: null,
      };
    default:
      return state;
  }
};

const AuthenticationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isAuthenticated, trainer } = state;

  return (
    <AuthContext.Provider value={{ isAuthenticated, trainer, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthentication = () => useContext(AuthContext);
export { useAuthentication, AuthenticationProvider };

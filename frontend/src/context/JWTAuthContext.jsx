import { createContext, useEffect, useReducer, useRef } from "react";
import axiosInstance from "../services/axios";
import { validateToken } from "../utils/jwt";
import { resetSession, setSession } from "../utils/session";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  login: async () => {},
  logout: () => {},
});

const handlers = {
  INITIALIZE: (state, { payload }) => ({
    ...state,
    isAuthenticated: payload.isAuthenticated,
    isInitialized: true,
    user: payload.user,
  }),
  LOGIN: (state, { payload }) => ({
    ...state,
    isAuthenticated: true,
    user: payload.user,
  }),
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  UPDATE_USER: (state, { payload }) => ({
    ...state,
    user: { ...state.user, ...payload },
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;

    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken && validateToken(accessToken)) {
          setSession(accessToken);
          const { data: user } = await axiosInstance.get("/users/me");

          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    initialize();
    isMounted.current = true;
  }, []);

  const getTokens = async (email, password) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const { data } = await axiosInstance.post("/auth/login", formData);
    setSession(data.access_token, data.refresh_token);
  };

  const login = async (email, password) => {
    try {
      await getTokens(email, password);
      const { data: user } = await axiosInstance.get("/users/me");

      dispatch({ type: "LOGIN", payload: { user } });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    resetSession();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

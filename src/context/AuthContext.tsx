import { createContext, useReducer } from "react";
import { useProfesores } from "../hooks/useProfesores";

interface userlog {
  id: number;
  name: string;
  rol: number;
  email: string;
}

interface AuthState {
  user: userlog | null;
  isLogged: boolean;
  isload: boolean;
}
interface LogData {
  user: string;
  pass: string;
}

interface AuthContextProps {
  authState: AuthState;
  singIn: (data: LogData) => void;
  logOut: () => void;
}

const authInitialState: AuthState = {
  user: null,
  isLogged: false,
  isload: false,
};

type AuthAction =
  | { type: "logIn"; payload: { user: userlog } }
  | { type: "logOut" };

export const AuthContext = createContext({} as AuthContextProps);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "logIn":
      return {
        ...state,
        user: action.payload.user,
        isLogged: true,
      };
    case "logOut":
      return authInitialState;

    default:
      return state;
  }
};

export const AuthProvider = ({ children }: any) => {
  const [authstate, dispatch] = useReducer(authReducer, authInitialState);
  const { loginP } = useProfesores({});
  const singIn = async(data: LogData) => {
    const user = await loginP(data) 
    dispatch({ type: "logIn", payload: { user } });
  };
  const logOut = () => {
    dispatch({ type: "logOut" });
  };
  return (
    <AuthContext.Provider value={{ authState: authstate, singIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

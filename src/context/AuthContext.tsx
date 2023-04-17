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
  const { profesoresState } = useProfesores();
  const singIn = (data: LogData) => {
    const user = profesoresState.filter((profesor) => {
      return (
        profesor.usuario === data.user && profesor.contrasena === data.pass
      );
    });
    if (user.length > 0) {
      const cuenta = user[0];
      dispatch({
        type: "logIn",
        payload: {
          user: {
            id: cuenta.id,
            name: cuenta.nombre,
            rol: cuenta.idCuenta,
            email: cuenta.email,
          },
        },
      });
    }
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

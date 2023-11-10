import { useContext, createContext, ReactNode, useState } from "react";
type UserType = {
  email: string;
  password: string;
  name: string;
  avatar: string;
};
type InitialType = {
  isAuth: boolean;
  user: UserType | null;
  error: string;
  handleLogin: (userData: { email: string; password: string }) => void;
  handleLogout: () => void;
};
const initialState: InitialType = {
  isAuth: false,
  user: null,
  error: "",
  handleLogin: () => {},
  handleLogout: () => {},
};

const fake_user_from_backend: UserType = {
  name: "Ali",
  email: "test@test.com",
  password: "123qwe",
  avatar: "https://i.pravatar.cc/100?flickiring",
};

const AuthContext = createContext(initialState);
export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string>("");

  function handleLogin(userData: { email: string; password: string }) {
    setError("");
    if (
      userData.email === fake_user_from_backend.email &&
      userData.password === fake_user_from_backend.password
    ) {
      setIsAuth(true);
      setUser(fake_user_from_backend);
    } else {
      setError("Credentials do not match");
    }
  }
  function handleLogout() {
    setIsAuth(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuth, handleLogin, user, handleLogout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const auth = useContext(AuthContext);
  return auth;
}

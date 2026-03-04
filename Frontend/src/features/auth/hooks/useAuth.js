import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { register, login, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, loading, setUser, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogin({ username, password }) {
    setLoading(true);
    const data = await login({ username, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleGetMe() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    const data = await logout();
    setUser(data.user);
    setLoading(false);
  }

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};

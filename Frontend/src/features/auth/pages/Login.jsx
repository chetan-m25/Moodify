import { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      return setError("Username and password are required");
    }

    const result = await handleLogin({ username, password });

    if (!result.success) {
      return setError("Invalid username or password");
    }

    navigate("/");
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Welcome Back to Moodify</h1>
        <p className="subtitle">Feel the vibe. Continue your music journey.</p>

        <form onSubmit={handleSubmit}>
          <FormGroup
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="username"
            placeholder="Enter your username"
          />

          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="password"
            placeholder="Enter your password"
          />

          {error && <p className="form-error">{error}</p>}

          <button className="button" type="submit" disabled={loading}>
            {loading ? <span className="btn-loader"></span> : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;

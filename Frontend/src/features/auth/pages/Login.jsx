import { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ username, password });
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
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;

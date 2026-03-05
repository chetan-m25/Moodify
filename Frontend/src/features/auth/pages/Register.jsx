import { useState } from "react";
import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      return setError("All fields are required");
    }

    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email");
    }

    if (password.length < 4) {
      return setError("Password must be at least 4 characters");
    }

    if (password.length > 8) {
      return setError("Password cannot exceed 8 characters");
    }

    const result = await handleRegister({ username, email, password });

    if (!result.success) {
      return setError(result.message);
    }

    navigate("/");
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Join Moodify</h1>
        <p className="subtitle">Discover music that matches your mood.</p>

        <form onSubmit={handleSubmit}>
          <FormGroup
            value={username}
            onChange={(e) => setUsername(e.target.value.slice(0, 15))}
            label="username"
            placeholder="Enter username"
          />

          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="email"
            placeholder="Enter email"
          />

          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="password"
            placeholder="Enter password"
          />

          {error && <p className="form-error">{error}</p>}

          <button className="button" type="submit" disabled={loading}>
            {loading ? <span className="btn-loader"></span> : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;

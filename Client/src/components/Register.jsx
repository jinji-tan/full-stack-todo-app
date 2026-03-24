import { useState } from "react";
import { registerApi } from "../services/api";

const Register = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");

    try {
      await registerApi(email, password);
      alert("Registration successful!");
      setPage("login");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <form className="register-form" onSubmit={registerUser}>
      <h1>Register</h1>

      <input
        className="register-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        required
      />
      {email && !validateEmail(email) && (
        <p className="error">Email must be a valid format (example@gmail.com)</p>
      )}

      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
        required
      />

      {password && !validatePassword(password) && (
        <p className="error">Password must be at least 8 characters</p>
      )}

      {error && <p className="error">{error}</p>}

      <button type="submit" className="register-button">
        Create Account
      </button>

      <button
        type="button"
        className="register-button"
        onClick={() => setPage("login")}
      >
        Back
      </button>
    </form>
  );
};

export default Register;
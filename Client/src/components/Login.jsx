import { useState } from "react";
import { loginApi } from "../services/api";

const Login = ({ setPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();
        if (!email || !password) return setError("Please enter email or password.");

        try {
            const token = await loginApi(email, password);
            localStorage.setItem('token', token);
            setPage("main");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <form className="login-form">
            <h1>Login</h1>
            <input className="login-input" type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
            <input className="login-input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
            {error && <p className="error">{error}</p>}
            <button type="button" className="login-button" onClick={loginUser}>Login</button>
            <button type="button" className="login-button" onClick={() => setPage("register")}>Register</button>
        </form >
    );
}

export default Login;
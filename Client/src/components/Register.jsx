import { useState } from "react";
import { registerApi } from "../services/api";


const Register = ({ setPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();
        if (!email || !password) return alert("Please enter email or password.");

        try {
            await registerApi(email, password);
            alert("Success")
            setPage("login");

        } catch (error) {
            setError(error.message || "Something went wrong.");
        }
    }

    return (
        <form className="register-form">
            <h1>Register</h1>
            <input className="register-input" type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
            <input className="register-input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
            {error && <p className="error">{error}</p>}
            <button type="button" className="register-button" onClick={registerUser}>Create Account</button>
            <button type="button" className="register-button" onClick={() => setPage("login")}>Back</button>
        </form>
    )
}

export default Register;
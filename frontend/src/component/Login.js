import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-4 mx-auto shadow">
        <h3 className="mb-3">Login</h3>

        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>

        <p className="mt-3 text-center">
          Don't have account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
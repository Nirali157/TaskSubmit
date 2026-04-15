import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const nav = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/auth/register", form);
      alert("Registered successfully");
      nav("/");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-4 mx-auto shadow">
        <h3 className="mb-3">Register</h3>

        <input
          className="form-control mb-2"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-success w-100" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
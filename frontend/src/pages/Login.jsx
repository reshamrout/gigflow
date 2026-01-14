import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await login(form);
    toast.success(res.message || "Login successful");
    navigate("/");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Try again!"
    );
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600">Welcome Back</h2>
          <p className="text-gray-500 mt-1">Login to continue to GigFlow</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input mt-1"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input mt-1"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary w-full py-2 text-lg">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

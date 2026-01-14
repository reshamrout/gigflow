import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const {register} = useContext(AuthContext);
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      toast.success("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message
        
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600">
            Create Account
          </h2>
          <p className="text-gray-500 mt-1">
            Join GigFlow and start collaborating
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input mt-1"
              value={form.name}
              onChange={handleChange}
            />
          </div>

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
              placeholder="Create a strong password"
              className="input mt-1"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-2 text-lg"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

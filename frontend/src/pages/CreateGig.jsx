import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateGig = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/gigs", { ...form, budget: Number(form.budget) });
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Post a New Gig</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="title" className="input" placeholder="Gig Title" onChange={handleChange} />
          <textarea name="description" rows="4" className="input" placeholder="Description" onChange={handleChange} />
          <input name="budget" type="number" className="input" placeholder="Budget (₹)" onChange={handleChange} />

          <button className="btn-primary w-full">Create Gig</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGig;

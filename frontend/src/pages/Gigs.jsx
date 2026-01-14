import React from 'react'
import { useEffect, useState } from "react";
import api from "../api/axios";
import GigCard from "../components/GigCard";

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get(`/gigs?search=${search}`).then(res => setGigs(res.data));
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Next Gig</h1>

      <input
        className="input mb-6"
        placeholder="Search gigs by title..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map(gig => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
    </div>
  );
};

export default Gigs;

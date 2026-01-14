import React from "react";
import { Link } from "react-router-dom";

const GigCard = ({ gig }) => (
  <div className="card hover:shadow-lg transition">
    <h3 className="text-xl font-semibold mb-2">{gig.title}</h3>
    <p className="text-gray-600 line-clamp-2 mb-4">
      {gig.description}
    </p>

    <div className="flex justify-between items-center">
      <span className="text-indigo-600 font-bold">
        ₹ {gig.budget}
      </span>

      <Link
        to={`/gigs/${gig._id}`}
        className="text-indigo-600 hover:underline"
      >
        View →
      </Link>
    </div>
  </div>
);

export default GigCard;

import React from "react";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [bid, setBid] = useState({ message: "", price: "" });
  const [loading, setLoading] = useState(false);

  const fetchGig = async () => {
    const res = await api.get(`/gigs/${id}`);
    setGig(res.data);
  };

  const fetchBids = async () => {
    const res = await api.get(`/bids/${id}`);
    setBids(res.data);
  };

  useEffect(() => {
    fetchBids();
    fetchGig();
  }, []);

  const submitBid = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to place a bid");
      navigate("/login");
      return;
    }

    if (!bid.message || !bid.price) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/bids", {
        gigId: id,
        message: bid.message,
        price: Number(bid.price),
      });

      toast.success("Bid submitted successfully 🎉");
      setBid({ message: "", price: "" });
      fetchBids();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit bid");
    } finally {
      setLoading(false);
    }
  };

  const hire = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      toast.success("Freelancer hired successfully");
      fetchBids();
    } catch (err) {
      toast.error("Hiring failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* ===== SUBMIT BID CARD ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Submit Your Bid</h3>

        <form onSubmit={submitBid} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Proposal Message</label>
            <textarea
              className="input mt-1"
              rows="4"
              placeholder="Explain why you are a good fit for this gig"
              value={bid.message}
              onChange={(e) => setBid({ ...bid, message: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Bid Amount (₹)</label>
            <input
              type="number"
              className="input mt-1"
              placeholder="Enter your price"
              value={bid.price}
              onChange={(e) => setBid({ ...bid, price: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Submitting..." : "Submit Bid"}
          </button>
        </form>
      </div>

      {/* ===== BIDS LIST ===== */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Submitted Bids</h3>

        {bids.length === 0 && (
          <p className="text-gray-500">No bids submitted yet.</p>
        )}

        <div className="space-y-4">
          {bids.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-start"
            >
              <div>
                <p className="text-gray-700 mb-2">{b.message}</p>
                <span className="font-semibold text-indigo-600">
                  ₹ {b.price}
                </span>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    b.status === "hired"
                      ? "bg-green-100 text-green-700"
                      : b.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {b.status.toUpperCase()}
                </span>

                {user &&
                  gig &&
                  user._id === gig.ownerId &&
                  b.status === "pending" && (
                    <button
                      onClick={() => hire(b._id)}
                      className="bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-800"
                    >
                      Hire
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GigDetails;

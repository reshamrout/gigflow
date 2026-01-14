import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const BidCard = ({ bid, gigOwnerId, onHireSuccess }) => {
  const { user } = useAuth();
  const isOwner = user?._id === gigOwnerId;

  const hire = async () => {
    await api.patch(`/bids/${bid._id}/hire`);
    onHireSuccess();
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">₹ {bid.price}</h4>
        <span
          className={`badge ${
            bid.status === "hired"
              ? "bg-green-100 text-green-700"
              : bid.status === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {bid.status.toUpperCase()}
        </span>
      </div>

      <p className="text-gray-600 mt-2">{bid.message}</p>

      {isOwner && bid.status === "pending" && (
        <button onClick={hire} className="btn-primary mt-4">
          Hire Freelancer
        </button>
      )}
    </div>
  );
};

export default BidCard;

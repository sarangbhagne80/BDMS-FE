import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Request {
  _id: string;
  bloodGroup: string;
  unitsRequired: number;
  hospital: string;
  urgency: string;
}

export function RecentRequestsTable() {
  const [requests, setRequests] = useState<Request[]>([]);
  const navigate = useNavigate();

  // Fetch from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/recent-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };

    fetchRequests();
  }, []);

  
  
  // Navigate to full requests page
  const handleView = () => {
    navigate("/admin/requests");
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Recent Blood Requests
      </h3>

      <div className="bg-white border border-gray-300">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-4">Blood Group</th>
              <th className="text-left p-4">Units</th>
              <th className="text-left p-4">Hospital / Location</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-400">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{request.bloodGroup}</td>
                  <td className="p-4">{request.unitsRequired}</td>
                  <td className="p-4">{request.hospital}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-sm rounded ${
                        request.urgency === "Critical"
                          ? "bg-red-100 text-red-700"
                          : request.urgency === "High"
                          ? "bg-blue-100 text-blue-700"
                          : request.urgency === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {request.urgency}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={handleView}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

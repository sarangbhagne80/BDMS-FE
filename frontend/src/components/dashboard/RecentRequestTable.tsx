const requests = [
  {
    id: 1,
    bloodGroup: 'O+',
    units: 2,
    location: 'City Hospital, New York',
    status: 'Pending',
  },
  {
    id: 2,
    bloodGroup: 'A-',
    units: 3,
    location: 'Memorial Medical Center, Boston',
    status: 'Approved',
  },
  {
    id: 3,
    bloodGroup: 'B+',
    units: 1,
    location: 'St. Mary Hospital, Chicago',
    status: 'Pending',
  },
  {
    id: 4,
    bloodGroup: 'AB+',
    units: 4,
    location: 'General Hospital, Los Angeles',
    status: 'Completed',
  },
  {
    id: 5,
    bloodGroup: 'O-',
    units: 2,
    location: 'Community Hospital, Miami',
    status: 'Pending',
  },
];

export function RecentRequestsTable() {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Blood Requests</h3>
      <div className="bg-white border border-gray-300">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-900">Blood Group</th>
              <th className="text-left p-4 font-semibold text-gray-900">Units</th>
              <th className="text-left p-4 font-semibold text-gray-900">Hospital / Location</th>
              <th className="text-left p-4 font-semibold text-gray-900">Status</th>
              <th className="text-left p-4 font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{request.bloodGroup}</td>
                <td className="p-4 text-gray-700">{request.units}</td>
                <td className="p-4 text-gray-700">{request.location}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-sm ${
                      request.status === 'Pending'
                        ? 'bg-red-100 text-red-700'
                        : request.status === 'Approved'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-red-600 hover:text-red-700 font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

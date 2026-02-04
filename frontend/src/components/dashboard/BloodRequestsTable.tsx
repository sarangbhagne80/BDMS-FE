import { useState } from 'react';

interface BloodRequest {
  id: number;
  patientName: string;
  bloodGroup: string;
  units: number;
  hospital: string;
  contactNumber: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Completed';
}

const mockRequests: BloodRequest[] = [
  {
    id: 1,
    patientName: 'Robert Anderson',
    bloodGroup: 'O+',
    units: 2,
    hospital: 'City Hospital, New York',
    contactNumber: '+1 234-567-8901',
    date: '2025-01-25',
    status: 'Pending',
  },
  {
    id: 2,
    patientName: 'Patricia Miller',
    bloodGroup: 'A-',
    units: 3,
    hospital: 'Memorial Medical Center, Boston',
    contactNumber: '+1 234-567-8902',
    date: '2025-01-24',
    status: 'Approved',
  },
  {
    id: 3,
    patientName: 'Christopher Wilson',
    bloodGroup: 'B+',
    units: 1,
    hospital: 'St. Mary Hospital, Chicago',
    contactNumber: '+1 234-567-8903',
    date: '2025-01-23',
    status: 'Pending',
  },
  {
    id: 4,
    patientName: 'Linda Moore',
    bloodGroup: 'AB+',
    units: 4,
    hospital: 'General Hospital, Los Angeles',
    contactNumber: '+1 234-567-8904',
    date: '2025-01-22',
    status: 'Completed',
  },
  {
    id: 5,
    patientName: 'Daniel Taylor',
    bloodGroup: 'O-',
    units: 2,
    hospital: 'Community Hospital, Miami',
    contactNumber: '+1 234-567-8905',
    date: '2025-01-21',
    status: 'Approved',
  },
  {
    id: 6,
    patientName: 'Barbara Thomas',
    bloodGroup: 'A+',
    units: 3,
    hospital: 'University Hospital, Seattle',
    contactNumber: '+1 234-567-8906',
    date: '2025-01-20',
    status: 'Completed',
  },
  {
    id: 7,
    patientName: 'Matthew Jackson',
    bloodGroup: 'B-',
    units: 1,
    hospital: 'Regional Medical Center, Denver',
    contactNumber: '+1 234-567-8907',
    date: '2025-01-19',
    status: 'Pending',
  },
  {
    id: 8,
    patientName: 'Elizabeth White',
    bloodGroup: 'AB-',
    units: 2,
    hospital: 'Central Hospital, Phoenix',
    contactNumber: '+1 234-567-8908',
    date: '2025-01-18',
    status: 'Approved',
  },
  {
    id: 9,
    patientName: 'Anthony Harris',
    bloodGroup: 'O+',
    units: 3,
    hospital: 'Providence Hospital, Portland',
    contactNumber: '+1 234-567-8909',
    date: '2025-01-17',
    status: 'Completed',
  },
  {
    id: 10,
    patientName: 'Nancy Martin',
    bloodGroup: 'A-',
    units: 1,
    hospital: 'Trinity Medical Center, Austin',
    contactNumber: '+1 234-567-8910',
    date: '2025-01-16',
    status: 'Pending',
  },
];

interface BloodRequestsTableProps {
  searchQuery: string;
  bloodGroupFilter: string;
  statusFilter: string;
}

export function BloodRequestsTable({
  searchQuery,
  bloodGroupFilter,
  statusFilter,
}: BloodRequestsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter requests based on search query, blood group, and status
  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.contactNumber.includes(searchQuery);

    const matchesBloodGroup =
      bloodGroupFilter === 'all' || request.bloodGroup === bloodGroupFilter;

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

    return matchesSearch && matchesBloodGroup && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  const handleApprove = (id: number, patientName: string) => {
    if (confirm(`Approve blood request for "${patientName}"?`)) {
      console.log('Approving request:', id);
    }
  };

  const handleComplete = (id: number, patientName: string) => {
    if (confirm(`Mark blood request for "${patientName}" as completed?`)) {
      console.log('Completing request:', id);
    }
  };

  const handleDelete = (id: number, patientName: string) => {
    if (confirm(`Are you sure you want to delete the request for "${patientName}"?`)) {
      console.log('Deleting request:', id);
    }
  };

  return (
    <div>
      {/* Table Card */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-900">Patient Name</th>
              <th className="text-left p-4 font-semibold text-gray-900">Blood Group</th>
              <th className="text-left p-4 font-semibold text-gray-900">Units</th>
              <th className="text-left p-4 font-semibold text-gray-900">Hospital / Location</th>
              <th className="text-left p-4 font-semibold text-gray-900">Contact Number</th>
              <th className="text-left p-4 font-semibold text-gray-900">Date</th>
              <th className="text-left p-4 font-semibold text-gray-900">Status</th>
              <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((request, index) => (
                <tr
                  key={request.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    index % 2 === 1 ? 'bg-gray-50' : ''
                  }`}
                >
                  <td className="p-4 font-medium text-gray-900">{request.patientName}</td>
                  <td className="p-4">
                    <span className="font-medium text-gray-900">{request.bloodGroup}</span>
                  </td>
                  <td className="p-4 text-gray-700">{request.units}</td>
                  <td className="p-4 text-gray-700">{request.hospital}</td>
                  <td className="p-4 text-gray-700">{request.contactNumber}</td>
                  <td className="p-4 text-gray-700">{request.date}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
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
                    <div className="flex items-center gap-3">
                      <button className="text-gray-700 hover:text-gray-900 font-medium">
                        View
                      </button>
                      {request.status === 'Pending' && (
                        <>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleApprove(request.id, request.patientName)}
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Approve
                          </button>
                        </>
                      )}
                      {request.status === 'Approved' && (
                        <>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleComplete(request.id, request.patientName)}
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Complete
                          </button>
                        </>
                      )}
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleDelete(request.id, request.patientName)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No blood requests found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredRequests.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-700">
            Showing {startIndex + 1}–{Math.min(endIndex, filteredRequests.length)} of{' '}
            {filteredRequests.length} requests
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-300 rounded ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

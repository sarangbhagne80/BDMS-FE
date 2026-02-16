import { useState } from 'react';

interface ContactQuery {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Replied' | 'Closed';
}

const mockQueries: ContactQuery[] = [
  {
    id: 1,
    name: 'John Williams',
    email: 'john.williams@email.com',
    subject: 'Blood Donation Eligibility Question',
    message:
      'Hello, I recently traveled to a malaria-endemic region and wanted to know when I can donate blood again. Could you please provide information on the waiting period and any specific requirements?',
    date: '2025-01-26',
    status: 'New',
  },
  {
    id: 2,
    name: 'Sarah Martinez',
    email: 'sarah.m@email.com',
    subject: 'Urgent Blood Request Follow-up',
    message:
      'I submitted a blood request for my father who needs O- blood type urgently. Could you please update me on the status of the request? This is quite urgent as his surgery is scheduled for tomorrow.',
    date: '2025-01-25',
    status: 'Replied',
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    subject: 'Donation Center Location Query',
    message:
      'I would like to donate blood but I am not sure about the nearest donation center in the Chicago area. Can you provide me with a list of centers and their operating hours?',
    date: '2025-01-24',
    status: 'New',
  },
  {
    id: 4,
    name: 'Emily Thompson',
    email: 'emily.t@email.com',
    subject: 'Thank You for Blood Donation',
    message:
      'I wanted to thank your organization for the wonderful blood donation experience. The staff was very professional and caring. I will definitely be donating again soon.',
    date: '2025-01-23',
    status: 'Closed',
  },
  {
    id: 5,
    name: 'David Rodriguez',
    email: 'david.r@email.com',
    subject: 'Partnership Inquiry',
    message:
      'I represent a corporate organization interested in organizing a blood donation camp at our office. Could you please share details about how we can partner with your organization for this initiative?',
    date: '2025-01-22',
    status: 'Replied',
  },
  {
    id: 6,
    name: 'Jessica Brown',
    email: 'jessica.brown@email.com',
    subject: 'Post-Donation Health Concern',
    message:
      'I donated blood yesterday and have been feeling dizzy and weak since then. Is this normal? Should I be concerned? Please advise on what steps I should take.',
    date: '2025-01-21',
    status: 'New',
  },
  {
    id: 7,
    name: 'Christopher Lee',
    email: 'chris.lee@email.com',
    subject: 'Blood Type Verification',
    message:
      'During my last donation, I was told my blood type is AB+. However, my medical records show a different blood type. Can you help me verify which is correct?',
    date: '2025-01-20',
    status: 'Closed',
  },
  {
    id: 8,
    name: 'Amanda Walker',
    email: 'amanda.w@email.com',
    subject: 'Volunteer Opportunity',
    message:
      'I am a nursing student and would love to volunteer at your blood donation drives. Could you please let me know about volunteer opportunities and the application process?',
    date: '2025-01-19',
    status: 'Replied',
  },
  {
    id: 9,
    name: 'Daniel Harris',
    email: 'daniel.harris@email.com',
    subject: 'Donation Certificate Request',
    message:
      'I donated blood last month and would like to request a donation certificate for my employer. Could you please send me the certificate or guide me on how to obtain it?',
    date: '2025-01-18',
    status: 'Closed',
  },
  {
    id: 10,
    name: 'Michelle Young',
    email: 'michelle.y@email.com',
    subject: 'Medication and Donation Eligibility',
    message:
      'I am currently taking antibiotics for an infection. How long do I need to wait after completing my medication before I can donate blood? Thank you for your help.',
    date: '2025-01-17',
    status: 'New',
  },
];

interface ContactQueriesTableProps {
  searchQuery: string;
  statusFilter: string;
  dateFilter: string;
}

export function ContactQueriesTable({
  searchQuery,
  statusFilter,
  dateFilter,
}: ContactQueriesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [replyText, setReplyText] = useState('');
  const itemsPerPage = 10;

  // Filter queries
  const filteredQueries = mockQueries.filter((query) => {
    const matchesSearch =
      query.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || query.status === statusFilter;

    // Simple date filtering (you can enhance this)
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = query.date === '2025-01-26';
    } else if (dateFilter === 'week') {
      matchesDate = new Date(query.date) >= new Date('2025-01-20');
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQueries = filteredQueries.slice(startIndex, endIndex);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleView = (query: ContactQuery) => {
    setSelectedQuery(query);
    setReplyText('');
  };

  const handleCloseModal = () => {
    setSelectedQuery(null);
    setReplyText('');
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      alert('Reply sent successfully!');
      handleCloseModal();
    }
  };

  const handleMarkClosed = (id: number, name: string) => {
    if (confirm(`Mark message from "${name}" as closed?`)) {
      console.log('Marking as closed:', id);
    }
  };

  return (
    <div>
      {/* Table Card */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-900">Name</th>
              <th className="text-left p-4 font-semibold text-gray-900">Email</th>
              <th className="text-left p-4 font-semibold text-gray-900">Subject</th>
              <th className="text-left p-4 font-semibold text-gray-900">Message Preview</th>
              <th className="text-left p-4 font-semibold text-gray-900">Date</th>
              <th className="text-left p-4 font-semibold text-gray-900">Status</th>
              <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQueries.length > 0 ? (
              currentQueries.map((query, index) => (
                <tr
                  key={query.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    index % 2 === 1 ? 'bg-gray-50' : ''
                  }`}
                >
                  <td className="p-4 font-medium text-gray-900">{query.name}</td>
                  <td className="p-4 text-gray-700">{query.email}</td>
                  <td className="p-4 text-gray-700">{query.subject}</td>
                  <td className="p-4 text-gray-600 text-sm">
                    {truncateText(query.message, 50)}
                  </td>
                  <td className="p-4 text-gray-700">{query.date}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        query.status === 'New'
                          ? 'bg-red-100 text-red-700'
                          : query.status === 'Replied'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {query.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleView(query)}
                        className="text-gray-700 hover:text-gray-900 font-medium"
                      >
                        View
                      </button>
                      {query.status !== 'Closed' && (
                        <>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleView(query)}
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Reply
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleMarkClosed(query.id, query.name)}
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Mark Closed
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No contact queries found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredQueries.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-700">
            Showing {startIndex + 1}–{Math.min(endIndex, filteredQueries.length)} of{' '}
            {filteredQueries.length} messages
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

      {/* View Message Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="border-b border-gray-300 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">View Message</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Full Name
                </label>
                <p className="text-gray-700">{selectedQuery.name}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                <p className="text-gray-700">{selectedQuery.email}</p>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Subject</label>
                <p className="text-gray-700">{selectedQuery.subject}</p>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Date</label>
                <p className="text-gray-700">{selectedQuery.date}</p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Status</label>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedQuery.status === 'New'
                      ? 'bg-red-100 text-red-700'
                      : selectedQuery.status === 'Replied'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {selectedQuery.status}
                </span>
              </div>

              {/* Full Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Message</label>
                <div className="bg-gray-50 p-4 rounded border border-gray-300">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedQuery.message}</p>
                </div>
              </div>

              {/* Reply Section */}
              {selectedQuery.status !== 'Closed' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-300 p-6 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
              {selectedQuery.status !== 'Closed' && (
                <button
                  onClick={handleSendReply}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Send Reply
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

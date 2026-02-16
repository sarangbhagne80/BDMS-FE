const stats = [
  { label: 'Total Messages', value: 87 },
  { label: 'New', value: 15 },
  { label: 'Replied', value: 42 },
  { label: 'Closed', value: 30 },
];

export function QueryStatsCards() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm"
        >
          <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
          <p className="text-sm text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

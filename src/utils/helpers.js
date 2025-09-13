export const getStatusColor = (status) => {
  const colors = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-amber-100 text-amber-800',
    'Qualified': 'bg-green-100 text-green-800',
    'Proposal': 'bg-purple-100 text-purple-800',
    'Closed-Lost': 'bg-red-100 text-red-800',
    'Converted': 'bg-emerald-100 text-emerald-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600 font-semibold';
  if (score >= 60) return 'text-yellow-600 font-semibold';
  if (score >= 40) return 'text-orange-600 font-semibold';
  return 'text-red-600 font-semibold';
};


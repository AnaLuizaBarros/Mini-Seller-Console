import { TrendingUp } from 'lucide-react';

const OpportunitiesTable = ({ opportunities }) => {
  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg">
        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-semibold">No opportunities yet</p>
        <p className="text-gray-400 text-sm">Convert a lead to see it here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">Opportunity Name</th>
            <th scope="col" className="px-6 py-4 font-medium">Account Name</th>
            <th scope="col" className="px-6 py-4 font-medium">Stage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {opportunities.map((opp) => (
            <tr key={opp.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {opp.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{opp.accountName}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {opp.stage}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpportunitiesTable;
import React from 'react';
import { Users } from 'lucide-react';
import { getStatusColor } from '../utils/helpers';

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${getStatusColor(status)}`}>
    {status}
  </span>
);

const LeadsTable = React.memo(({ leads, onRowClick, selectedLeadId }) => {
  if (leads.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-semibold">No leads found</p>
        <p className="text-gray-400 text-sm">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
          <tr>
            {['Lead Name', 'Company', 'Source', 'Score', 'Status'].map((header) => (
              <th key={header} scope="col" className="px-6 py-4 font-medium">
                <div className="flex items-center gap-1.5 cursor-pointer">
                  {header}                 
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => onRowClick(lead)}
              tabIndex="0"
              className={`hover:bg-gray-50 cursor-pointer focus:outline-none focus:bg-blue-50 ${
                selectedLeadId === lead.id ? 'bg-blue-50' : ''
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {lead.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.company}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.source}</td>
              <td className="px-6 py-4 font-semibold text-gray-900">{lead.score}</td>
              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default LeadsTable;
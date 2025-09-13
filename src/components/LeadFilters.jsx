import React from 'react';
import { Search, ChevronDown } from 'lucide-react'; 
import { LEAD_STATUSES, SORT_OPTIONS } from '../utils/constants';

const LeadFilters = React.memo(({ filters, onFilterChange }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by name or company..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange('searchTerm', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 h-11 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="relative w-full md:w-auto">
          <select
            value={filters.statusFilter}
            onChange={(e) => onFilterChange('statusFilter', e.target.value)}
            className="w-full md:w-[180px] h-11 appearance-none bg-transparent border border-gray-200 rounded-lg pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {LEAD_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
        </div>

        <div className="relative w-full md:w-auto">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="w-full md:w-[180px] h-11 appearance-none bg-transparent border border-gray-200 rounded-lg pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
        </div>

      </div>
    </div>
  );
});

export default LeadFilters;
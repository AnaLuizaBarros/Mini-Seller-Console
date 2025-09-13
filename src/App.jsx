import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';

import { useLeads } from './hooks/useLeads';
import { usePagination } from './hooks/usePagination';
import useBreakpoint from './hooks/useBreakpoint';

import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import Modal from './components/common/Modal';
import LeadFilters from './components/LeadFilters';
import LeadsTable from './components/LeadsTable';
import Pagination from './components/Pagination';
import LeadDetailPanel from './components/LeadDetailPanel';
import OpportunitiesTable from './components/OpportunitiesTable';

import { ITEMS_PER_PAGE } from './utils/constants';

function App() {
  const { 
    leads, 
    opportunities,
    loading, 
    error, 
    isConverting, 
    setIsConverting,
    saveLead, 
    convertToOpportunity 
  } = useLeads();
  
  const [currentView, setCurrentView] = useState('leads');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: '',
    sortBy: 'score',
  });
  const isDesktop = useBreakpoint(1024);

  const filteredLeads = useMemo(() => {
    let leadsToProcess = [...leads];
    if (filters.searchTerm || filters.statusFilter) {
      leadsToProcess = leadsToProcess.filter(lead => {
        const searchTerm = filters.searchTerm.toLowerCase();
        const statusFilter = filters.statusFilter;
        const matchesSearch = !searchTerm ? true : 
          lead.name.toLowerCase().includes(searchTerm) || 
          lead.company.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter ? true : 
          lead.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
    }
    leadsToProcess.sort((a, b) => {
      if (filters.sortBy === 'score') return b.score - a.score;
      if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
      if (filters.sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });
    return leadsToProcess;
  }, [leads, filters]);

  const {
    currentPage,
    totalPages,
    handlePageChange,
    currentData: currentLeads,
    startIndex,
    endIndex,
  } = usePagination(filteredLeads, ITEMS_PER_PAGE);

  const handleFilterChange = (key, value) => {
    setIsFiltering(true);
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => setIsFiltering(false), 400);
      return () => clearTimeout(timer);
    }
  }, [filters, isFiltering]);

  const handleSelectLead = useCallback((lead) => {
    if (isConverting) return;
    setSelectedLead(prev => (prev?.id === lead.id ? null : lead));
  }, [isConverting]);
  
  const handleClosePanel = useCallback(() => setSelectedLead(null), []);

  const handleConvertToOpportunity = async (lead) => {
    try {
      await convertToOpportunity(lead);
      setSelectedLead(null);
    } catch (err) {
      console.error("Conversion failed:", err);
    } finally {
      setIsConverting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-gray-100 min-h-screen w-full p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-start gap-6">
        
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Engagement</h1>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setCurrentView('leads')}
                className={`w-full sm:w-auto px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                  currentView === 'leads' ? 'bg-white text-gray-800 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Leads ({leads.length})</span>
                </div>
              </button>
              <button
                onClick={() => setCurrentView('opportunities')}
                className={`w-full sm:w-auto px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                  currentView === 'opportunities' ? 'bg-white text-gray-800 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Opportunities ({opportunities.length})</span>
                </div>
              </button>
            </div>
          </div>
          
          {currentView === 'leads' ? (
            <>
              <LeadFilters filters={filters} onFilterChange={handleFilterChange} />
              {(isFiltering || isConverting) ? (
                <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">{isFiltering ? 'Filtering leads...' : 'Processing conversion...'}</p>
                  </div>
                </div>
              ) : (
                <>
                  <LeadsTable
                    leads={currentLeads}
                    onRowClick={handleSelectLead}
                    selectedLeadId={selectedLead?.id}
                  />
                  <Pagination
                    currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}
                    startIndex={startIndex} endIndex={endIndex} totalResults={filteredLeads.length}
                  />
                </>
              )}
            </>
          ) : (
            <OpportunitiesTable opportunities={opportunities} />
          )}
        </div>

        {currentView === 'leads' && selectedLead && (
          isDesktop ? (
            <div className="w-full lg:max-w-md lg:flex-shrink-0 lg:sticky lg:top-8">
               <div className="rounded-2xl shadow-lg overflow-hidden">
                <LeadDetailPanel
                  lead={selectedLead}
                  onClose={handleClosePanel}
                  onSave={saveLead}
                  onConvertToOpportunity={handleConvertToOpportunity}
                  isConverting={isConverting}
                />
               </div>
            </div>
          ) : (
            <Modal isOpen={!!selectedLead} onClose={handleClosePanel}>
              <LeadDetailPanel
                  lead={selectedLead}
                  onClose={handleClosePanel}
                  onSave={saveLead}
                  onConvertToOpportunity={handleConvertToOpportunity}
                  isConverting={isConverting}
                />
            </Modal>
          )
        )}
      </div>
    </div>
  );
}

export default App;
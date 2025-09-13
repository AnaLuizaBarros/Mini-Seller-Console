import { useState, useEffect, useCallback } from 'react';
import leadsDataFromFile from '../data/leads-data.json';
import { toast } from 'sonner';

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      try {
        setLeads(leadsDataFromFile.leads || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load initial data.');
        toast.error('Failed to load initial data.');
        setLoading(false);
      }
    }, 500);
  }, []);

  const saveLead = useCallback((updatedLead) => {
    try {
      setLeads(prevLeads =>
        prevLeads.map(lead =>
          lead.id === updatedLead.id ? updatedLead : lead
        )
      );
      toast.success('Lead details saved successfully!');
    } catch (err) {
      toast.error('Failed to save lead details.');
    }
  }, []);

  const convertToOpportunity = useCallback(async (leadToConvert) => {
    setIsConverting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newOpportunity = {
        id: (opportunities.length || 0) + 1,
        name: `${leadToConvert.company} - ${leadToConvert.name}`,
        stage: 'Prospecting',
        amount: null,
        accountName: leadToConvert.company,
        originalLeadId: leadToConvert.id,
      };
      
      setOpportunities(prev => [...prev, newOpportunity]);
      setLeads(prevLeads => prevLeads.filter(l => l.id !== leadToConvert.id));
      
      toast.success(`Lead "${leadToConvert.name}" converted to opportunity!`);

    } catch (err) {
      toast.error('Failed to convert lead.');
      throw err;
    }
  }, [opportunities]);

  return { leads, opportunities, loading, error, isConverting, setIsConverting, saveLead, convertToOpportunity };
};
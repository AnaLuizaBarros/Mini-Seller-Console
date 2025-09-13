import { useState, useEffect } from 'react';
import { 
  X, Check, AlertCircle, Mail, Building2, Bookmark, Signal, Pencil, TrendingUp, ChevronDown 
} from 'lucide-react';
import { getScoreColor, getStatusColor } from '../utils/helpers';
import { LEAD_STATUSES } from '../utils/constants';


const Avatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');
  return (
    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
      {initials}
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, children }) => (
  <div>
    <dt className="flex items-center text-sm font-medium text-gray-500">
      <Icon className="h-4 w-4 text-gray-400 mr-2" />
      <span>{label}</span>
    </dt>
    <dd className="mt-1 text-sm text-gray-900">{children}</dd>
  </div>
);

const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
    {status}
  </span>
);

const ScoreBar = ({ score }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className={`h-2 rounded-full ${getScoreColor(score).replace('text', 'bg')}`}
      style={{ width: `${score}%` }}
    ></div>
  </div>
);


const LeadDetailPanel = ({ lead, onClose, onSave, onConvertToOpportunity, isConverting }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (lead?.id !== editedLead?.id) {
        setEditedLead(lead);
        setIsEditing(false);
        setEmailError('');
    }
  }, [lead, editedLead?.id]);

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editedLead.email) {
      setEmailError('Email is required');
      return;
    }
    if (!emailRegex.test(editedLead.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    onSave(editedLead);
    setIsEditing(false);
  };

  if (!lead) return null;

  return (
    <div className="bg-white flex flex-col h-full max-h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-6rem)]">
      <header className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Avatar name={lead.name} />
          <div>
            <h2 className="text-lg font-bold text-gray-900">{lead.name}</h2>
            <p className="text-sm text-gray-500">{lead.company}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100" aria-label="Close lead details">
          <X className="h-5 w-5" />
        </button>
      </header>

      <div className="flex-grow p-6 overflow-y-auto">
        {isEditing ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={editedLead.email}
                onChange={(e) => {
                  setEditedLead({ ...editedLead, email: e.target.value });
                  if (emailError) setEmailError('');
                }}
                className={`w-full h-11 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${emailError ? 'border-red-400' : 'border-gray-200'}`}
              />
              {emailError && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{emailError}</p>}
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="relative">
                <select
                  id="status"
                  value={editedLead.status}
                  onChange={(e) => setEditedLead({ ...editedLead, status: e.target.value })}
                  className="w-full h-11 appearance-none bg-transparent border border-gray-200 rounded-lg pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LEAD_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-12 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>
          </div>
        ) : (
          <dl className="space-y-6">
            <DetailItem icon={Mail} label="Email">
              <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">{lead.email}</a>
            </DetailItem>
            <DetailItem icon={Building2} label="Company">
              {lead.company}
            </DetailItem>
            <DetailItem icon={Bookmark} label="Source">
              {lead.source}
            </DetailItem>
            <DetailItem icon={Signal} label="Lead Score">
              <div className="flex items-center gap-2 mt-1">
                <span className={`font-bold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                <ScoreBar score={lead.score} />
              </div>
            </DetailItem>
             <DetailItem icon={Check} label="Status">
               <StatusBadge status={lead.status} />
            </DetailItem>
          </dl>
        )}
      </div>

      <footer className="p-6 border-t border-gray-200 bg-gray-50">
        {isEditing ? (
          <div className="flex gap-3">
            <button 
              onClick={handleSave} 
              className="flex-1 h-11 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check className="h-4 w-4" />
              Save Changes
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="flex-1 h-11 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isConverting}
              className="flex-1 h-11 flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={() => onConvertToOpportunity(lead)}
              disabled={isConverting}
              className="flex-1 h-11 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConverting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4" />
                  <span>Convert</span>
                </>
              )}
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default LeadDetailPanel;
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, Loader2, AlertCircle, Inbox, RefreshCw } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Admin() {
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error | empty
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchLeads = useCallback(async () => {
    try {
      setStatus('loading');
      
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (filterStatus) params.status = filterStatus;
      
      const response = await axios.get('/api/leads', { params });
      const data = response.data.data;
      
      setLeads(data);
      setStatus(data.length === 0 ? 'empty' : 'success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }, [debouncedSearch, filterStatus]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      // Optimistic update
      setLeads(currentLeads => 
        currentLeads.map(lead => 
          lead._id === leadId ? { ...lead, status: newStatus } : lead
        )
      );

      await axios.patch(`/api/leads/${leadId}/status`, { status: newStatus });
    } catch (error) {
      console.error("Failed to update status", error);
      // Revert on failure
      fetchLeads();
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas-parchment">
      <Navbar />
      
      <main className="flex-1 max-w-[1024px] w-full mx-auto px-4 py-section">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[40px] font-semibold tracking-tight-hero text-ink">Leads</h1>
            <p className="text-[17px] text-body-muted">Manage your inbound inquiries.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted-48" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[240px] pl-9 pr-4 py-2 bg-canvas border border-hairline rounded-pill text-[14px] text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-canvas border border-hairline rounded-pill text-[14px] text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Closed">Closed</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted-48">
                <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <button 
              onClick={fetchLeads} 
              className="p-2 bg-canvas border border-hairline rounded-full hover:bg-surface-pearl transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-ink-muted-80" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {status === 'loading' && (
            <div className="h-[400px] flex flex-col items-center justify-center text-ink-muted-48 gap-4">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-[14px]">Loading leads...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="h-[400px] flex flex-col items-center justify-center text-red-800 gap-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
              <h3 className="text-[21px] font-semibold">Failed to load leads</h3>
              <p className="text-[14px]">Please check your connection and try again.</p>
              <button onClick={fetchLeads} className="btn-secondary-pill mt-4 text-[14px]">Retry</button>
            </div>
          )}

          {status === 'empty' && (
            <div className="h-[400px] flex flex-col items-center justify-center text-ink-muted-80 gap-4 bg-canvas border border-hairline rounded-lg">
              <Inbox className="w-12 h-12 text-divider-soft" />
              <h3 className="text-[21px] font-semibold text-ink">No leads found</h3>
              <p className="text-[14px]">There are no leads matching your current filters.</p>
              {(searchQuery || filterStatus) && (
                <button 
                  onClick={() => { setSearchQuery(''); setFilterStatus(''); }} 
                  className="btn-secondary-pill mt-4 text-[14px]"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col gap-4">
              {leads.map((lead) => (
                <div key={lead._id} className="bg-canvas border border-hairline rounded-lg p-[24px] flex flex-col md:flex-row md:items-start justify-between gap-6 hover:shadow-sm transition-shadow">
                  
                  {/* Lead Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[17px] font-semibold text-ink">{lead.name}</h3>
                      <span className="text-[14px] text-primary">{lead.email}</span>
                    </div>
                    
                    <p className="text-[14px] text-ink-muted-80 mb-4 whitespace-pre-wrap">
                      "{lead.message}"
                    </p>
                    
                    <div className="flex items-center gap-4 text-[12px] text-ink-muted-48 font-text">
                      <span className="flex items-center gap-1">
                        <span className="font-semibold text-ink-muted-80">Budget:</span> {lead.budget}
                      </span>
                      <span>•</span>
                      <span>{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex items-center justify-end">
                    <div className="relative">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`appearance-none pl-4 pr-10 py-[6px] border border-hairline rounded-pill text-[12px] font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary ${
                          lead.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          lead.status === 'Contacted' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                        <svg width="8" height="5" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}

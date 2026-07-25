import { useState } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.budget || !formData.message.trim()) {
      return "All fields are required.";
    }
    if (!formData.email.includes('@')) {
      return "Please enter a valid email address.";
    }
    if (formData.message.trim().length < 10) {
      return "Message must be at least 10 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await axios.post('/api/leads', formData);
      setStatus('success');
      setFormData({ name: '', email: '', budget: '', message: '' });
      
      // Reset success state after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      if (error.response && error.response.data && error.response.data.errors) {
        // Grab the first validation error from the server
        const firstError = Object.values(error.response.data.errors)[0];
        setErrorMessage(firstError);
      } else {
        setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
      }
    }
  };

  const inputClasses = "w-full bg-canvas border border-hairline rounded-sm px-[20px] py-[12px] text-ink text-[17px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <section id="contact" className="bg-canvas-parchment text-ink py-section px-4">
      <div className="max-w-[700px] mx-auto bg-canvas rounded-lg p-[32px] md:p-[48px] border border-hairline shadow-sm relative overflow-hidden">
        
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center text-center py-[64px] animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-16 h-16 text-primary mb-6" />
            <h3 className="text-[34px] font-semibold tracking-tight-display mb-4">Message Received</h3>
            <p className="text-[17px] text-ink-muted-80 max-w-[400px]">
              Thank you for reaching out. A member of our team will review your inquiry and be in touch shortly.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 btn-secondary-pill"
            >
              Send another message
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-[48px]">
              <h2 className="text-[40px] font-semibold tracking-tight-hero mb-4">Start the conversation.</h2>
              <p className="text-[17px] text-ink-muted-80">Tell us what you're looking for, and we'll be in touch.</p>
            </div>

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-sm flex items-start gap-3 text-red-800">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-[14px] font-text">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[14px] font-semibold tracking-tight-display text-ink-muted-80">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className={inputClasses}
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[14px] font-semibold tracking-tight-display text-ink-muted-80">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className={inputClasses}
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className="text-[14px] font-semibold tracking-tight-display text-ink-muted-80">Budget Range</label>
                <div className="relative">
                  <select 
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none bg-canvas`}
                    disabled={status === 'loading'}
                  >
                    <option value="" disabled>Select a range</option>
                    <option value="< $1k">Less than $1,000</option>
                    <option value="$1k - $5k">$1,000 - $5,000</option>
                    <option value="$5k - $10k">$5,000 - $10,000</option>
                    <option value="$10k+">$10,000+</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted-48">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[14px] font-semibold tracking-tight-display text-ink-muted-80">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  rows="4"
                  className={`${inputClasses} resize-none`}
                  disabled={status === 'loading'}
                ></textarea>
              </div>

              <div className="mt-4 flex justify-center">
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="btn-primary w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const emailTouched = email.length > 0;
  const emailValid = EMAIL_REGEX.test(email);
  const canSubmit = emailValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!emailValid) {
      setError('Please enter a valid email address.');
      return;
    }
    setSuccess(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="min-h-[80vh] flex items-center justify-center px-6 pb-20">
        <div className="text-center max-w-[500px]">
          <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#8b0000]/30 to-[#343535] border border-[#2A2A2A] flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[56px] text-[#8b0000]">construction</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-bold mb-3">Coming Soon</h1>
          <p className="text-[14px] text-[#e3beb8] leading-relaxed mb-8">
            We're working hard to bring you something amazing. This feature is currently under development and will be available soon.
          </p>
          <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-5 mb-8">
            <p className="text-[12px] text-[#e3beb8] mb-3">Want to know when it launches?</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <input type="email" placeholder="Enter your email" value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); setSuccess(false); }}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors" />
                {emailTouched && !emailValid && (
                  <p className="text-[11px] text-[#ff4444] text-left mt-1">Invalid email address</p>
                )}
              </div>
              <button type="submit" disabled={!canSubmit}
                className="bg-[#8b0000] hover:bg-[#A00000] disabled:bg-[#4a0000] disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-full text-[13px] transition-all active:scale-95 shadow-lg shadow-[#8b0000]/20 whitespace-nowrap">
                Notify Me
              </button>
            </form>
            {error && <p className="text-[11px] text-[#ff4444] mt-2">{error}</p>}
            {success && <p className="text-[11px] text-[#22c55e] mt-2">Thanks! We'll notify you when it launches.</p>}
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[12px] text-[#e3beb8]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8b0000] text-[16px]">check_circle</span>
              Advanced Search
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8b0000] text-[16px]">check_circle</span>
              Mobile App
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8b0000] text-[16px]">check_circle</span>
              Live Streaming
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

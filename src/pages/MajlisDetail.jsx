import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ReviewSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const nameErr = errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>;
  const emailErr = errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>;
  const reviewErr = errors.review && <p className="text-[11px] text-red-400 mt-1">{errors.review}</p>;

  const isEmailValid = email === '' || EMAIL_REGEX.test(email);
  const isValid = name.trim().length > 0 && EMAIL_REGEX.test(email) && review.trim().length >= 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!EMAIL_REGEX.test(email)) errs.email = 'Please enter a valid email address';
    if (review.trim().length < 10) errs.review = 'Review must be at least 10 characters';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
    setName(''); setEmail(''); setReview(''); setErrors({});
  };

  return (
    <div className="mt-12">
      <h3 className="text-[24px] font-bold mb-6">Leave a Review</h3>
      {submitted ? (
        <div className="bg-[#004e1f]/20 border border-[#29c961]/30 rounded-xl p-6 text-center">
          <span className="material-symbols-outlined text-[#29c961] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <p className="text-[14px] font-bold mt-2">Thank you for your review!</p>
          <p className="text-[12px] text-[#e3beb8] mt-1">Your feedback has been submitted successfully.</p>
          <button onClick={() => setSubmitted(false)} className="mt-4 text-[#8b0000] text-[13px] font-medium hover:underline">Submit another review</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 sm:p-8 space-y-5">
          <div>
            <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">Your Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors" />
            {nameErr}
          </div>
          <div>
            <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors" />
            {emailErr}
            {!isEmailValid && email !== '' && <p className="text-[11px] text-red-400 mt-1">Invalid email format</p>}
          </div>
          <div>
            <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">Your Review</label>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Share your experience (min 10 characters)" rows={4}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors resize-none" />
            {reviewErr}
            <p className="text-[11px] text-[#e3beb8]/60 mt-1">{review.length}/10 minimum characters</p>
          </div>
          <button type="submit" disabled={!isValid}
            className={`font-medium px-6 py-2.5 rounded-full text-[13px] transition-all active:scale-95 shadow-lg flex items-center gap-2 ${
              isValid ? 'bg-[#8b0000] hover:bg-[#A00000] text-white shadow-[#8b0000]/20 cursor-pointer'
                : 'bg-[#343535] text-[#e3beb8]/40 cursor-not-allowed'
            }`}>
            <span className="material-symbols-outlined text-[18px]">rate_review</span>
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
}

export default function MajlisDetail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="pt-20 pb-20 px-6 max-w-[1200px] mx-auto mt-3">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 mb-12 text-[#e3beb8] text-[13px] font-medium">
          <Link className="hover:text-[#8b0000] transition-colors" to="/">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link className="hover:text-[#8b0000] transition-colors" to="/browse-majalis">Majalis</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-[#e3e2e2]">Babul Ilm — 7 Muharram</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-start">
          {/* Left Column: Info */}
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="text-[32px] md:text-[48px] font-bold mb-3">Babul Ilm — 7 Muharram</h1>
              <div className="flex flex-wrap gap-3 mt-3">
                <span className="bg-[#292a2a] text-[#e3e2e2] px-3 py-1.5 rounded-lg text-[13px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_month</span> 14th July, 2024
                </span>
                <span className="bg-[#292a2a] text-[#e3e2e2] px-3 py-1.5 rounded-lg text-[13px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span> 9:00 PM (PST)
                </span>
                <span className="bg-[#29513f] text-[#a5d0b9] px-3 py-1.5 rounded-lg text-[13px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">person_pin</span> Gents / Ladies Separate
                </span>
              </div>
            </div>

            {/* Speaker Card */}
            <Link to="/speaker-profile" className="bg-[#1e2020] rounded-xl p-6 flex items-center gap-6 border border-[#2A2A2A] hover:border-[#8b0000] transition-colors cursor-pointer group">
              <img className="w-20 h-20 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCawxC_9-Aur0IxcRlAoE7LhsnLMhW7ztAVYN2fS_Xe_E_i3mSLvg9mH0vuQsKZD2eXmuTpk0g2HE4gAWA85IY6J9m47N6sPS2zTTCsOLoCqOzah7GY0s7C5hLpvMNCpnhfkBA_9wyANj1vYFt6ZeMkt8BehzZ9utf642L88NN2g5OpQObJzKgWXTmP4EL7e93MGhjluFwqOFpHIECWBlZij63f0uqiRw2P7JuVZ8oKIPbcn1FoW-PXul85Z5CNzTWlY0aO8lxuOosa" alt="Hujjatul Islam Syed Ali Rizvi" />
              <div className="flex-grow">
                <div className="flex items-center gap-3">
                  <h3 className="text-[24px] font-bold">Hujjatul Islam Syed Ali Rizvi</h3>
                  <span className="bg-[#004e1f] text-[#29c961] px-3 py-0.5 rounded-full text-[11px]">Zakir</span>
                </div>
                <span className="text-[#8b0000] text-[13px] font-medium flex items-center gap-1 mt-1 hover:underline">
                  View Full Profile <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>

            {/* Detail Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[#e3beb8] text-[13px] font-medium uppercase tracking-wider">Language</span>
                <div className="flex gap-1">
                  <span className="px-3 py-1 bg-[#1a1c1c] border border-[#2A2A2A] rounded-lg text-[13px]">Urdu</span>
                  <span className="px-3 py-1 bg-[#1a1c1c] border border-[#2A2A2A] rounded-lg text-[13px]">Arabic (Dua)</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[#e3beb8] text-[13px] font-medium uppercase tracking-wider">Share This Majlis</span>
                <div className="flex gap-3">
                  <button className="bg-[#25D366] text-white p-2 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                  <button 
                    className="bg-[#292a2a] text-[#e3e2e2] p-2 rounded-full flex items-center justify-center hover:bg-[#2A2A2A] transition-colors active:scale-95" 
                    onClick={handleCopy}
                  >
                    <span className={`material-symbols-outlined ${copied ? 'text-[#4ae176]' : ''}`}>
                      {copied ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-[#0d0e0f] border border-[#2A2A2A] p-6 rounded-xl">
              <h4 className="text-[13px] font-bold text-[#e3beb8] uppercase tracking-widest mb-3">Important Notes</h4>
              <p className="font-body text-base leading-relaxed text-[#e3e2e2]/90">
                The Majlis will conclude with Matam-e-Zanjeer. Parking is available at the rear entrance. Please maintain silence and decorum. Special arrangements for elderly guests and children's water distribution have been made by the local committee.
              </p>
            </div>

            {/* Related Majalis */}
            <div className="mt-12">
              <h3 className="text-[24px] font-bold mb-6">Related Majalis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                
                {/* Related Item 1 */}
                <Link to="/browse-majalis" className="flex gap-3 p-3 bg-[#1e2020] rounded-xl border border-[#2A2A2A] hover:border-[#8b0000] transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-[#343535] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#8b0000]">mosque</span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#e3e2e2]">Imambargah Yasrab</h4>
                    <p className="text-[11px] text-[#e3beb8]">8 Muharram • 8:00 PM</p>
                  </div>
                </Link>

                {/* Related Item 2 */}
                <Link to="/browse-jaloos" className="flex gap-3 p-3 bg-[#1e2020] rounded-xl border border-[#2A2A2A] hover:border-[#8b0000] transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-[#343535] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#8b0000]">groups</span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#e3e2e2]">Markazi Jaloos</h4>
                    <p className="text-[11px] text-[#e3beb8]">9 Muharram • 10:00 AM</p>
                  </div>
                </Link>
                
              </div>
            </div>

            {/* Reviews Section */}
            <ReviewSection />
          </section>

          {/* Right Column: Map */}
          <aside className="sticky top-[100px] flex flex-col gap-6">
            <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden border border-[#2A2A2A] group">
              <img className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD21K0quCP_lLiNCHBCEoi5ZuMGGca4qDfp3OJKdZPDsCpb_-pxcgHLaGX128gixtBW0oBT8kDV8OOl7jVuDV7t2IuMtvTZ_cuF7m_EtRqlNgyObfpxiiNmlFK59DSC394RbFdb8lDEGe6wd5oF-wR90lhsPSbCMhVCKaG4lAnmJA9XooJEwXcpzaGJZmQ1WTZSOERmvDsI3Rry0YUOgzMEyh59m9UWo3ivLtUzlwFy1iUaFFv_x4jzbLX-9XtNImAD_gxQG3MUvby" alt="Map representation" />
              {/* Overlay Info */}
              <div className="absolute top-3 right-3">
                <span className="bg-[#8b0000] text-white px-3 py-1.5 rounded-full text-[11px] shadow-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>my_location</span> 2.3 km from you
                </span>
              </div>
              {/* Bottom Gradient Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white">
                  <p className="text-[13px] font-bold">Plot 14-C, Babul Ilm Road, Block 5</p>
                  <p className="text-[11px] opacity-80">North Nazimabad, Karachi</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#8b0000] text-white py-6 rounded-full text-[24px] font-bold flex items-center justify-center gap-6 hover:brightness-110 active:scale-95 transition-all shadow-lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>directions</span>
              Get Directions
            </button>
            
            <div className="flex items-center justify-between p-3 border border-[#2A2A2A] rounded-xl bg-[#1a1c1c]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#e3beb8]">info</span>
                <span className="text-[13px] text-[#e3beb8]">Updated 12 mins ago</span>
              </div>
              <button className="text-[#8b0000] text-[13px] font-medium hover:underline">Report Error</button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

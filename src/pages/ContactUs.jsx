import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-[800px] mx-auto">
        <div className="text-center mb-10">
          <span className="material-symbols-outlined text-[#8b0000] text-[50px]" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
          <h1 className="text-[28px] font-bold mt-3 mb-2">Contact Us</h1>
          <p className="text-[13px] text-[#e3beb8] max-w-md mx-auto">Have a question, suggestion, or want to list your imambargah? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: 'mail', label: 'Email', value: 'hello@majalis.pk' },
            { icon: 'call', label: 'Phone', value: '+92 300 1234567' },
            { icon: 'location_on', label: 'Location', value: 'Islamabad, Pakistan' },
          ].map((item) => (
            <div key={item.label} className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-4 text-center hover:border-[#8b0000]/30 transition-colors">
              <span className="material-symbols-outlined text-[#8b0000] text-[28px] block mb-2">{item.icon}</span>
              <p className="text-[13px] font-bold">{item.label}</p>
              <p className="text-[12px] text-[#e3beb8] mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-10 text-center">
            <span className="material-symbols-outlined text-[#6fcf97] text-[50px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <h2 className="text-[20px] font-bold mt-4 mb-2">Thank You!</h2>
            <p className="text-[13px] text-[#e3beb8] mb-6">Your message has been received. We'll get back to you within 24 hours.</p>
            <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
              className="bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-6 py-2 rounded-full text-[13px] transition-all active:scale-95">
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors"
                  placeholder="your@email.com" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">Subject</label>
              <select name="subject" value={form.subject} onChange={handleChange} required
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] focus:outline-none focus:border-[#8b0000] transition-colors appearance-none">
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="List My Imambargah">List My Imambargah</option>
                <option value="Report an Issue">Report an Issue</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors resize-none"
                placeholder="Write your message..." />
            </div>
            <button type="submit"
              className="w-full bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-6 py-3 rounded-full text-[13px] transition-all active:scale-[0.98] shadow-lg shadow-[#8b0000]/20">
              Send Message
            </button>
          </form>
        )}

        <div className="mt-10 bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6">
          <h2 className="text-[16px] font-bold mb-2">Want to List Your Imambargah?</h2>
          <p className="text-[13px] text-[#e3beb8] mb-4">Create a free listing and reach thousands of community members searching for majalis near them.</p>
          <Link to="/imambargah-portal"
            className="inline-block bg-[#1B4332] hover:bg-[#24523e] text-white font-medium px-6 py-2.5 rounded-full text-[13px] transition-all active:scale-95">
            Get Started
          </Link>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

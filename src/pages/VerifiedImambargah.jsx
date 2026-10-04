import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

export default function VerifiedImambargah() {
  const [selectedDay, setSelectedDay] = useState('All');

  const amenities = ['SND (Water)', 'Washrooms', 'Carpeted Hall', 'Separate Ladies Section', 'Parking', 'Sound System', 'Generator Backup'];
  const gallery = [
    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1545167626-3a4d4e0c0b8b?w=600&h=400&fit=crop',
  ];

  const schedule = [
    { day: '7', time: '8:00 PM', speaker: 'Molana Nusrat Abbas', topic: 'Shahadat-e-Imam Hassan (AS)' },
    { day: '8', time: '7:30 PM', speaker: 'Zakir Ali Raza', topic: 'Qiyam-e-Imam Hussain (AS)' },
    { day: '9', time: '9:00 PM', speaker: 'Molana Kumail Mehdavi', topic: 'Shab-e-Ashur' },
    { day: '10', time: '5:00 AM', speaker: 'Molana Nusrat Abbas', topic: 'Youm-e-Ashur' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-[1000px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#e3beb8] hover:text-[#e3e2e2] mb-6 transition-colors text-[13px]">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] overflow-hidden mb-6">
          <div className="h-[200px] sm:h-[280px] bg-gradient-to-br from-[#8b0000]/30 to-[#1a1c1c] flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-[60px] text-[#8b0000]" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
              <p className="text-[13px] text-[#e3beb8] mt-2">Imambargah Photo</p>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <h1 className="text-[22px] font-bold">Imambargah Colonel Maqbool</h1>
                <span className="bg-[#1B4332] text-[#6fcf97] text-[10px] px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[12px]">verified</span>
                  Verified
                </span>
              </div>
              <div className="flex gap-2">
                <button className="bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-5 py-2 rounded-full text-[13px] transition-all active:scale-95 whitespace-nowrap">
                  Contact Imambargah
                </button>
                <button className="border border-[#2A2A2A] hover:border-[#8b0000] text-[#e3beb8] p-2 rounded-lg transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>
            </div>
            <p className="text-[13px] text-[#e3beb8] flex items-center gap-1 mb-4">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              Street 45, Sector F-10/3, Islamabad
            </p>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {amenities.map((a) => (
                <span key={a} className="bg-[#292a2a] text-[#e3e2e2] text-[11px] px-3 py-1 rounded-lg border border-[#2A2A2A]">
                  {a}
                </span>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-10 pt-3 border-t border-[#2A2A2A]">
              <div>
                <p className="text-[18px] font-bold text-[#e3e2e2]">24</p>
                <p className="text-[11px] text-[#e3beb8]">Majalis This Year</p>
              </div>
              <div>
                <p className="text-[18px] font-bold text-[#e3e2e2]">500+</p>
                <p className="text-[11px] text-[#e3beb8]">Capacity</p>
              </div>
              <div>
                <p className="text-[18px] font-bold text-[#e3e2e2]">4.8</p>
                <p className="text-[11px] text-[#e3beb8]">Community Rating</p>
              </div>
              <div>
                <p className="text-[18px] font-bold text-[#e3e2e2]">Since 1998</p>
                <p className="text-[11px] text-[#e3beb8]">Established</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-6">
          <h2 className="text-[16px] font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {gallery.map((src, idx) => (
              <div key={idx} className="aspect-[3/2] bg-[#1e2020] rounded-xl border border-[#2A2A2A] overflow-hidden">
                <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <h2 className="text-[16px] font-bold">Muharram Schedule</h2>
            <div className="flex flex-wrap gap-1">
              {['All', '7', '8', '9', '10'].map((day) => (
                <button
                  key={day}
                  className={`text-[12px] font-medium px-3 py-1 rounded-lg active:scale-95 transition-transform ${
                    selectedDay === day
                      ? 'bg-[#8b0000] text-white'
                      : 'bg-[#292a2a] text-[#e3beb8] hover:bg-[#343535] transition-colors'
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {schedule.map((s, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#242626] rounded-xl border border-[#2A2A2A] gap-2">
                <div className="flex items-start gap-3">
                  <div className="bg-[#8b0000]/20 text-[#8b0000] text-[12px] font-bold w-[40px] h-[40px] rounded-lg flex items-center justify-center shrink-0">
                    {s.day}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold">{s.topic}</p>
                    <p className="text-[12px] text-[#e3beb8]">{s.speaker}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#e3beb8]">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 mb-6">
          <h2 className="text-[16px] font-bold mb-4">Location</h2>
          <div className="h-[200px] bg-[#121414] rounded-xl flex items-center justify-center border border-[#2A2A2A]">
            <div className="text-center">
              <span className="material-symbols-outlined text-[40px] text-[#8b0000]">map</span>
              <p className="text-[13px] text-[#e3beb8] mt-1">Interactive Map</p>
              <p className="text-[11px] text-[#e3beb8]">Street 45, Sector F-10/3, Islamabad</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#1e2020] to-[#0d0e0f] border border-[#2A2A2A] rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-[#8b0000] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>store</span>
          <h3 className="text-[20px] font-bold mt-3 mb-2">List Your Imambargah</h3>
          <p className="text-[13px] text-[#e3beb8] max-w-md mx-auto mb-6">Reach thousands of community members looking for majalis and events near them.</p>
          <Link to="/imambargah-portal" className="inline-block bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-8 py-3 rounded-full text-[13px] transition-all active:scale-95 shadow-lg shadow-[#8b0000]/20">
            Get Started
          </Link>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

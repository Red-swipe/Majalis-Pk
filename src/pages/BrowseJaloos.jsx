import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

export default function BrowseJaloos() {
  const computeMuharramDay = () => {
    try {
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-civil', { day: 'numeric', month: 'numeric' });
      const parts = formatter.formatToParts(new Date());
      const month = parts.find(p => p.type === 'month')?.value;
      const day = parts.find(p => p.type === 'day')?.value;
      if (month === '1') return day || '1';
      return '1';
    } catch {
      return '1';
    }
  };
  const [selectedDay, setSelectedDay] = useState(computeMuharramDay); // TODO: fallback to '1' if hijri conversion unavailable
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [participation, setParticipation] = useState({ men: false, women: false, mixed: false });
  const [jaloosData, setJaloosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const days = ['All', ...Array.from({ length: 30 }, (_, i) => String(i + 1))];

  useEffect(() => {
    async function fetchJaloos() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('jaloos')
        .select('*, start_imambargah:imambargahs!start_imambargah_id(name), end_imambargah:imambargahs!end_imambargah_id(name), speakers(name), cities(name)')
        .order('date', { ascending: true });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      const mapped = (data || []).map((item) => ({
        id: item.id,
        title: item.title || '',
        date: item.date || '',
        time: item.time || '',
        startPoint: item.start_imambargah?.name || '',
        endPoint: item.end_imambargah?.name || '',
        distance: item.distance || '',
        speaker: item.speakers?.name || '',
        city: item.cities?.name || '',
        isFeatured: item.isFeatured || false,
        route: item.route || [],
      }));
      setJaloosData(mapped);
      setLoading(false);
    }
    fetchJaloos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar Filters */}
          <aside className="w-full md:w-[280px] shrink-0 space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1e2020] p-3 rounded-xl border border-[#2A2A2A]">

                {/* Muharram Day */}
                <div className="mb-6">
                  <label className="block text-[13px] font-bold text-[#e3e2e2] mb-3">Muharram Day</label>
                  <div className="flex flex-wrap gap-1">
                    {days.map((day) => {
                      const isActive = selectedDay === day;
                      return (
                        <button
                          key={day}
                          className={`text-[13px] font-medium px-3 py-1.5 rounded-lg active:scale-95 transition-transform ${
                            isActive
                              ? 'bg-[#8b0000] text-white'
                              : 'bg-[#292a2a] text-[#e3beb8] hover:bg-[#343535] transition-colors'
                          }`}
                          onClick={() => setSelectedDay(day)}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Participation */}
                <div className="mb-6">
                  <label className="block text-[13px] font-bold text-[#e3e2e2] mb-3">Participation</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="rounded border-[#2A2A2A] bg-[#1a1c1c] text-[#8b0000] focus:ring-0"
                        checked={participation.men}
                        onChange={(e) => setParticipation({ ...participation, men: e.target.checked })}
                      />
                      <span className="text-sm text-[#e3beb8] group-hover:text-[#e3e2e2]">Men Only</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="rounded border-[#2A2A2A] bg-[#1a1c1c] text-[#8b0000] focus:ring-0"
                        checked={participation.women}
                        onChange={(e) => setParticipation({ ...participation, women: e.target.checked })}
                      />
                      <span className="text-sm text-[#e3beb8] group-hover:text-[#e3e2e2]">Women Only</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="rounded border-[#2A2A2A] bg-[#1a1c1c] text-[#8b0000] focus:ring-0"
                        checked={participation.mixed}
                        onChange={(e) => setParticipation({ ...participation, mixed: e.target.checked })}
                      />
                      <span className="text-sm text-[#e3beb8] group-hover:text-[#e3e2e2]">Mixed</span>
                    </label>
                  </div>
                </div>

                {/* City Selection */}
                <div className="mb-6">
                  <label className="block text-[13px] font-bold text-[#e3e2e2] mb-3">City</label>
                  <select
                    className="w-full bg-[#1a1c1c] border border-[#2A2A2A] rounded-lg py-2 px-3 text-sm focus:border-[#8b0000] focus:ring-0 text-[#e3e2e2]"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option>All Cities</option>
                    <option>Islamabad</option>
                    <option>Rawalpindi</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                  </select>
                </div>

                <button className="w-full bg-[#8b0000] hover:bg-[#A00000] text-white font-medium py-3 rounded-full transition-all active:scale-95 shadow-lg shadow-[#8b0000]/20">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <div>
                <h1 className="text-[24px] font-bold text-[#e3e2e2]">Jaloos Routes</h1>
                <p className="text-[11px] text-[#e3beb8]">Showing {jaloosData.length} scheduled processions this week</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-[13px] text-[#e3beb8] whitespace-nowrap">Sort by:</span>
                <select className="bg-[#1e2020] border border-[#2A2A2A] rounded-lg py-1.5 px-3 text-sm focus:border-[#8b0000] focus:ring-0 text-[#e3e2e2] outline-none">
                  <option>Date (Upcoming)</option>
                  <option>Distance</option>
                  <option>City</option>
                  <option>Popularity</option>
                </select>
              </div>
            </div>

            {/* Featured Banner */}
            {(() => {
              const featured = jaloosData.find((j) => j.isFeatured);
              if (!featured) return null;
              return (
                <div className="bg-gradient-to-r from-[#8b0000]/20 to-[#1e2020] border border-[#8b0000]/40 rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-[#ffb4a8]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                      <span className="text-[11px] font-bold text-[#ffb4a8] uppercase tracking-wider">Featured</span>
                    </div>
                    <h2 className="text-[20px] font-bold">{featured.title}</h2>
                    <p className="text-[13px] text-[#e3beb8]">{featured.date} • {featured.time} • {featured.city}</p>
                  </div>
                  <Link to="/majlis-detail" className="bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-6 py-2.5 rounded-full text-[13px] transition-all active:scale-95 whitespace-nowrap">
                    View Route Details
                  </Link>
                </div>
              );
            })()}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-[#8b0000] text-[40px] animate-spin" style={{ fontVariationSettings: "'FILL' 1" }}>progress_activity</span>
                <p className="text-[#e3beb8] mt-4">Loading processions...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-[#1e2020] border border-red-500/40 rounded-xl p-6 text-center">
                <span className="material-symbols-outlined text-red-400 text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                <p className="text-red-400 mt-2">Failed to load processions: {error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && jaloosData.length === 0 && (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-[#e3beb8] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>route</span>
                <p className="text-[#e3beb8] mt-4">No processions found.</p>
              </div>
            )}

            {/* Jaloos Cards */}
            {!loading && !error && (
            <div className="space-y-4">
              {jaloosData.map((jaloo) => (
                <div
                  key={jaloo.id}
                  className={`bg-[#1e2020] rounded-xl overflow-hidden border transition-all hover:border-[#8b0000]/50 group ${
                    jaloo.isFeatured ? 'border-[#8b0000]/40' : 'border-[#2A2A2A]'
                  }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-[16px] font-bold group-hover:text-[#8b0000] transition-colors">{jaloo.title}</h3>
                        <p className="text-[11px] text-[#e3beb8]">Led by {jaloo.speaker} • {jaloo.city}</p>
                      </div>
                      <span className="material-symbols-outlined text-[#e3beb8] text-[20px] cursor-pointer hover:text-[#8b0000]">bookmark</span>
                    </div>

                    {/* Date/Time/Distance Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-[#292a2a] text-[#e3e2e2] text-[11px] px-2 py-0.5 rounded-lg border border-[#2A2A2A] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                        {jaloo.date}
                      </span>
                      <span className="bg-[#292a2a] text-[#e3e2e2] text-[11px] px-2 py-0.5 rounded-lg border border-[#2A2A2A] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {jaloo.time}
                      </span>
                      <span className="bg-[#292a2a] text-[#e3e2e2] text-[11px] px-2 py-0.5 rounded-lg border border-[#2A2A2A] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">near_me</span>
                        {jaloo.distance}
                      </span>
                      {jaloo.isFeatured && (
                        <span className="bg-[#8b0000]/20 text-[#ffb4a8] text-[11px] px-2 py-0.5 rounded-lg border border-[#8b0000]/30 font-medium">Featured</span>
                      )}
                    </div>

                    {/* Route Timeline */}
                    <div className="relative flex flex-col gap-3 mt-4 mb-4">
                      <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-[#2A2A2A]"></div>
                      {jaloo.route.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-4 relative">
                          <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center border-4 border-[#1e2020] z-10 ${
                            idx === 0 ? 'bg-[#8b0000]' : 'bg-[#343535]'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-white' : 'bg-[#e3beb8]'}`}></div>
                          </div>
                          <div className="pt-1">
                            <p className={`text-[13px] ${idx === 0 ? 'font-bold' : ''}`}>{point}</p>
                            <p className="text-[11px] text-[#e3beb8]">
                              {idx === 0 ? 'Starting Point' : idx === jaloo.route.length - 1 ? 'Final Destination' : 'Waypoint'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-2">
                      <Link to="/majlis-detail" className="flex-1 sm:flex-none text-center bg-[#292a2a] hover:bg-[#343535] text-white font-medium px-5 py-2.5 rounded-lg text-[13px] transition-all active:scale-95">
                        Track Procession
                      </Link>
                      <button className="flex-1 sm:flex-none border border-[#2A2A2A] hover:border-[#8b0000] text-[#e3beb8] font-medium px-5 py-2.5 rounded-lg text-[13px] transition-all active:scale-95">
                        View Route Map
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-lg border border-[#2A2A2A] flex items-center justify-center text-[#e3beb8] hover:border-[#8b0000] hover:text-[#8b0000] transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-lg bg-[#8b0000] text-white flex items-center justify-center text-[13px] font-bold">1</button>
                <button className="w-10 h-10 rounded-lg border border-[#2A2A2A] text-[#e3beb8] flex items-center justify-center text-[13px] hover:border-[#8b0000] transition-all active:scale-95">2</button>
                <button className="w-10 h-10 rounded-lg border border-[#2A2A2A] text-[#e3beb8] flex items-center justify-center text-[13px] hover:border-[#8b0000] transition-all active:scale-95">3</button>
                <span className="text-[#e3beb8] text-[13px]">...</span>
                <button className="w-10 h-10 rounded-lg border border-[#2A2A2A] text-[#e3beb8] flex items-center justify-center text-[13px] hover:border-[#8b0000] transition-all active:scale-95">12</button>
                <button className="w-10 h-10 rounded-lg border border-[#2A2A2A] flex items-center justify-center text-[#e3beb8] hover:border-[#8b0000] hover:text-[#8b0000] transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Contribute CTA */}
            <div className="mt-12 bg-gradient-to-br from-[#1e2020] to-[#0d0e0f] border border-[#2A2A2A] rounded-xl p-8 text-center">
              <span className="material-symbols-outlined text-[#8b0000] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
              <h3 className="text-[20px] font-bold mt-3 mb-2">Know a Jaloos we missed?</h3>
              <p className="text-[13px] text-[#e3beb8] max-w-md mx-auto mb-6">Help us keep the community informed. Submit procession details and we'll verify and publish them.</p>
              <button className="bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-8 py-3 rounded-full text-[13px] transition-all active:scale-95 shadow-lg shadow-[#8b0000]/20">
                Contribute Jaloos Details
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

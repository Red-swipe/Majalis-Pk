import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

export default function Home() {
  const [showLocationOverlay, setShowLocationOverlay] = useState(true);
  const [activeDay, setActiveDay] = useState(1); // TODO: compute from hijri date conversion

  const [majalisCount, setMajalisCount] = useState(0);
  const [jaloosCount, setJaloosCount] = useState(0);
  const [zakireenCount, setZakireenCount] = useState(0);
  const [todayMajalis, setTodayMajalis] = useState([]);
  const [upcomingJaloos, setUpcomingJaloos] = useState([]);
  const [featuredZakireen, setFeaturedZakireen] = useState([]);
  const [homeLoading, setHomeLoading] = useState(true);
  const [homeError, setHomeError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchHomeData() {
      try {
        const [majalisRes, jaloosRes, zakireenRes] = await Promise.all([
          supabase.from('majalis').select('*', { count: 'exact', head: true }),
          supabase.from('jaloos').select('*', { count: 'exact', head: true }),
          supabase.from('speakers').select('*', { count: 'exact', head: true }),
        ]);
        if (cancelled) return;
        if (majalisRes.error) throw majalisRes.error;
        if (jaloosRes.error) throw jaloosRes.error;
        if (zakireenRes.error) throw zakireenRes.error;
        setMajalisCount(majalisRes.count || 0);
        setJaloosCount(jaloosRes.count || 0);
        setZakireenCount(zakireenRes.count || 0);

        const { data: majalisData, error: majalisErr } = await supabase
          .from('majalis')
          .select('*, imambargahs(name, address), speakers(name, type)');
        if (cancelled) return;
        if (majalisErr) throw majalisErr;
        const todayStr = new Date().toISOString().split('T')[0];
        const today = (majalisData || []).filter((m) => m.date === todayStr);
        setTodayMajalis(today.slice(0, 3));

        const { data: jaloosData, error: jaloosErr } = await supabase
          .from('jaloos')
          .select('*, start_imambargah:imambargahs!start_imambargah_id(name), end_imambargah:imambargahs!end_imambargah_id(name), speakers(name), cities(name)');
        if (cancelled) return;
        if (jaloosErr) throw jaloosErr;
        setUpcomingJaloos((jaloosData || []).slice(0, 2));

        const { data: zakireenData, error: zakireenErr } = await supabase
          .from('speakers')
          .select('*')
          .eq('featured', true);
        if (cancelled) return;
        if (!zakireenErr) setFeaturedZakireen(zakireenData || []);
      } catch (err) {
        if (!cancelled) setHomeError(err.message);
      } finally {
        if (!cancelled) setHomeLoading(false);
      }
    }
    fetchHomeData();
    return () => { cancelled = true; };
  }, []);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden">
      {/* LOCATION PERMISSION OVERLAY */}
      {showLocationOverlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 transition-opacity duration-500" id="location-overlay">
          <div className="w-full max-w-[400px] bg-[#1a1c1c] p-12 rounded-xl shadow-2xl text-center border border-[#5a403c] mx-6">
            <div className="mb-6">
              <span className="material-symbols-outlined text-[48px] text-[#ffb4a8]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
            </div>
            <h2 className="font-h3 text-[24px] mb-3">Allow Location Access</h2>
            <p className="font-body text-base text-[#e3beb8] mb-6">Get accurate majalis timings and distances near you in Islamabad.</p>
            <div className="flex flex-col gap-2">
              <button 
                className="bg-[#8b0000] text-white py-2 px-6 rounded-full font-medium text-[13px] active:scale-95 transition-transform" 
                onClick={() => setShowLocationOverlay(false)}
              >
                Allow Access
              </button>
              <button 
                className="text-[#e3beb8] hover:text-[#ffb4a8] font-medium text-[13px] transition-colors" 
                onClick={() => setShowLocationOverlay(false)}
              >
                Browse without location →
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />

      <main className="pt-20 pb-20">
        {/* HERO SECTION */}
        <section className="relative w-full h-[500px] flex items-center overflow-hidden">
          <div className="relative z-10 px-6 max-w-[1200px] mx-auto w-full">
            <div className="inline-flex items-center gap-1 bg-[#292a2a] px-3 py-1 rounded-full text-[#a5d0b9] mb-6 border border-[#5a403c]">
              <span className="material-symbols-outlined text-[16px]">dark_mode</span>
              <span className="text-[13px] font-medium">Muharram 1448</span>
            </div>
            <h1 className="font-bold text-[32px] md:text-[48px] mb-6 max-w-2xl text-[#e3e2e2]">Majalis in <span className="text-[#8b0000]">Islamabad</span></h1>
            {homeLoading ? (
              <div className="text-[#e3beb8] text-[13px]">Loading stats...</div>
            ) : homeError ? null : (
              <div className="flex flex-wrap gap-6 text-[#e3beb8] text-[13px] font-medium">
                <div className="flex items-center gap-1">
                  <span className="text-[#8b0000] font-bold">{todayMajalis.length}</span>
                  <span>Majalis Today</span>
                </div>
                <div className="w-1 h-1 bg-[#2A2A2A] rounded-full self-center"></div>
                <div className="flex items-center gap-1">
                  <span className="text-[#8b0000] font-bold">{jaloosCount}</span>
                  <span>Total Jaloos</span>
                </div>
                <div className="w-1 h-1 bg-[#2A2A2A] rounded-full self-center"></div>
                <div className="flex items-center gap-1">
                  <span className="text-[#8b0000] font-bold">{zakireenCount}</span>
                  <span>Speakers</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CALENDAR SECTION */}
        <section className="px-6 max-w-[1200px] mx-auto -mt-6 relative z-20">
          <div className="bg-[#1e2020] p-3 rounded-xl border border-[#2A2A2A] shadow-lg flex gap-3 overflow-x-auto hide-scrollbar snap-x">
            {days.map((day) => {
              const isToday = day === activeDay;
              const isAshura = day === 10;
              const activeClasses = isToday 
                ? 'bg-[#8b0000] text-white border-[#8b0000]' 
                : 'bg-[#1a1c1c] text-[#e3beb8] border-[#2A2A2A]';
              const ashuraStyles = isAshura ? 'ashura-glow ring-1 ring-[#8b0000]' : '';

              return (
                <div key={day} className="flex-shrink-0 snap-center">
                  <div 
                    className={`w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center rounded-lg border cursor-pointer hover:border-[#8b0000] transition-all ${activeClasses} ${ashuraStyles}`}
                    onClick={() => setActiveDay(day)}
                  >
                    <span className="text-[11px] uppercase opacity-70">Day</span>
                    <span className="text-[24px] font-bold">{day}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TODAY'S MAJALIS SECTION */}
        <section className="px-6 py-20 max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[24px] md:text-[32px] font-bold">Today's Majalis</h2>
              <p className="text-base text-[#e3beb8]">Scheduled events for day {activeDay} of Muharram</p>
            </div>
            <Link to="/browse-majalis" className="text-[#8b0000] text-[13px] font-medium flex items-center gap-1 hover:underline">
              View All <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>

          {homeLoading ? (
            <div className="text-center text-[#e3beb8] py-8">Loading majalis...</div>
          ) : homeError ? (
            <div className="text-center text-red-400 py-8">Failed to load majalis.</div>
          ) : todayMajalis.length === 0 ? (
            <div className="text-center text-[#e3beb8] py-8">No majalis found for today.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayMajalis.map((m) => {
              const genderClass = m.gender === 'ladies' ? 'bg-[#8b0000]/20 text-[#ffb4a8]' : m.gender === 'male' ? 'bg-[#29513f] text-[#a5d0b9]' : 'bg-[#004e1f] text-[#4ae176]';
              const genderLabel = m.gender === 'ladies' ? 'Ladies Only' : m.gender === 'male' ? 'Male Only' : 'All Genders';
              return (
                <div key={m.id} className="group bg-[#1a1c1c] p-6 rounded-xl border border-[#2A2A2A] hover:border-[#8b0000] transition-all hover:shadow-[0_0_20px_rgba(139,0,0,0.15)] cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`${genderClass} text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider`}>{genderLabel}</span>
                    <div className="flex items-center text-[#e3beb8] gap-1 text-[13px] font-medium">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{m.time || ''}</span>
                    </div>
                  </div>
                  <h3 className="text-[24px] font-bold mb-1 group-hover:text-[#8b0000] transition-colors">{m.venue_name || m.title || ''}</h3>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#343535]">
                      <img className="w-full h-full object-cover" src={m.speaker_image || ''} alt={m.speakers?.name || m.speaker_name || ''} />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold">{m.speakers?.name || m.speaker_name || ''}</p>
                      <p className="text-[11px] text-[#e3beb8]">{m.speakers?.type || m.speaker_title || ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#e3beb8] text-[11px]">
                    <span className="material-symbols-outlined text-[14px]">near_me</span>
                    <span>{m.location || m.area_name || ''}</span>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </section>

        {/* UPCOMING JALOOS SECTION */}
        <section className="bg-[#0d0e0f] py-20 overflow-hidden">
          <div className="px-6 max-w-[1200px] mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-[24px] md:text-[32px] font-bold">Upcoming Jaloos</h2>
                <p className="text-base text-[#e3beb8]">Live processions and routes</p>
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#e3beb8] hover:text-[#8b0000] hover:border-[#8b0000] transition-all">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#e3beb8] hover:text-[#8b0000] hover:border-[#8b0000] transition-all">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>

            {upcomingJaloos.length === 0 ? (
              <p className="text-[#e3beb8] text-[13px]">No upcoming processions.</p>
            ) : (
              <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2 snap-x">
                {upcomingJaloos.map((j) => {
                  const isLive = j.date === new Date().toISOString().split('T')[0];
                  return (
                    <div key={j.id} className="flex-shrink-0 w-[320px] md:w-[450px] bg-[#1e2020] p-6 rounded-xl border border-[#2A2A2A] snap-start">
                      <div className="flex justify-between items-center mb-6">
                        <div className={`flex items-center gap-1 ${isLive ? 'text-[#8b0000]' : 'text-[#e3beb8]'}`}>
                          <span className={`material-symbols-outlined ${isLive ? 'animate-pulse' : ''}`} style={isLive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                            {isLive ? 'sensors' : 'history'}
                          </span>
                          <span className="text-[13px] font-bold uppercase">{isLive ? 'Live Route' : 'Scheduled'}</span>
                        </div>
                        <span className="text-[11px] text-[#e3beb8]">{j.time || ''}</span>
                      </div>

                      <div className="flex flex-col gap-3 relative mb-6">
                        <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-[#2A2A2A]"></div>
                        <div className="flex items-start gap-6 relative">
                          <div className="w-[24px] h-[24px] rounded-full bg-[#8b0000] flex items-center justify-center border-4 border-[#1e2020] z-10">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div>
                            <p className="text-[13px] font-bold">{j.start_imambargah?.name || 'Starting Point'}</p>
                            <p className="text-[11px] text-[#e3beb8]">Procession Starting Point</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-6 relative mt-6">
                          <div className="w-[24px] h-[24px] rounded-full bg-[#2A2A2A] flex items-center justify-center border-4 border-[#1e2020] z-10">
                            <div className="w-2 h-2 bg-[#e3beb8] rounded-full"></div>
                          </div>
                          <div>
                            <p className="text-[13px]">{j.end_imambargah?.name || 'Destination'}</p>
                            <p className="text-[11px] text-[#e3beb8]">Final Destination</p>
                          </div>
                        </div>
                      </div>
                      <Link to="/browse-jaloos" className="w-full block text-center py-3 bg-[#292a2a] rounded-lg text-white font-medium text-[13px] hover:bg-[#343535] transition-colors">
                        {isLive ? 'Track Procession' : 'View Route Map'}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* FEATURED SPEAKERS SECTION */}
        <section className="px-6 py-20 max-w-[1200px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-bold text-center mb-12">Featured Speakers</h2>
          {featuredZakireen.length === 0 ? (
            <p className="text-[#e3beb8] text-[13px] text-center">No featured speakers yet.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-16">
              {featuredZakireen.map((z) => (
                <Link key={z.id} to="/browse-zakireen" className="flex flex-col items-center group cursor-pointer">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 border-2 border-[#2A2A2A] group-hover:border-[#8b0000] transition-all mb-3 relative">
                    {z.image_url ? (
                      <img className="w-full h-full object-cover rounded-full" src={z.image_url} alt={z.name} />
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#292a2a] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#e3beb8] text-[32px]">person</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[13px] font-bold group-hover:text-[#8b0000] transition-colors">{z.name}</p>
                  <span className="bg-[#1e2020] px-2 py-[2px] rounded text-[10px] uppercase font-bold text-[#e3beb8] mt-1">{z.type || 'Zakir'}</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

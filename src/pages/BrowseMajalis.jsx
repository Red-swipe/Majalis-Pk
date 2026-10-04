import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';
import { supabase } from '../lib/supabase';

export default function BrowseMajalis() {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [genders, setGenders] = useState({ male: true, female: false });
  const [speakerTypes, setSpeakerTypes] = useState({ zakir: false, molana: false, aalim: false });
  const [imambargah, setImambargah] = useState('All Locations');
  // Committed (applied) filter values
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedGenders, setAppliedGenders] = useState({ male: true, female: false });
  const [appliedSpeakerTypes, setAppliedSpeakerTypes] = useState({ zakir: false, molana: false, aalim: false });
  const [appliedImambargah, setAppliedImambargah] = useState('All Locations');
  const [majalisData, setMajalisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function applyFilters() {
    setAppliedSearch(searchQuery);
    setAppliedGenders({ ...genders });
    setAppliedSpeakerTypes({ ...speakerTypes });
    setAppliedImambargah(imambargah);
  }

  const days = ['All', ...Array.from({ length: 30 }, (_, i) => String(i + 1))];

  useEffect(() => {
    async function fetchMajalis() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('majalis')
        .select('*, imambargahs(name, address), speakers(name, type)')
        .order('date', { ascending: true });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      const mapped = (data || []).map((item) => ({
        id: item.id,
        day: item.date ? new Date(item.date).getDate() : 1,
        speaker: item.speakers?.name || '',
        subject: item.subject || '',
        time: item.time || '',
        location: item.imambargahs?.address || '',
        gender: item.gender || '',
        speakerType: item.speakers?.type || '',
        imambargah: item.imambargahs?.name || '',
        image: item.image || '',
        isLiveSoon: false,
      }));
      setMajalisData(mapped);
      setLoading(false);
    }
    fetchMajalis();
  }, []);

  const filteredMajalis = majalisData.filter((m) => {
    const dayMatch = selectedDay === 'All' || m.day === parseInt(selectedDay);
    const q = appliedSearch.toLowerCase();
    const searchMatch = !q || m.speaker.toLowerCase().includes(q) || m.location.toLowerCase().includes(q);
    const anyGenderChecked = appliedGenders.male || appliedGenders.female;
    const genderMatch = !anyGenderChecked || (appliedGenders.male && m.gender === 'male') || (appliedGenders.female && m.gender === 'female');
    const anyTypeChecked = appliedSpeakerTypes.zakir || appliedSpeakerTypes.molana || appliedSpeakerTypes.aalim;
    const typeMatch = !anyTypeChecked || (appliedSpeakerTypes.zakir && m.speakerType === 'Zakir') || (appliedSpeakerTypes.molana && m.speakerType === 'Molana') || (appliedSpeakerTypes.aalim && m.speakerType === 'Aalim');
    const imambargahMatch = appliedImambargah === 'All Locations' || m.imambargah === appliedImambargah;
    return dayMatch && searchMatch && genderMatch && typeMatch && imambargahMatch;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-[280px] shrink-0 space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1e2020] p-3 rounded-xl border border-[#2A2A2A]">
                
                {/* Search */}
                <div className={`relative mb-6 border rounded-lg transition-colors ${isSearchFocused ? 'border-[#8b0000]' : 'border-[#2A2A2A]'}`}>
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#e3beb8] text-[20px]">search</span>
                  <input 
                    className="w-full bg-[#1a1c1c] border-0 rounded-lg py-2 pl-10 pr-3 text-sm focus:ring-0 text-[#e3e2e2] placeholder:text-[#e3beb8]/50" 
                    placeholder="Search speaker or area..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>

                {/* Date Section */}
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

                {/* Gender Section */}
                <div className="mb-6">
                  <label className="block text-[13px] font-bold text-[#e3e2e2] mb-3">Gender</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="rounded border-[#2A2A2A] bg-[#1a1c1c] text-[#8b0000] focus:ring-0"
                        checked={genders.male}
                        onChange={(e) => setGenders({ ...genders, male: e.target.checked })}
                      />
                      <span className="text-sm text-[#e3beb8] group-hover:text-[#e3e2e2]">Male Majalis</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="rounded border-[#2A2A2A] bg-[#1a1c1c] text-[#8b0000] focus:ring-0"
                        checked={genders.female}
                        onChange={(e) => setGenders({ ...genders, female: e.target.checked })}
                      />
                      <span className="text-sm text-[#e3beb8] group-hover:text-[#e3e2e2]">Female Majalis</span>
                    </label>
                  </div>
                </div>

                {/* Speaker Type */}
                <div className="mb-6">
                  <label className="block text-[13px] font-bold text-[#e3e2e2] mb-3">Speaker Type</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="rounded border-[#2A2A2A] bg-[#1a1c1c] text-[#8b0000] focus:ring-0"
                        checked={speakerTypes.zakir}
                        onChange={(e) => setSpeakerTypes({ ...speakerTypes, zakir: e.target.checked })}
                      />
                      <span className="text-sm text-[#e3beb8] group-hover:text-[#e3e2e2]">Zakir</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="rounded border-[#2A2A2A] bg-[#1a1c1c] text-[#8b0000] focus:ring-0"
                        checked={speakerTypes.molana}
                        onChange={(e) => setSpeakerTypes({ ...speakerTypes, molana: e.target.checked })}
                      />
                      <span className="text-sm text-[#e3beb8] group-hover:text-[#e3e2e2]">Molana</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="rounded border-[#2A2A2A] bg-[#1a1c1c] text-[#8b0000] focus:ring-0"
                        checked={speakerTypes.aalim}
                        onChange={(e) => setSpeakerTypes({ ...speakerTypes, aalim: e.target.checked })}
                      />
                      <span className="text-sm text-[#e3beb8] group-hover:text-[#e3e2e2]">Aalim</span>
                    </label>
                  </div>
                </div>

                {/* Imambargah Selection */}
                <div className="mb-6">
                  <label className="block text-[13px] font-bold text-[#e3e2e2] mb-3">Imambargah</label>
                  <select 
                    className="w-full bg-[#1a1c1c] border border-[#2A2A2A] rounded-lg py-2 px-3 text-sm focus:border-[#8b0000] focus:ring-0 text-[#e3e2e2]"
                    value={imambargah}
                    onChange={(e) => setImambargah(e.target.value)}
                  >
                    <option>All Locations</option>
                    <option>Imambargah Shuhada-e-Karbala</option>
                    <option>Nishtar Park</option>
                    <option>Mehfil-e-Murtaza</option>
                    <option>Bargah-e-Zainab</option>
                  </select>
                </div>

                <button onClick={applyFilters} className="w-full bg-[#8b0000] hover:bg-[#A00000] text-white font-medium py-3 rounded-full transition-all active:scale-95 shadow-lg shadow-[#8b0000]/20">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Bar Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <div>
                <h1 className="text-[24px] font-bold text-[#e3e2e2]">Majalis Listings</h1>
                <p className="text-[11px] text-[#e3beb8]">Showing {filteredMajalis.length} scheduled majalis{selectedDay !== 'All' ? ` for day ${selectedDay}` : ''}</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-[13px] text-[#e3beb8] whitespace-nowrap">Sort by:</span>
                <select className="bg-[#1e2020] border border-[#2A2A2A] rounded-lg py-1.5 px-3 text-sm focus:border-[#8b0000] focus:ring-0 text-[#e3e2e2] outline-none">
                  <option>Time (Upcoming)</option>
                  <option>Date</option>
                  <option>Imambargah</option>
                  <option>Speaker Popularity</option>
                </select>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {loading && (
                <div className="col-span-full flex justify-center py-20">
                  <span className="text-[#e3beb8]">Loading majalis...</span>
                </div>
              )}
              {error && (
                <div className="col-span-full text-center py-20">
                  <p className="text-[#8b0000]">{error}</p>
                </div>
              )}
              {!loading && !error && filteredMajalis.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <p className="text-[#e3beb8]">No majalis found for this selection.</p>
                </div>
              )}
              {filteredMajalis.map((majlis) => (
                <div 
                  key={majlis.id} 
                  className="bg-[#1e2020] rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-[#8b0000]/50 transition-all group flex flex-col sm:flex-row"
                >
                  <div className="w-full sm:w-40 h-48 sm:h-auto overflow-hidden relative shrink-0">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={majlis.image} 
                      alt={majlis.speaker} 
                    />
                    {majlis.isLiveSoon && (
                      <div className="absolute top-2 left-2 bg-[#8b0000] px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">Live Soon</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-[13px] font-bold text-[#e3e2e2] group-hover:text-[#8b0000] transition-colors">{majlis.speaker}</h3>
                        <span className="material-symbols-outlined text-[#e3beb8] text-[20px] cursor-pointer hover:text-[#8b0000]">bookmark</span>
                      </div>
                      <p className="text-[11px] text-[#e3beb8] mb-3">Subject: {majlis.subject}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="bg-[#292a2a] text-[#e3e2e2] text-[11px] px-2 py-0.5 rounded-lg border border-[#2A2A2A]">{majlis.time}</span>
                        <span className="bg-[#292a2a] text-[#e3e2e2] text-[11px] px-2 py-0.5 rounded-lg border border-[#2A2A2A]">{majlis.location}</span>
                        <span className="bg-[#292a2a] text-[#e3e2e2] text-[11px] px-2 py-0.5 rounded-lg border border-[#2A2A2A]">{majlis.gender}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#8b0000] text-[16px]">location_on</span>
                        <span className="text-[11px] text-[#e3beb8]">{majlis.imambargah}</span>
                      </div>
                      <Link to="/majlis-detail" className="text-[#8b0000] text-[13px] font-medium hover:underline decoration-2 underline-offset-4">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-20 flex justify-center">
              <button className="px-12 py-3 border border-[#2A2A2A] rounded-full text-sm text-[#e3e2e2] hover:bg-[#292a2a] hover:border-[#8b0000] transition-all active:scale-95">
                Load More Majalis
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

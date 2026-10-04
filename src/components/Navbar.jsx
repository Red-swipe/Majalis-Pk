import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  // Imambargah Portal Header
  if (path === '/imambargah-portal') {
    return (
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#2A2A2A] shadow-sm">
        <div className="flex justify-between items-center px-6 py-2 max-w-[1200px] mx-auto h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-semibold text-2xl text-[#8b0000] tracking-tighter">Majalis.pk</Link>
            <div className="h-6 w-[1px] bg-[#2A2A2A] hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8b0000]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-[13px] font-medium text-[#e3e2e2] uppercase tracking-wider">Imambargah Portal</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/imambargah-portal" className="text-[#8b0000] border-b-2 border-[#8b0000] pb-1 text-[13px] font-medium active:scale-95 duration-200">Dashboard</Link>
            <Link to="/browse-majalis" className="text-[#e3beb8] hover:text-[#e3e2e2] text-[13px] font-medium active:scale-95 duration-200">Schedule</Link>
            <Link to="/admin" className="text-[#e3beb8] hover:text-[#e3e2e2] text-[13px] font-medium active:scale-95 duration-200">Analytics</Link>
          </nav>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[13px] font-bold">Markazi Imambargah</span>
              <span className="text-[10px] text-[#8b0000] uppercase tracking-tighter">Verified Official</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#8b0000]/30 flex items-center justify-center bg-[#292a2a] cursor-pointer hover:bg-[#343535] transition-colors">
              <span className="material-symbols-outlined text-[#e3e2e2]">account_balance</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Admin Dashboard Header
  if (path === '/admin') {
    return (
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#2A2A2A] shadow-sm">
        <div className="flex justify-between items-center px-6 py-2 max-w-[1200px] mx-auto h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-semibold text-2xl text-[#8b0000] tracking-tighter">Majalis.pk</Link>
            <div className="h-6 w-[1px] bg-[#2A2A2A] hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8b0000]" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
              <span className="text-[13px] font-medium text-[#e3e2e2] uppercase tracking-wider">Admin Panel</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/admin" className="text-[#8b0000] border-b-2 border-[#8b0000] pb-1 text-[13px] font-medium active:scale-95 duration-200">Dashboard</Link>
            <Link to="/imambargah-portal" className="text-[#e3beb8] hover:text-[#e3e2e2] text-[13px] font-medium active:scale-95 duration-200">Portal</Link>
            <Link to="/settings" className="text-[#e3beb8] hover:text-[#e3e2e2] text-[13px] font-medium active:scale-95 duration-200">Settings</Link>
          </nav>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[13px] font-bold">System Administrator</span>
              <span className="text-[10px] text-[#8b0000] uppercase tracking-tighter">All Access</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#8b0000]/30 flex items-center justify-center bg-[#292a2a] cursor-pointer hover:bg-[#343535] transition-colors">
              <span className="material-symbols-outlined text-[#e3e2e2]">shield_person</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Standard Site Header
  const getLinkClass = (routePath) => {
    const isActive = path === routePath || (routePath !== '/' && path.startsWith(routePath));
    return isActive
      ? "text-[#8b0000] border-b-2 border-[#8b0000] pb-1 text-[13px] font-medium transition-colors cursor-pointer"
      : "text-[#e3beb8] hover:text-[#e3e2e2] text-[13px] font-medium transition-colors cursor-pointer";
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#2A2A2A] shadow-sm">
      <div className="flex justify-between items-center px-6 py-2 max-w-[1200px] mx-auto h-[72px]">
        <Link to="/" className="font-bold text-2xl text-[#8b0000] tracking-tighter">Majalis.pk</Link>
        
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/browse-majalis" className={getLinkClass('/browse-majalis')}>Majalis</Link>
          <Link to="/browse-jaloos" className={getLinkClass('/browse-jaloos')}>Jaloos</Link>
          <Link to="/speaker-profile" className={getLinkClass('/speaker-profile')}>Speakers</Link>
          <Link to="/coming-soon" className={getLinkClass('/coming-soon')}>Cities</Link>
        </nav>

        <div className="flex items-center gap-6">
          <span className="text-[#e3beb8] hover:text-[#e3e2e2] text-[13px] font-medium cursor-pointer hover:bg-[#292a2a] transition-colors px-3 py-1.5 rounded-lg">English/Urdu</span>
          <span className="material-symbols-outlined text-[#e3beb8] cursor-pointer hover:bg-[#292a2a] p-2 rounded-full transition-colors active:scale-95 duration-200">location_on</span>
          <Link to="/settings" className="material-symbols-outlined text-[#e3beb8] cursor-pointer hover:bg-[#292a2a] p-2 rounded-full transition-colors active:scale-95 duration-200">settings</Link>
        </div>
      </div>
    </header>
  );
}

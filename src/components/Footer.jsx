import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0d0e0f] border-t border-[#2A2A2A]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 py-12 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-6">
          <div className="text-2xl text-[#8b0000] font-bold">Majalis.pk</div>
          <p className="text-sm text-[#e3beb8] leading-relaxed">
            Your central hub for spiritual gatherings and community events during the holy month of Muharram and beyond. Connecting the community through devotion and technology.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-bold text-[#e3e2e2] mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            <li><Link className="text-sm text-[#e3beb8] hover:text-[#e3e2e2] transition-colors" to="/">Home</Link></li>
            <li><Link className="text-sm text-[#e3beb8] hover:text-[#e3e2e2] transition-colors" to="/browse-majalis">Browse Majalis</Link></li>
            <li><Link className="text-sm text-[#e3beb8] hover:text-[#e3e2e2] transition-colors" to="/browse-jaloos">Jaloos Routes</Link></li>
            <li><Link className="text-sm text-[#e3beb8] hover:text-[#e3e2e2] transition-colors" to="/speaker-profile">Speakers List</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-bold text-[#e3e2e2] mb-6">Resources</h4>
          <ul className="flex flex-col gap-3">
            <li><Link className="text-sm text-[#e3beb8] hover:text-[#e3e2e2] transition-colors" to="/imambargah-portal">List your Imambargah</Link></li>
            <li><Link className="text-sm text-[#e3beb8] hover:text-[#e3e2e2] transition-colors" to="/contact">Verify Account</Link></li>
            <li><Link className="text-sm text-[#e3beb8] hover:text-[#e3e2e2] transition-colors" to="/admin">Admin Dashboard</Link></li>
            <li><Link className="text-sm text-[#e3beb8] hover:text-[#e3e2e2] transition-colors" to="/contact">Help Center</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-bold text-[#e3e2e2] mb-6">Contact</h4>
          <p className="text-sm text-[#e3beb8] mb-4">support@majalis.pk</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined cursor-pointer hover:text-[#8b0000] text-[#e3beb8] transition-colors">share</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-[#8b0000] text-[#e3beb8] transition-colors">email</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-[#8b0000] text-[#e3beb8] transition-colors">public</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[#2A2A2A] py-6 text-center max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-[#e3beb8]">© 2024 Majalis.pk. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="text-xs text-[#e3beb8]">Built with devotion for the community.</span>
        </div>
      </div>
    </footer>
  );
}

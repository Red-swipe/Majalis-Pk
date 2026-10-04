import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const location = useLocation();
  const path = location.pathname;

  const getLinkClass = (routePath, exact = false) => {
    const isActive = exact ? path === routePath : path.startsWith(routePath);
    return isActive
      ? "flex flex-col items-center justify-center text-[#8b0000] font-bold tap-highlight-transparent transition-transform active:scale-90"
      : "flex flex-col items-center justify-center text-[#e3beb8] tap-highlight-transparent transition-transform active:scale-90";
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-[#121414] border-t border-[#2A2A2A] shadow-lg z-50 rounded-t-xl">
      <Link to="/" className={getLinkClass('/', true)}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: path === '/' ? "'FILL' 1" : undefined }}>home</span>
        <span className="text-[11px]">Home</span>
      </Link>
      <Link to="/browse-majalis" className={getLinkClass('/browse-majalis')}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: path.startsWith('/browse-majalis') ? "'FILL' 1" : undefined }}>mosque</span>
        <span className="text-[11px]">Majalis</span>
      </Link>
      <Link to="/browse-jaloos" className={getLinkClass('/browse-jaloos')}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: path.startsWith('/browse-jaloos') ? "'FILL' 1" : undefined }}>groups</span>
        <span className="text-[11px]">Jaloos</span>
      </Link>
      <Link to="/speaker-profile" className={getLinkClass('/speaker-profile')}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: path.startsWith('/speaker-profile') ? "'FILL' 1" : undefined }}>account_box</span>
        <span className="text-[11px]">Speakers</span>
      </Link>
      <Link to="/settings" className={getLinkClass('/settings')}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: path.startsWith('/settings') ? "'FILL' 1" : undefined }}>settings</span>
        <span className="text-[11px]">Settings</span>
      </Link>
    </nav>
  );
}

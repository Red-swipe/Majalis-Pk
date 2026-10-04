import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

export default function ImambargahPortal() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { key: 'majalis', label: 'Manage Majalis', icon: 'event' },
    { key: 'speakers', label: 'Speakers', icon: 'mic' },
    { key: 'gallery', label: 'Gallery', icon: 'photo_library' },
    { key: 'announcements', label: 'Announcements', icon: 'campaign' },
    { key: 'settings', label: 'Portal Settings', icon: 'settings' },
  ];

  const upcomingPortalMajalis = [
    { id: 1, title: 'Shab-e-Ashur', date: '9 Jul 2026', speaker: 'Molana Nusrat Abbas', status: 'Published' },
    { id: 2, title: 'Youm-e-Ashur', date: '10 Jul 2026', speaker: 'Zakir Ali Raza', status: 'Draft' },
    { id: 3, title: 'Chehlum', date: '19 Aug 2026', speaker: 'Molana Kumail Mehdavi', status: 'Published' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-[1200px] mx-auto">
        {/* Portal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[24px] font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8b0000]" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
              Imambargah Portal
            </h1>
            <p className="text-[13px] text-[#e3beb8]">Manage your Imambargah Colonel Maqbool listing</p>
          </div>
          <button className="bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-5 py-2 rounded-full text-[13px] transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-[#8b0000]/20">
            + Add New Majlis
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-[240px] shrink-0">
            <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-[#8b0000]/10 to-transparent border-b border-[#2A2A2A]">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#8b0000]/40 to-[#343535] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#e3beb8]">mosque</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold">Colonel Maqbool</p>
                    <p className="text-[11px] text-[#e3beb8]">Islamabad</p>
                  </div>
                </div>
              </div>
              <div className="p-2 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.key}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all active:scale-[0.98] ${
                      activeSection === item.key
                        ? 'bg-[#8b0000]/20 text-[#e3e2e2] border border-[#8b0000]/20'
                        : 'text-[#e3beb8] hover:bg-[#242626] hover:text-[#e3e2e2]'
                    }`}
                    onClick={() => setActiveSection(item.key)}
                  >
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'dashboard' && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Majalis', value: '24', icon: 'event', color: '#8b0000' },
                    { label: 'Upcoming', value: '3', icon: 'upcoming', color: '#1B4332' },
                    { label: 'Speakers', value: '12', icon: 'mic', color: '#8b0000' },
                    { label: 'Views This Month', value: '2.4K', icon: 'visibility', color: '#1B4332' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-4 hover:border-[#8b0000]/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] text-[#e3beb8] font-medium">{stat.label}</span>
                        <span className="w-[30px] h-[30px] rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '20' }}>
                          <span className="material-symbols-outlined text-[16px]" style={{ color: stat.color }}>{stat.icon}</span>
                        </span>
                      </div>
                      <p className="text-[20px] font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Upcoming */}
                <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[16px] font-bold">Upcoming Majalis</h2>
                    <button className="text-[12px] text-[#8b0000] font-medium hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {upcomingPortalMajalis.map((m) => (
                      <div key={m.id} className="flex items-center justify-between p-3 bg-[#242626] rounded-xl border border-[#2A2A2A] hover:border-[#8b0000]/30 transition-colors">
                        <div>
                          <p className="text-[14px] font-bold">{m.title}</p>
                          <p className="text-[12px] text-[#e3beb8]">{m.speaker} • {m.date}</p>
                        </div>
                        <span className={`text-[11px] font-medium px-3 py-1 rounded-lg ${
                          m.status === 'Published' ? 'bg-[#1B4332] text-[#6fcf97]' : 'bg-[#343535] text-[#e3beb8]'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Update Profile Info', icon: 'edit', desc: 'Edit your imambargah details' },
                    { label: 'Upload Photos', icon: 'add_photo_alternate', desc: 'Add to your gallery' },
                    { label: 'View Public Page', icon: 'open_in_new', desc: 'See how visitors see you', to: '/verified-imambargah' },
                  ].map((action) => (
                    <Link
                      key={action.label}
                      to={action.to || '#'}
                      className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-4 hover:border-[#8b0000]/30 transition-all hover:bg-[#242626] group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-[#8b0000] text-[22px]">{action.icon}</span>
                        <span className="text-[13px] font-bold group-hover:text-[#8b0000] transition-colors">{action.label}</span>
                      </div>
                      <p className="text-[12px] text-[#e3beb8]">{action.desc}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {activeSection === 'majalis' && (
              <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-8 text-center">
                <span className="material-symbols-outlined text-[50px] text-[#8b0000]">event</span>
                <h3 className="text-[18px] font-bold mt-3 mb-2">Manage Majalis</h3>
                <p className="text-[13px] text-[#e3beb8] mb-4">Add, edit, or remove majalis listings for your imambargah.</p>
                <button className="bg-[#8b0000] hover:bg-[#A00000] text-white px-6 py-2 rounded-full text-[13px] transition-all active:scale-95">
                  + Add New Majlis
                </button>
              </div>
            )}

            {activeSection === 'speakers' && (
              <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-8 text-center">
                <span className="material-symbols-outlined text-[50px] text-[#8b0000]">mic</span>
                <h3 className="text-[18px] font-bold mt-3 mb-2">Manage Speakers</h3>
                <p className="text-[13px] text-[#e3beb8] mb-4">Manage speaker profiles and their schedules.</p>
                <button className="bg-[#8b0000] hover:bg-[#A00000] text-white px-6 py-2 rounded-full text-[13px] transition-all active:scale-95">
                  + Add Speaker
                </button>
              </div>
            )}

            {activeSection === 'gallery' && (
              <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-8 text-center">
                <span className="material-symbols-outlined text-[50px] text-[#8b0000]">photo_library</span>
                <h3 className="text-[18px] font-bold mt-3 mb-2">Gallery Management</h3>
                <p className="text-[13px] text-[#e3beb8]">Upload and manage photos of your imambargah.</p>
              </div>
            )}

            {activeSection === 'announcements' && (
              <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-8 text-center">
                <span className="material-symbols-outlined text-[50px] text-[#8b0000]">campaign</span>
                <h3 className="text-[18px] font-bold mt-3 mb-2">Announcements</h3>
                <p className="text-[13px] text-[#e3beb8]">Post updates and announcements for your community.</p>
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6">
                <h2 className="text-[16px] font-bold mb-6">Portal Settings</h2>
                <Link to="/settings" className="block w-full text-left p-4 bg-[#242626] rounded-xl border border-[#2A2A2A] hover:border-[#8b0000]/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#8b0000]">settings</span>
                      <div>
                        <p className="text-[14px] font-bold">Account & Portal Settings</p>
                        <p className="text-[12px] text-[#e3beb8]">Manage notifications, password, and preferences</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#e3beb8]">chevron_right</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

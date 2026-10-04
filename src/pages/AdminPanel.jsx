import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

const statCards = [
  { label: 'Total Users', value: '12,847', icon: 'group', change: '+12%', positive: true },
  { label: 'Imambargahs', value: '486', icon: 'mosque', change: '+8%', positive: true },
  { label: 'Active Listings', value: '3,290', icon: 'event', change: '+23%', positive: true },
  { label: 'Pending Reviews', value: '18', icon: 'rate_review', change: '-5%', positive: true },
  { label: 'Reports Flagged', value: '7', icon: 'flag', change: '+3', positive: false },
];

const recentActivity = [
  { user: 'Syed Ali Raza', action: 'created a new listing', org: 'Imambargah Hussainiya', time: '2 min ago' },
  { user: 'Admin', action: 'approved listing', org: 'Masjid-e-Ali', time: '15 min ago' },
  { user: 'Fatima Zaidi', action: 'submitted a review', org: 'Imambargah Zainabia', time: '1 hr ago' },
  { user: 'Mohammad Rizvi', action: 'updated profile', org: '--', time: '3 hrs ago' },
  { user: 'Admin', action: 'removed inappropriate content', org: 'Imambargah Fatimiyah', time: '5 hrs ago' },
];

export default function AdminPanel() {
  const [manageTab, setManageTab] = useState('users');

  const adminTabs = [
    { key: 'users', label: 'Users', icon: 'group' },
    { key: 'imambargahs', label: 'Imambargahs', icon: 'mosque' },
    { key: 'listings', label: 'Listings', icon: 'event' },
    { key: 'reports', label: 'Reports', icon: 'flag' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-[1100px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[24px] font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8b0000]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              Admin Panel
            </h1>
            <p className="text-[13px] text-[#e3beb8]">Manage platform data, users, and content</p>
          </div>
          <div className="flex items-center gap-2 bg-[#1e2020] rounded-full px-4 py-2 border border-[#2A2A2A]">
            <span className="material-symbols-outlined text-[18px] text-[#6fcf97]">circle</span>
            <span className="text-[12px] font-medium">System Online</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-4 hover:border-[#8b0000]/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-[#8b0000] text-[22px]">{card.icon}</span>
                <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full ${card.positive ? 'bg-[#1B4332]/40 text-[#6fcf97]' : 'bg-[#8b0000]/30 text-[#ff6b6b]'}`}>
                  {card.change}
                </span>
              </div>
              <p className="text-[22px] font-bold">{card.value}</p>
              <p className="text-[11px] text-[#e3beb8] mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-5">
            <h2 className="text-[14px] font-bold flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[18px] text-[#8b0000]">history</span>
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-[#2A2A2A] last:border-0 last:pb-0">
                  <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#8b0000]/30 to-[#343535] flex items-center justify-center flex-shrink-0 text-[12px] font-bold">
                    {item.user[0]}
                  </div>
                  <div>
                    <p className="text-[12px]">
                      <span className="font-bold">{item.user}</span> {item.action}
                      {item.org !== '--' && <span className="text-[#e3beb8]"> in <span className="text-[#e3e2e2]">{item.org}</span></span>}
                    </p>
                    <p className="text-[11px] text-[#e3beb8] mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-5">
            <h2 className="text-[14px] font-bold flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[18px] text-[#8b0000]">bolt</span>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'person_add', label: 'Add User' },
                { icon: 'add_business', label: 'Add Imambargah' },
                { icon: 'campaign', label: 'Send Notification' },
                { icon: 'description', label: 'Generate Report' },
                { icon: 'backup', label: 'Backup Data' },
                { icon: 'settings', label: 'System Config' },
              ].map((action) => (
                <button key={action.label}
                  className="flex items-center gap-3 bg-[#242626] hover:bg-[#2A2A2A] border border-[#2A2A2A] rounded-xl p-3 text-left transition-all active:scale-[0.98]">
                  <span className="material-symbols-outlined text-[#8b0000] text-[22px]">{action.icon}</span>
                  <span className="text-[12px] font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Management Tabs */}
        <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-5">
          <div className="flex flex-wrap gap-2 mb-5">
            {adminTabs.map((tab) => (
              <button key={tab.key}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium transition-all active:scale-95 ${
                  manageTab === tab.key
                    ? 'bg-[#8b0000] text-white shadow-lg shadow-[#8b0000]/20'
                    : 'bg-[#242626] text-[#e3beb8] hover:bg-[#2A2A2A]'
                }`}
                onClick={() => setManageTab(tab.key)}>
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {manageTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-[#e3beb8] border-b border-[#2A2A2A]">
                    <th className="text-left py-3 px-2 font-medium">Name</th>
                    <th className="text-left py-3 px-2 font-medium">Email</th>
                    <th className="text-left py-3 px-2 font-medium">Role</th>
                    <th className="text-left py-3 px-2 font-medium">Status</th>
                    <th className="text-left py-3 px-2 font-medium">Joined</th>
                    <th className="text-right py-3 px-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Syed Ali Raza', email: 'ali@example.com', role: 'User', status: 'Active', joined: 'Jan 2026' },
                    { name: 'Fatima Zaidi', email: 'fatima@example.com', role: 'Admin', status: 'Active', joined: 'Dec 2025' },
                    { name: 'Mohammad Rizvi', email: 'rizvi@example.com', role: 'Imambargah Admin', status: 'Active', joined: 'Feb 2026' },
                    { name: 'Zainab Hussain', email: 'zainab@example.com', role: 'User', status: 'Suspended', joined: 'Mar 2025' },
                    { name: 'Hassan Abbas', email: 'hassan@example.com', role: 'User', status: 'Pending', joined: 'Apr 2026' },
                  ].map((user) => (
                    <tr key={user.email} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#242626] transition-colors">
                      <td className="py-3 px-2"><span className="font-bold">{user.name}</span></td>
                      <td className="py-3 px-2 text-[#e3beb8]">{user.email}</td>
                      <td className="py-3 px-2">{user.role}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                          user.status === 'Active' ? 'bg-[#1B4332]/40 text-[#6fcf97]'
                          : user.status === 'Suspended' ? 'bg-[#8b0000]/30 text-[#ff6b6b]'
                          : 'bg-[#242626] text-[#e3beb8]'
                        }`}>{user.status}</span>
                      </td>
                      <td className="py-3 px-2 text-[#e3beb8]">{user.joined}</td>
                      <td className="py-3 px-2 text-right">
                        <button className="text-[#8b0000] hover:underline text-[11px]">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {manageTab === 'imambargahs' && (
            <div className="text-center py-8 text-[13px] text-[#e3beb8]">
              <span className="material-symbols-outlined text-[40px] text-[#343535] block mb-2">mosque</span>
              Imambargah management table (45 entries) — similar layout as Users
            </div>
          )}

          {manageTab === 'listings' && (
            <div className="text-center py-8 text-[13px] text-[#e3beb8]">
              <span className="material-symbols-outlined text-[40px] text-[#343535] block mb-2">event</span>
              Listing management table (3,290 entries) — similar layout as Users
            </div>
          )}

          {manageTab === 'reports' && (
            <div className="text-center py-8 text-[13px] text-[#e3beb8]">
              <span className="material-symbols-outlined text-[40px] text-[#343535] block mb-2">flag</span>
              No pending reports at this time.
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

export default function Settings() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('settings_activeTab') || 'profile');

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('settings_notifications');
    return saved ? JSON.parse(saved) : {
      emailNotifications: true,
      pushNotifications: true,
      majlisReminders: true,
      newContentAlerts: true,
      newsletter: false,
    };
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => localStorage.getItem('settings_2fa') === 'true');

  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('settings_preferences');
    return saved ? JSON.parse(saved) : {
      language: 'English',
      location: 'All Cities',
      calendarView: 'List View',
    };
  });

  useEffect(() => {
    localStorage.setItem('settings_activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('settings_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('settings_2fa', String(twoFactorEnabled));
  }, [twoFactorEnabled]);

  useEffect(() => {
    localStorage.setItem('settings_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const tabs = [
    { key: 'profile', label: 'Profile', icon: 'person' },
    { key: 'notifications', label: 'Notifications', icon: 'notifications' },
    { key: 'security', label: 'Security', icon: 'lock' },
    { key: 'preferences', label: 'Preferences', icon: 'tune' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-[900px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[24px] font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8b0000]" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            Settings
          </h1>
          <p className="text-[13px] text-[#e3beb8]">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all active:scale-95 ${
                activeTab === tab.key
                  ? 'bg-[#8b0000] text-white shadow-lg shadow-[#8b0000]/20'
                  : 'bg-[#1e2020] text-[#e3beb8] border border-[#2A2A2A] hover:border-[#8b0000]/40'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 sm:p-8">
            <h2 className="text-[16px] font-bold mb-6">Profile Information</h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[64px] h-[64px] rounded-full bg-gradient-to-br from-[#8b0000]/40 to-[#343535] flex items-center justify-center">
                <span className="material-symbols-outlined text-[30px] text-[#e3beb8]">person</span>
              </div>
              <div>
                <p className="text-[14px] font-bold">Upload Photo</p>
                <p className="text-[12px] text-[#e3beb8]">JPG, PNG, or GIF. Max 2MB.</p>
              </div>
              <button className="ml-auto bg-[#242626] hover:bg-[#2A2A2A] border border-[#2A2A2A] px-4 py-2 rounded-full text-[12px] transition-all active:scale-95">Upload</button>
            </div>

            {[
              { label: 'Full Name', value: 'Syed Ali Raza' },
              { label: 'Email', value: 'ali@example.com' },
              { label: 'Phone', value: '+92 300 1234567' },
              { label: 'Location', value: 'Islamabad, Pakistan' },
            ].map((field) => (
              <div key={field.label} className="mb-4">
                <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">{field.label}</label>
                <input defaultValue={field.value}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] focus:outline-none focus:border-[#8b0000] transition-colors" />
              </div>
            ))}
            <button className="bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-6 py-2.5 rounded-full text-[13px] transition-all active:scale-95 shadow-lg shadow-[#8b0000]/20 mt-2">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 sm:p-8">
            <h2 className="text-[16px] font-bold mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
                { key: 'majlisReminders', label: 'Majlis Reminders', desc: 'Get reminded before upcoming majalis' },
                { key: 'newContentAlerts', label: 'New Content Alerts', desc: 'When new schedules are posted' },
                { key: 'newsletter', label: 'Newsletter', desc: 'Monthly updates and community news' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-[#242626] rounded-xl border border-[#2A2A2A]">
                  <div>
                    <p className="text-[14px] font-bold">{item.label}</p>
                    <p className="text-[12px] text-[#e3beb8]">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notifications[item.key]} onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})} className="sr-only peer" />
                    <div className="w-[42px] h-[24px] bg-[#343535] rounded-full peer peer-checked:bg-[#8b0000] peer-checked:after:translate-x-[18px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-[20px] after:h-[20px] after:rounded-full after:bg-white after:transition-all" />
                  </label>
                </div>
              ))}
            </div>
            <button className="mt-6 bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-6 py-2.5 rounded-full text-[13px] transition-all active:scale-95 shadow-lg shadow-[#8b0000]/20">
              Save Preferences
            </button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 sm:p-8">
            <h2 className="text-[16px] font-bold mb-6">Security Settings</h2>
            <div className="mb-4">
              <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">Current Password</label>
              <input type="password" placeholder="Enter current password"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">New Password</label>
                <input type="password" placeholder="Enter new password"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#e3beb8] mb-1.5 block">Confirm New Password</label>
                <input type="password" placeholder="Confirm new password"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] placeholder:text-[#e3beb8]/40 focus:outline-none focus:border-[#8b0000] transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#242626] rounded-xl border border-[#2A2A2A] mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#e3beb8]">security</span>
                <div>
                  <p className="text-[13px] font-bold">Two-Factor Authentication</p>
                  <p className="text-[11px] text-[#e3beb8]">Add an extra layer of security</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={twoFactorEnabled} onChange={(e) => setTwoFactorEnabled(e.target.checked)} className="sr-only peer" />
                <div className="w-[42px] h-[24px] bg-[#343535] rounded-full peer peer-checked:bg-[#8b0000] peer-checked:after:translate-x-[18px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-[20px] after:h-[20px] after:rounded-full after:bg-white after:transition-all" />
              </label>
            </div>
            <button className="bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-6 py-2.5 rounded-full text-[13px] transition-all active:scale-95 shadow-lg shadow-[#8b0000]/20">
              Update Password
            </button>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 sm:p-8">
            <h2 className="text-[16px] font-bold mb-6">Display Preferences</h2>
            {[
              { key: 'language', label: 'Language', options: ['English', 'Urdu', 'Arabic'] },
              { key: 'location', label: 'City / Location', options: ['All Cities', 'Islamabad', 'Lahore', 'Karachi'] },
              { key: 'calendarView', label: 'Default Calendar View', options: ['List View', 'Grid View', 'Calendar View'] },
            ].map((pref) => (
              <div key={pref.key} className="mb-5">
                <label className="text-[12px] font-medium text-[#e3beb8] mb-2 block">{pref.label}</label>
                <select value={preferences[pref.key]} onChange={(e) => setPreferences({...preferences, [pref.key]: e.target.value})} className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-[13px] text-[#e3e2e2] focus:outline-none focus:border-[#8b0000] transition-colors appearance-none">
                  {pref.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button className="mt-2 bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-6 py-2.5 rounded-full text-[13px] transition-all active:scale-95 shadow-lg shadow-[#8b0000]/20">
              Save Preferences
            </button>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

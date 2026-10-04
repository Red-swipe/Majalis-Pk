import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

export default function SpeakerProfile() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingMajalis = [
    { id: 1, title: 'Shab-e-Ashur', date: '9th Muharram', time: '8:00 PM', venue: 'Imambargah Yasrab, Islamabad', topic: 'Qiyam-e-Imam Hussain (AS)' },
    { id: 2, title: 'Youm-e-Ashur', date: '10th Muharram', time: '5:00 AM', venue: 'Markazi Imambargah G-6, Islamabad', topic: 'Shahadat aur Sabr' },
    { id: 3, title: 'Chehlum Majlis', date: '20th Safar', time: '7:00 PM', venue: 'Bargah-e-Zainab, Rawalpindi', topic: 'Paigham-e-Karbala' },
  ];

  const pastRecordings = [
    { id: 1, title: 'Maqtal-e-Mustafa', date: '8th Muharram', venue: 'Imambargah Colonel Maqbool', duration: '45 min' },
    { id: 2, title: 'Falsafa-e-Shahadat', date: '6th Muharram', venue: 'Baitul Qayyam', duration: '52 min' },
    { id: 3, title: 'Azadari ka Maqsad', date: '2nd Muharram', venue: 'Qadeemi Imambargah', duration: '38 min' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e3e2e2] overflow-x-hidden antialiased">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-[900px] mx-auto">
        {/* Back Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#e3beb8] hover:text-[#e3e2e2] mb-6 transition-colors text-[13px]">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back to Home</span>
        </Link>

        {/* Profile Header */}
        <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] rounded-full bg-gradient-to-br from-[#8b0000]/40 to-[#343535] flex items-center justify-center shrink-0 border-2 border-[#8b0000]/30">
              <span className="material-symbols-outlined text-[50px] sm:text-[60px] text-[#e3beb8]">person</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h1 className="text-[24px] font-bold">Molana Nusrat Abbas</h1>
                  <p className="text-[13px] text-[#e3beb8]">Zakir-e-Ahle Bait (AS) • Islamic Scholar</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-[#8b0000] hover:bg-[#A00000] text-white font-medium px-5 py-2 rounded-full text-[13px] transition-all active:scale-95 whitespace-nowrap">
                    Book for Event
                  </button>
                  <button className="border border-[#2A2A2A] hover:border-[#8b0000] text-[#e3beb8] p-2 rounded-lg transition-all active:scale-95">
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                </div>
              </div>

              <p className="text-[13px] text-[#e3beb8] leading-relaxed mb-4">
                Renowned Zakir and Islamic scholar specializing in the history of Karbala, Maqtal narration, and Ahle Bait (AS) teachings. With over 15 years of experience, he has addressed gatherings across Pakistan and abroad, bringing the message of Imam Hussain (AS) to life through eloquent and heartfelt oration.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 sm:gap-10">
                <div>
                  <p className="text-[18px] font-bold text-[#e3e2e2]">142</p>
                  <p className="text-[11px] text-[#e3beb8]">Total Majalis</p>
                </div>
                <div>
                  <p className="text-[18px] font-bold text-[#e3e2e2]">28</p>
                  <p className="text-[11px] text-[#e3beb8]">Cities Visited</p>
                </div>
                <div>
                  <p className="text-[18px] font-bold text-[#e3e2e2]">15+</p>
                  <p className="text-[11px] text-[#e3beb8]">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-4 sm:p-5 mb-6 flex flex-wrap items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#8b0000]">call</span>
            <span className="text-[13px] text-[#e3beb8]">+92 300 1234567</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#8b0000]">mail</span>
            <span className="text-[13px] text-[#e3beb8]">nusrat.abbas@example.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#8b0000]">language</span>
            <span className="text-[13px] text-[#e3beb8]">Urdu, English, Persian</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#2A2A2A] mb-6">
          {[
            { key: 'upcoming', label: 'Upcoming Majalis' },
            { key: 'recordings', label: 'Past Recordings' },
            { key: 'about', label: 'About' },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`pb-3 px-4 text-[13px] font-medium transition-all relative ${
                activeTab === tab.key
                  ? 'text-[#e3e2e2]'
                  : 'text-[#e3beb8] hover:text-[#e3e2e2]'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#8b0000] rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingMajalis.map((m) => (
              <Link key={m.id} to="/majlis-detail" className="block bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-5 hover:border-[#8b0000]/50 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[15px] font-bold group-hover:text-[#8b0000] transition-colors">{m.title}</h3>
                  <div className="flex items-center gap-1 bg-[#292a2a] px-2 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-[14px] text-[#e3beb8]">schedule</span>
                    <span className="text-[11px] text-[#e3beb8]">{m.time}</span>
                  </div>
                </div>
                <p className="text-[13px] text-[#e3beb8] mb-3">{m.topic}</p>
                <div className="flex items-center gap-2 text-[11px] text-[#e3beb8]">
                  <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                  <span>{m.date}</span>
                  <span className="mx-1">•</span>
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>{m.venue}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'recordings' && (
          <div className="space-y-4">
            {pastRecordings.map((r) => (
              <div key={r.id} className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-5 hover:border-[#8b0000]/50 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[15px] font-bold group-hover:text-[#8b0000] transition-colors">{r.title}</h3>
                  <span className="text-[11px] text-[#e3beb8] bg-[#292a2a] px-2 py-1 rounded-lg">{r.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#e3beb8]">
                  <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                  <span>{r.date}</span>
                  <span className="mx-1">•</span>
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>{r.venue}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex items-center gap-1 bg-[#292a2a] hover:bg-[#343535] text-[#e3e2e2] px-4 py-1.5 rounded-lg text-[12px] transition-all active:scale-95">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    Listen
                  </button>
                  <button className="flex items-center gap-1 bg-[#292a2a] hover:bg-[#343535] text-[#e3e2e2] px-4 py-1.5 rounded-lg text-[12px] transition-all active:scale-95">
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-[#1e2020] rounded-xl border border-[#2A2A2A] p-6">
            <h3 className="text-[16px] font-bold mb-3">Biography</h3>
            <div className="text-[13px] text-[#e3beb8] leading-relaxed space-y-3">
              <p>
                Molana Nusrat Abbas is a distinguished Zakir-e-Ahle Bait (AS) and Islamic scholar based in Islamabad, Pakistan. He has dedicated his life to the propagation of the teachings of Ahle Bait (AS) and the message of Karbala.
              </p>
              <p>
                He completed his religious education from Jamia Al-Mustafa, Qom, and holds an MA in Islamic Studies from the University of Punjab. His eloquent style of narration combines deep historical knowledge with spiritual insight, making complex theological concepts accessible to diverse audiences.
              </p>
              <p>
                Over the past 15 years, he has delivered more than 140 majalis across 28 cities in Pakistan, as well as in the UK, USA, and Canada. He is particularly known for his detailed Maqtal narrations and his ability to connect the events of Karbala with contemporary relevance.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

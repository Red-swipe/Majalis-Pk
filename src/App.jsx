import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import BrowseMajalis from './pages/BrowseMajalis';
import MajlisDetail from './pages/MajlisDetail';
import BrowseJaloos from './pages/BrowseJaloos';
import SpeakerProfile from './pages/SpeakerProfile';
import VerifiedImambargah from './pages/VerifiedImambargah';
import ImambargahPortal from './pages/ImambargahPortal';
import ContactUs from './pages/ContactUs';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-majalis" element={<BrowseMajalis />} />
        <Route path="/majlis/:id" element={<MajlisDetail />} />
        <Route path="/browse-jaloos" element={<BrowseJaloos />} />
        <Route path="/speaker-profile" element={<SpeakerProfile />} />
        <Route path="/verified-imambargah" element={<VerifiedImambargah />} />
        <Route path="/imambargah-portal" element={<ImambargahPortal />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

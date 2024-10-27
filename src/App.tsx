import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoomSilver from "./pages/RoomSilver";
import RoomGold from "./pages/RoomGold";
import RoomPlatinum from "./pages/RoomPlatinum";
import ScrollToTop from "./components/ScrollToTop";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/silver" element={<RoomSilver />} />
        <Route path="/gold" element={<RoomGold />} />
        <Route path="/platinum" element={<RoomPlatinum />} />
      </Routes>
    </Router>
  );
};

export default App;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageEvents from "./components/Admin/ManageEvents";
import ManageBookings from "./components/Admin/ManageBookings";
import Analytics from "./components/Admin/Analytics"
import EventBrowsingPage from "./components/Event/EventBrowsingPage";
import EventCreationPage from "./components/Event/EventCreationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventBrowsingPage />} />
        <Route path="/eventscreationpage" element={<EventCreationPage />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="events" element={<ManageEvents />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
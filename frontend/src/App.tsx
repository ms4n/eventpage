import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Ticket } from "lucide-react";
import EventForm from "./components/event-form/EventForm";
import EventList from "./components/events/EventList";
import EventDetail from "./components/events/EventDetail";

const Navigation = () => {
  const location = useLocation();
  const isEventDetail = location.pathname.match(/^\/events\/[^/]+$/);

  if (isEventDetail) return null;

  return (
    <nav className="p-4 flex items-center space-x-6">
      <Link to="/" className="text-white hover:text-white/80">
        Events
      </Link>
      <Link
        to="/events"
        className="flex items-center space-x-2 text-white hover:text-white/80"
      >
        <Ticket className="w-4 h-4" />
        <span>All Events</span>
      </Link>
    </nav>
  );
};

const App = () => {
  useEffect(() => {
    document.title = "Event Page";
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#3D2B05] text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<EventForm />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Event } from "../../types/event";
import env from "../../config/env";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${env.API_URL}/events`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const { data } = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return <div className="container mx-auto px-4 py-8">Loading events...</div>;
  if (error)
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link
          to="/events/new"
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-white/90"
        >
          Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-white/70 text-sm">
                {new Date(event.start_date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{event.location || "No location"}</span>
              <span className="text-sm">
                {event.tickets[0]?.is_free
                  ? "Free"
                  : `$${event.tickets[0]?.price}`}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventList;

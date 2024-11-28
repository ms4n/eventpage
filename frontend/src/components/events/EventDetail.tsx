import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../../types/event";
import env from "../../config/env";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  InfoIcon,
  Ticket,
} from "lucide-react";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${env.API_URL}/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const { data } = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading event...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div
      className="min-h-screen w-full overflow-y-auto"
      style={{ backgroundColor: event.bg_color || "#FFFFFF" }}
    >
      <div className="container mx-auto px-4 py-8 pt-16 h-full flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col lg:flex-row lg:gap-12">
            {/* Left Column - Event Logo */}
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
              <div className="aspect-square bg-black/10 rounded-xl overflow-hidden flex items-center justify-center">
                <span className="text-4xl">🎉</span>
              </div>
            </div>

            {/* Right Column - Event Details */}
            <div className="flex flex-col space-y-6 flex-1">
              {/* Event Status */}
              <div className="text-sm font-medium">
                Featured in {event.location?.split(",")[0]}
              </div>

              {/* Event Title */}
              <h1 className="text-4xl font-bold">{event.name}</h1>

              {/* Date and Time */}
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5" />
                <div>
                  <div className="font-semibold">
                    {new Date(event.start_date).toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                  <div className="text-sm">
                    {new Date(event.start_date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(event.end_date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-5 h-5" />
                <div>
                  {event.require_approval ? (
                    <div className="font-medium">Register to See Address</div>
                  ) : (
                    <div className="font-medium">{event.location}</div>
                  )}
                  <div className="text-sm">
                    {event.location?.split(",").slice(-2).join(", ")}
                  </div>
                </div>
              </div>

              {/* Ticket Information */}
              <div className="flex items-center space-x-2">
                <Ticket className="w-5 h-5" />
                <div>
                  <div className="font-medium">
                    {event.tickets[0]?.is_free
                      ? "Free Entry"
                      : `Ticket Price: $${event.tickets[0]?.price}`}
                  </div>
                  {!event.tickets[0]?.is_free && event.tickets[0]?.price && (
                    <div className="text-sm">
                      Price includes all applicable taxes and fees
                    </div>
                  )}
                </div>
              </div>

              {/* Capacity */}
              {event.capacity && event.capacity !== "unlimited" && (
                <div className="flex items-center space-x-2">
                  <UsersIcon className="w-5 h-5" />
                  <div className="font-medium">
                    Capacity: {event.capacity} attendees
                  </div>
                </div>
              )}

              {/* Registration Status */}
              <div className="bg-black/5 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <InfoIcon className="w-5 h-5 mt-1" />
                  <div>
                    <div className="font-semibold">
                      {event.require_approval
                        ? "Approval Required"
                        : "Registration"}
                    </div>
                    <div className="text-sm">
                      {event.require_approval
                        ? "Your registration is subject to approval by the host."
                        : "Welcome! To join the event, please register below."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">About Event</h2>
                  <div className="prose max-w-none">{event.description}</div>
                </div>
              )}

              {/* Register Button */}
              <button className="w-full bg-white text-black hover:bg-white/90 font-semibold py-3 rounded-lg mt-4">
                {event.tickets[0]?.is_free
                  ? "Register Now"
                  : "Purchase Tickets"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

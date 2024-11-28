import React, { useState } from "react";
import { EventFormData } from "../../types/event";
import BgColorPicker from "./BgColorPicker";
import DateTimePicker from "./DateTimePicker";
import LocationPicker from "./LocationPicker";
import DescriptionInput from "./DescriptionInput";
import EventOptions from "./EventOptions";
import { Button } from "../../components/ui/button";
import { createEvent } from "../../services/event.service";
import { useNavigate } from "react-router-dom";

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    bgColor: "#FFFFFF",
    isPublic: true,
    requireApproval: false,
    capacity: "unlimited",
    location: "",
    tickets: {
      isFree: true,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createEvent(formData);
      console.log("Event created successfully:", response);

      // Open event detail page in new tab
      const eventDetailUrl = `/events/${response.id}`;
      window.open(eventDetailUrl, "_blank");

      // Optionally, navigate to events list in current tab
      navigate("/events");
    } catch (error) {
      console.error("Failed to create event:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartDateChange = (date: Date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleEndDateChange = (date: Date) => {
    setFormData({ ...formData, endDate: date });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto min-h-[600px] flex flex-col px-4 h-screen justify-center"
    >
      <div className="flex flex-col lg:flex-row lg:gap-12">
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
          <BgColorPicker
            color={formData.bgColor}
            onChange={(color) => setFormData({ ...formData, bgColor: color })}
          />
        </div>

        <div className="flex flex-col space-y-4 flex-1">
          <input
            type="text"
            placeholder="Event Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full py-2 text-3xl font-semibold bg-transparent border-none outline-none placeholder-white/50"
          />

          <DateTimePicker
            startDate={formData.startDate}
            endDate={formData.endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            timezone="GMT+05:30"
            location="Calcutta"
          />

          <LocationPicker
            location={formData.location}
            onChange={(location, placeId) =>
              setFormData({ ...formData, location, placeId })
            }
          />

          <DescriptionInput
            value={formData.description || ""}
            onChange={(description) =>
              setFormData({ ...formData, description })
            }
            eventName={formData.name}
            location={formData.location}
            className="min-h-[150px]"
          />

          <EventOptions
            requireApproval={formData.requireApproval}
            onRequireApprovalChange={(value) =>
              setFormData({ ...formData, requireApproval: value })
            }
            capacity={formData.capacity}
            onCapacityChange={(capacity) =>
              setFormData({ ...formData, capacity })
            }
            tickets={formData.tickets}
            onTicketsChange={(tickets) => setFormData({ ...formData, tickets })}
          />

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-white/90 font-semibold"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Event..." : "Create Event"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventForm;

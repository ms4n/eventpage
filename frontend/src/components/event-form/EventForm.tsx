import React, { useState } from "react";
import { EventFormData } from "../../types/event";
import BgColorPicker from "./BgColorPicker";
import DateTimePicker from "./DateTimePicker";
import LocationPicker from "./LocationPicker";
import DescriptionInput from "./DescriptionInput";
import EventOptions from "./EventOptions";
import { Button } from "@/components/ui/button";

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    bgColor: "#FFFFFF",
    isPublic: true,
    requireApproval: false,
    capacity: "unlimited",
    tickets: {
      isFree: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
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
      className="w-full max-w-4xl mx-auto min-h-[600px] flex flex-col px-4"
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
            onChange={(location) => setFormData({ ...formData, location })}
          />

          <DescriptionInput
            value={formData.description}
            onChange={(description) =>
              setFormData({ ...formData, description })
            }
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
            onTicketsChange={(tickets) =>
              setFormData({ ...formData, tickets })
            }
          />

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-white/90 font-semibold"
              size="lg"
            >
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventForm;

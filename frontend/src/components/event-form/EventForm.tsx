import React, { useState } from "react";
import { EventFormData } from "../../types/event";
import BgColorPicker from "./BgColorPicker";
import DateTimePicker from "./DateTimePicker";
import LocationPicker from "./LocationPicker";

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

          <textarea
            placeholder="Add Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 bg-opacity-20 bg-white rounded-lg resize-none h-24"
          />

          <div className="space-y-2 flex-grow">
            <h3 className="font-semibold">Event Options</h3>

            <div className="flex justify-between items-center">
              <span>Tickets</span>
              <div className="flex items-center gap-2">
                <span>Free</span>
                <button type="button" className="text-blue-500">
                  Edit
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>Require Approval</span>
              <input
                type="checkbox"
                checked={formData.requireApproval}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requireApproval: e.target.checked,
                  })
                }
              />
            </div>

            <div className="flex justify-between items-center">
              <span>Capacity</span>
              <div className="flex items-center gap-2">
                <span>Unlimited</span>
                <button type="button" className="text-blue-500">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black rounded-lg font-semibold mt-auto"
          >
            Create Event
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;

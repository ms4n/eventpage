import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimePickerContentProps {
  date: Date;
  onChange: (date: Date) => void;
}

export const TimePickerContent: React.FC<TimePickerContentProps> = ({
  date,
  onChange,
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    const newDate = new Date(date);
    if (type === "hour") {
      newDate.setHours(
        (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
      );
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value));
    } else if (type === "ampm") {
      const currentHours = newDate.getHours();
      newDate.setHours(value === "PM" ? currentHours + 12 : currentHours - 12);
    }
    onChange(newDate);
  };

  return (
    <div className="flex h-[300px] divide-x">
      <ScrollArea className="w-auto">
        <div className="flex flex-col p-2">
          {hours.map((hour) => (
            <button
              key={hour}
              className={`px-3 py-1 rounded-md ${
                date.getHours() % 12 === hour % 12
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
              onClick={() => handleTimeChange("hour", hour.toString())}
            >
              {hour}
            </button>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="w-auto">
        <div className="flex flex-col p-2">
          {minutes.map((minute) => (
            <button
              key={minute}
              className={`px-3 py-1 rounded-md ${
                date.getMinutes() === minute
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
              onClick={() => handleTimeChange("minute", minute.toString())}
            >
              {minute.toString().padStart(2, "0")}
            </button>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col p-2">
        {["AM", "PM"].map((ampm) => (
          <button
            key={ampm}
            className={`px-3 py-1 rounded-md ${
              (ampm === "AM" && date.getHours() < 12) ||
              (ampm === "PM" && date.getHours() >= 12)
                ? "bg-white/20"
                : "hover:bg-white/10"
            }`}
            onClick={() => handleTimeChange("ampm", ampm)}
          >
            {ampm}
          </button>
        ))}
      </div>
    </div>
  );
}; 
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerContent } from "./TimePickerContent";

interface DateTimeButtonProps {
  date: Date;
  onChange: (date: Date) => void;
  type: "date" | "time";
}

export const DateTimeButton: React.FC<DateTimeButtonProps> = ({
  date,
  onChange,
  type,
}) => {
  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  const formatTimeForDisplay = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`flex-1 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15 whitespace-nowrap ${
            type === "date" ? "rounded-r-none mr-1" : "rounded-l-none"
          }`}
        >
          {type === "date"
            ? formatDateForDisplay(date)
            : formatTimeForDisplay(date)}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {type === "date" ? (
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && onChange(date)}
            initialFocus
          />
        ) : (
          <TimePickerContent date={date} onChange={onChange} />
        )}
      </PopoverContent>
    </Popover>
  );
}; 
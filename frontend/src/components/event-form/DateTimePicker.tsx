"use client";

import * as React from "react";
import { DateTimeButton } from "./DateTimeButton";
import { Globe } from "lucide-react";

interface DateTimePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  timezone: string;
  location: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  timezone,
  location,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-1 lg:col-span-2">
        <div className="flex h-full items-start gap-4 rounded-lg bg-white/10 py-1 pl-4 pr-1">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-sm text-white">Start</span>
              </div>
              <div className="flex">
                <DateTimeButton
                  date={startDate}
                  onChange={onStartDateChange}
                  type="date"
                />
                <DateTimeButton
                  date={startDate}
                  onChange={onStartDateChange}
                  type="time"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="text-sm text-white">End</span>
              </div>
              <div className="flex">
                <DateTimeButton
                  date={endDate}
                  onChange={onEndDateChange}
                  type="date"
                />
                <DateTimeButton
                  date={endDate}
                  onChange={onEndDateChange}
                  type="time"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="flex h-full items-center gap-2 text-sm text-white bg-white/10 py-1 px-4 rounded-lg">
          <Globe size={16} className="mb-1" />
          <div className="flex flex-col">
            <span>{timezone}</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;

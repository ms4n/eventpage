import React from "react";
import { Input } from "./../ui/input";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationPickerProps {
  location?: string;
  onChange: (location: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  onChange,
}) => {
  return (
    <div className="relative w-full max-w-3xl">
      <div
        className={cn(
          "absolute inset-0 pointer-events-none flex flex-col justify-center px-3 text-white",
          location && "opacity-0"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-white/70" />
          <span className="text-sm">Add Event Location</span>
        </div>
        <div className="text-xs ml-6 text-white/70">
          Offline location or virtual link
        </div>
      </div>
      <Input
        type="text"
        value={location || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[52px] px-3 bg-white/10 rounded-lg border-0 focus-visible:ring-0 text-sm text-white"
      />
    </div>
  );
};

export default LocationPicker;

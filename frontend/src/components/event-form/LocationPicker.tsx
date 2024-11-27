import React from "react";
import { Input } from "./../ui/input";

interface LocationPickerProps {
  location?: string;
  onChange: (location: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  onChange,
}) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Add Event Location"
        value={location || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 bg-white bg-opacity-20 rounded-lg pl-10"
      />

      <div className="text-sm text-gray-400 mt-1">
        Offline location or virtual link
      </div>
    </div>
  );
};

export default LocationPicker;

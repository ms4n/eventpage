import React, { useCallback, useState } from "react";
import { Input } from "./../ui/input";
import { MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
import debounce from "lodash/debounce";
import { searchPlaces } from "../../services/places.service";
import type { PlaceSuggestion } from "../../services/places.service";

interface LocationPickerProps {
  location?: string;
  onChange: (location: string, placeId?: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  location = "",
  onChange,
}) => {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearchPlaces = useCallback(
    debounce(async (input: string) => {
      if (input.length < 3) return;
      const results = await searchPlaces(input);
      setSuggestions(results);
      setShowSuggestions(true);
    }, 200),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
    debouncedSearchPlaces(value);
  };

  const handleSelectLocation = (suggestion: PlaceSuggestion) => {
    console.log("selected suggestion", suggestion);
    if (suggestion.placePrediction) {
      onChange(
        suggestion.placePrediction.structuredFormat.mainText.text,
        suggestion.placePrediction.placeId
      );
      setShowSuggestions(false);
    }
  };

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
        value={location}
        onChange={handleInputChange}
        className="w-full h-[52px] px-3 bg-white/10 rounded-lg border-0 focus-visible:ring-0 text-sm text-white"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
          {suggestions.map(
            (suggestion) =>
              suggestion.placePrediction && (
                <div
                  key={suggestion.placePrediction.placeId}
                  className="p-3 hover:bg-white/10 cursor-pointer transition-colors"
                  onClick={() => handleSelectLocation(suggestion)}
                >
                  <div className="font-medium text-white">
                    {suggestion.placePrediction.structuredFormat.mainText.text}
                  </div>
                  <div className="text-sm text-white/60">
                    {
                      suggestion.placePrediction.structuredFormat.secondaryText
                        .text
                    }
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default LocationPicker;

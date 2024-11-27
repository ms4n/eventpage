import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

interface BgColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const BgColorPicker: React.FC<BgColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <div
        className="p-4 border rounded-lg flex items-center justify-center"
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: color,
          border: "2px solid rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      ></div>
      {isOpen && (
        <div
          className="absolute left-0 mt-2 z-10 bg-white p-3 rounded-lg shadow-lg"
          style={{ width: "300px" }}
        >
          <HexColorPicker
            color={color}
            onChange={onChange}
            style={{
              width: "100%",
              height: "200px",
            }}
          />
          <HexColorInput
            color={color}
            onChange={onChange}
            className="mt-2 w-full text-gray-800 p-2 rounded border"
            prefixed
          />
        </div>
      )}
    </div>
  );
};

export default BgColorPicker;

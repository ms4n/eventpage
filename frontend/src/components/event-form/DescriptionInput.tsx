import React from "react";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { FileText } from "lucide-react";
import { cn } from "../../lib/utils";

interface DescriptionInputProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value = "",
  onChange,
  className,
}) => {
  return (
    <div className="relative w-full max-w-3xl">
      <div
        className={cn(
          "absolute inset-0 pointer-events-none flex items-center px-3 text-white",
          value && "opacity-0"
        )}
      >
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-white/70" />
          <span className="text-sm">Add Description</span>
        </div>
      </div>
      <AutosizeTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full p-3 bg-white/10 rounded-lg border-0 focus-visible:ring-0 text-sm text-white resize-none",
          className
        )}
        minHeight={10}
        maxHeight={300}
      />
    </div>
  );
};

export default DescriptionInput;

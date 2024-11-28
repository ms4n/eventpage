import React, { useState } from "react";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { FileText, Wand2, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { generateEventDescription } from "../../services/openai.service";
import { useToast } from "../../hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  eventName: string;
  location?: string;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value = "",
  onChange,
  className,
  eventName,
  location = "",
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!eventName || !location) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both event name and location.",
      });
      return;
    }

    try {
      setIsGenerating(true);
      const description = await generateEventDescription(eventName, location);
      onChange(description);
    } catch (error) {
      console.error("Failed to generate description:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate description. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div
        className={cn(
          "absolute inset-0 pointer-events-none flex items-center px-3 text-white",
          value && "opacity-0"
        )}
      >
        <div className="flex items-center gap-2">
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 text-white/70 animate-spin" />
              <span className="text-sm">Generating description...</span>
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 text-white/70" />
              <span className="text-sm">Add Description</span>
            </>
          )}
        </div>
      </div>
      <div className="relative">
        <AutosizeTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full p-3 bg-white/10 rounded-lg border-0 focus-visible:ring-0 text-sm text-white resize-none pr-10",
            className
          )}
          minHeight={10}
          maxHeight={300}
          placeholder=""
        />
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleGenerate}
                className={cn(
                  "absolute right-2 top-2 p-2 rounded-md hover:bg-white/10 transition-colors",
                  isGenerating && "animate-pulse",
                  (!eventName || !location) && "opacity-50"
                )}
              >
                <Wand2 className="h-4 w-4 text-white/70" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate AI description</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DescriptionInput;

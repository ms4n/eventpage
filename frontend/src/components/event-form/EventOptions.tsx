import React from "react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Ticket, Users2, ChevronRight } from "lucide-react";

interface EventOptionsProps {
  requireApproval: boolean;
  onRequireApprovalChange: (value: boolean) => void;
  capacity: number | "unlimited";
  tickets: {
    isFree: boolean;
  };
}

const EventOptions: React.FC<EventOptionsProps> = ({
  requireApproval,
  onRequireApprovalChange,
  capacity,
  tickets,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white">Event Options</h3>

      <div className="relative w-full max-w-3xl bg-white/10 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center h-10 px-4">
          <div className="flex items-center gap-3">
            <Ticket className="h-4 w-4 text-white/70" />
            <span className="text-sm text-white">Tickets</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">{tickets.isFree ? "Free" : "Paid"}</span>
            <ChevronRight className="h-4 w-4 text-white/70" />
          </div>
        </div>

        <Separator className="bg-white/[0.08] mx-4" />

        <div className="flex justify-between items-center h-10 px-4">
          <div className="flex items-center gap-3">
            <Users2 className="h-4 w-4 text-white/70" />
            <span className="text-sm text-white">Require Approval</span>
          </div>
          <Switch
            checked={requireApproval}
            onCheckedChange={onRequireApprovalChange}
            className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/20"
          />
        </div>

        <Separator className="bg-white/[0.08] mx-4" />

        <div className="flex justify-between items-center h-10 px-4">
          <div className="flex items-center gap-3">
            <Users2 className="h-4 w-4 text-white/70" />
            <span className="text-sm text-white">Capacity</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">{capacity}</span>
            <ChevronRight className="h-4 w-4 text-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOptions; 
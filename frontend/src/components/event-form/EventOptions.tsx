import React from "react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Ticket, Users2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface EventOptionsProps {
  requireApproval: boolean;
  onRequireApprovalChange: (value: boolean) => void;
  capacity: string;
  onCapacityChange: (value: string) => void;
  tickets: {
    isFree: boolean;
    price?: number;
  };
  onTicketsChange: (tickets: { isFree: boolean; price?: number }) => void;
}

const EventOptions: React.FC<EventOptionsProps> = ({
  requireApproval,
  onRequireApprovalChange,
  capacity,
  onCapacityChange,
  tickets,
  onTicketsChange,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-white">Event Options</h3>

      <div className="relative w-full max-w-3xl bg-white/10 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center h-10 px-4">
          <div className="flex items-center gap-3">
            <Ticket className="h-4 w-4 text-white/70" />
            <span className="text-sm text-white">Tickets</span>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={tickets.isFree ? "free" : "paid"}
              onValueChange={(value) =>
                onTicketsChange({
                  isFree: value === "free",
                  price: value === "paid" ? tickets.price || 0 : undefined,
                })
              }
            >
              <SelectTrigger className="h-7 bg-transparent border-none text-sm text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            {!tickets.isFree && (
              <Input
                type="number"
                min="0"
                placeholder="Price"
                value={tickets.price || ""}
                onChange={(e) =>
                  onTicketsChange({
                    isFree: false,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="h-7 w-20 bg-transparent border-none text-sm text-white placeholder:text-white/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-white focus-visible:ring-offset-0"
              />
            )}
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
            <Select
              value={capacity === "unlimited" ? "unlimited" : "limited"}
              onValueChange={(value) =>
                onCapacityChange(value === "unlimited" ? "unlimited" : "0")
              }
            >
              <SelectTrigger className="h-7 bg-transparent border-none text-sm text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unlimited">Unlimited</SelectItem>
                <SelectItem value="limited">Limited</SelectItem>
              </SelectContent>
            </Select>
            {capacity !== "unlimited" && (
              <Input
                type="number"
                min="1"
                value={capacity}
                onChange={(e) => onCapacityChange(e.target.value)}
                className="h-7 w-20 bg-transparent border-none text-sm text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-white focus-visible:ring-offset-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOptions;

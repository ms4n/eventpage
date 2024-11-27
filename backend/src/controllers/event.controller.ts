import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { CreateEventDTO } from "../types/event";

export class EventController {
  async createEvent(req: Request<{}, {}, CreateEventDTO>, res: Response) {
    try {
      const eventData = req.body;

      const { data: event, error: eventError } = await supabase
        .from("events")
        .insert({
          name: eventData.name,
          description: eventData.description,
          start_date: eventData.startDate,
          end_date: eventData.endDate,
          bg_color: eventData.bgColor,
          is_public: eventData.isPublic,
          require_approval: eventData.requireApproval,
          capacity: eventData.capacity,
          location: eventData.location,
        })
        .select()
        .single();

      if (eventError) throw eventError;

      const { error: ticketError } = await supabase
        .from("event_tickets")
        .insert({
          event_id: event.id,
          is_free: eventData.tickets.isFree,
          price: eventData.tickets.price,
        });

      if (ticketError) throw ticketError;

      return res.status(201).json({
        message: "Event created successfully",
        data: event,
      });
    } catch (error) {
      console.error("Error creating event:", error);
      return res.status(500).json({
        message: "Failed to create event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

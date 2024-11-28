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

      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      return res.status(500).json({
        message: "Failed to create event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getEvents(req: Request, res: Response) {
    try {
      const { data: events, error } = await supabase
        .from("events")
        .select(
          `
          *,
          tickets:event_tickets(*)
        `
        )
        .order("start_date", { ascending: true });

      if (error) throw error;

      return res.status(200).json({
        data: events,
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({
        message: "Failed to fetch events",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getEvent(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const { data: event, error } = await supabase
        .from("events")
        .select(
          `
          *,
          tickets:event_tickets(*)
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!event) {
        return res.status(404).json({
          message: "Event not found",
        });
      }

      return res.status(200).json({
        data: event,
      });
    } catch (error) {
      console.error("Error fetching event:", error);
      return res.status(500).json({
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async updateEvent(
    req: Request<{ id: string }, {}, Partial<CreateEventDTO>>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const { data: event, error: eventError } = await supabase
        .from("events")
        .update({
          name: updateData.name,
          description: updateData.description,
          start_date: updateData.startDate,
          end_date: updateData.endDate,
          bg_color: updateData.bgColor,
          is_public: updateData.isPublic,
          require_approval: updateData.requireApproval,
          capacity: updateData.capacity,
          location: updateData.location,
        })
        .eq("id", id)
        .select()
        .single();

      if (eventError) throw eventError;

      if (updateData.tickets) {
        const { error: ticketError } = await supabase
          .from("event_tickets")
          .update({
            is_free: updateData.tickets.isFree,
            price: updateData.tickets.price,
          })
          .eq("event_id", id);

        if (ticketError) throw ticketError;
      }

      return res.status(200).json({
        message: "Event updated successfully",
        data: event,
      });
    } catch (error) {
      console.error("Error updating event:", error);
      return res.status(500).json({
        message: "Failed to update event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async deleteEvent(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) throw error;

      return res.status(200).json({
        message: "Event deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      return res.status(500).json({
        message: "Failed to delete event",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

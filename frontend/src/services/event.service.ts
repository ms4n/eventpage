import env from "../config/env";
import { EventFormData } from "../types/event";

export const createEvent = async (eventData: EventFormData) => {
  try {
    const response = await fetch(`${env.API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: eventData.name,
        description: eventData.description,
        startDate: eventData.startDate.toISOString(),
        endDate: eventData.endDate.toISOString(),
        bgColor: eventData.bgColor,
        isPublic: eventData.isPublic,
        requireApproval: eventData.requireApproval,
        capacity: eventData.capacity,
        location: eventData.location,
        tickets: {
          isFree: eventData.tickets.isFree,
          price: eventData.tickets.price,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Validation errors:", errorData);
      throw new Error(
        errorData.issues?.[0]?.message || "Failed to create event"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

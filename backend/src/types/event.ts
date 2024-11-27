import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  bgColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  isPublic: z.boolean(),
  requireApproval: z.boolean(),
  capacity: z.string(),
  description: z.string().optional(),
  location: z.string().optional(),
  tickets: z.object({
    isFree: z.boolean(),
    price: z.number().optional(),
  }),
});

export type CreateEventDTO = z.infer<typeof createEventSchema>;

export interface Event extends CreateEventDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
}

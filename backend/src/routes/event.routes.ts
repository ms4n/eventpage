import { Router, RequestHandler } from "express";
import { EventController } from "../controllers/event.controller";
import { validate } from "../middleware/validate";
import { createEventSchema } from "../types/event";

const router = Router();
const eventController = new EventController();

router.post(
  "/events",
  validate(createEventSchema),
  eventController.createEvent.bind(eventController) as unknown as RequestHandler
);

router.get(
  "/events",
  eventController.getEvents.bind(eventController) as unknown as RequestHandler
);

router.get(
  "/events/:id",
  eventController.getEvent.bind(eventController) as unknown as RequestHandler
);

router.patch(
  "/events/:id",
  eventController.updateEvent.bind(eventController) as unknown as RequestHandler
);

router.delete(
  "/events/:id",
  eventController.deleteEvent.bind(eventController) as unknown as RequestHandler
);

export default router;

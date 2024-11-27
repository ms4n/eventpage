import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { validate } from "../middleware/validate";
import { createEventSchema } from "../types/event";

const router = Router();
const eventController = new EventController();

router.post(
  "/events",
  validate(createEventSchema),
  eventController.createEvent.bind(eventController)
);

export default router;

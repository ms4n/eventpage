import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event.routes";
import placesRoutes from './routes/places.routes';
import openaiRoutes from './routes/openai.routes';
import { errorHandler } from "./middleware/error";
import { ErrorRequestHandler } from "express";

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"]; // Default fallback

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        allowedOrigins.includes("*")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", eventRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/openai', openaiRoutes);

app.use(errorHandler as unknown as ErrorRequestHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", eventRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

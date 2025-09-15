import express from "express";
import cors from "cors";
import replayRoutes from "./Routes/replays.js";

const app = express();
const PORT = 8800;

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cors());

app.use("/", replayRoutes);

app.listen(PORT, () => {
  console.log(`Connected to backend on port ${PORT}.`);
});
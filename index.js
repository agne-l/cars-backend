import express from "express";
import cors from "cors";
import "dotenv/config";
import carRouter from "./routes/car.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(carRouter);

app.use((req, res) => {
  return res.status(404).json({ response: `Endpoint does not exist.` });
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`APP started on port ${process.env.PORT}`);
});

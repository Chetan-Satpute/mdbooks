import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import APIRouter from "./api.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", APIRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

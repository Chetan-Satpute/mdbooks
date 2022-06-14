import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import { MongoClient } from "mongodb";

import Book from './DAO/Book.js';

import APIRouter from "./api.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", APIRouter);

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI);

async function run() {
  try {
    // Connect to database
    await client.connect();

    Book.initiate(client);

    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });

  } catch (err) {
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run();


import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./models/db.js"; // Import the pool

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;


  app.get("/", (_, res) => {
    res.send("Event Management API is running");
  });



  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
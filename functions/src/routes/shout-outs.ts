import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getClient } from "../db";
import ShoutOuts from "../models/ShoutOuts";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<ShoutOuts>("shoutOuts")
      .find()
      .toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/", async (req, res) => {
  const post = req.body as ShoutOuts;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<ShoutOuts>("shoutOuts")
      .insertOne(post);
    post._id = result.insertedId;
    res.status(201).json(post);
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default functions.https.onRequest(app);
import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getClient } from "../db";
import ShoutOuts from "../models/ShoutOuts";
import { ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const to = req.query.to;
  const mongoQuery: any = {};
  if (to) {
    mongoQuery.to = to;
  }
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<ShoutOuts>("shoutOuts")
      .find(mongoQuery)
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

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client.db().collection<ShoutOuts>("shoutOuts").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({message: "Not Found"});
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});

export default functions.https.onRequest(app);
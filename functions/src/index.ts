// const SneaksAPI = require("sneaks-api");
const functions = require("firebase-functions");
const fs = require("fs");
const cors = require("cors");
const express = require("express");
// const sneaks = new SneaksAPI();

const app = express();

app.use(express.json());
app.use(cors());

const getShoes = () => JSON.parse(fs.readFileSync("./data/shoes.json"));

app.get("/shoes", (_req: any, res: any) => {
  const shoes = getShoes();

  if (shoes.length === 0) {
    res.status(400).send("No shoes");
    return;
  }
  res.status(200).json(shoes);
});

exports.app = functions.https.onRequest(app);

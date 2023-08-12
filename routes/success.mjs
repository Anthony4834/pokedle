import express from "express";
import db from "../db/conn.mjs";
import Success from "../model/success.mjs";

const router = express.Router();

router.get('/all', async(req, res) => res.send({"hello": "world!!"}).status(200));
router.get('/', async(req, res) => {
  const collection = await db.collection('success');
  const { by } = req.body;

  const result = await collection.find({
    ...by
  })

  res.send(result).status(200);
});

router.get('/today', async(req, res) => {
  const collection = await db.collection('success');
  const todayDate = new Date();

  const records = await collection.find().toArray();

  const today = records.filter((rec) => {
    const recDate = new Date(rec['createdAt']);

    return todayDate.getDate() == recDate.getDate() && todayDate.getMonth() == recDate.getMonth() && todayDate.getFullYear() == recDate.getFullYear();
  });

  res.send(today).status(200);
});

router.post('/', async (req, res) => {
    
    let successCollection = await db.collection("success");

    let success = new Success({
      playerKey: req.body['playerKey'],
      attempts: req.body['attempts'],
      gameMode: req.body['gameMode'],
    });

    const duplicateKey = await successCollection.findOne({
      playerKey: success.playerKey,
      gameMode: success.gameMode
    });
    const exists = !!duplicateKey;
    if(exists) {
      res.send({
        error: `Player ${success.playerKey} already has a successful attempt today for gamemode ${success.gameMode}`
      }).status(400);

      return;
    }

    let result = await successCollection.insertOne(success);
    res.send({result: result, entry: entry}).status(200);
  });

export default router;
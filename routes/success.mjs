import express from "express";
import db from "../db/conn.mjs";
import Player from "../model/player.mjs";
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
    let playerCollection = await db.collection('players');
    
    let player = await playerCollection.findOne({
      playerKey: req.body['playerKey']
    })
    if(!player) {
      await playerCollection.insertOne({playerKey: req.body['playerKey']});
      player = await playerCollection.findOne({
        playerKey: req.body['playerKey']
      });
    }
    let playerObject = new Player(player);

    let success = new Success({
      playerKey: playerObject.playerKey,
      attempts: req.body['attempts'],
      gameMode: req.body['gameMode'],
      createdAt: new Date()
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
 
    playerObject.history.push(success); 
    await playerCollection.replaceOne({playerKey: playerObject.playerKey}, playerObject);

    let result = await successCollection.insertOne(success);
    res.send(result).status(200);
  });

export default router;
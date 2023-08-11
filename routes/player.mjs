import express from "express";
import db from "../db/conn.mjs";
import Player from "../model/player.mjs";

const router = express.Router();

router.get('/', async(req, res) => res.send({"hello": "world"}).status(200));
router.get("/:playerKey", async (req, res) => {
    let collection = await db.collection("players");
    let query = {playerKey: req.params.playerKey};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });
router.post('/', async (req, res) => {
    if(!(req.body || !req.body['playerKey'])) res.send('No body').status(400);
    let collection = await db.collection("players");
    
    let player = new Player({
        playerKey: req.body['playerKey'],
        history: req.body['history']
    });

    let duplicateKey = await collection.findOne({
        playerKey: player.playerKey
    });
    let exists = !!duplicateKey;

    if(exists) {
        res.send({error: `playerKey ${player.playerKey} already exists`});
        return;
    }

    let result = await collection.insertOne(player);
    res.send(result).status(204);
  });

export default router;
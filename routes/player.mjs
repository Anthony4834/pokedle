import express from "express";
import db from "../db/conn.mjs";
import Player from "../model/player.mjs";

const router = express.Router();

router.get('/', async(req, res) => res.send({"hello": "world!!"}).status(200));
router.get("player-key/:playerKey", async (req, res) => {
    let collection = await db.collection("players");
    let query = {playerKey: req.params.playerKey};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });
router.get('/new', async (req, res) => {
  const { startDate, endDate } = req.query
  console.log(req.query)
  let collection = await db.collection("players");
  
  const players = await collection.find().toArray();

  const result = players.filter(player => {
    const playerCreatedAtTime = new Date(player.createdAt).getTime();
    const startDateTime = startDate ? new Date(startDate).getTime() : new Date('1980-01-01');
    const endDateTime = endDate ? new Date(endDate).getTime() : new Date().getTime();

    return playerCreatedAtTime >= startDateTime && playerCreatedAtTime <= endDateTime;
  })

  res.send({
    data: result.length
  })
  
})
router.post('/', async (req, res) => {
    if(!(req.body || !req.body['playerKey'])) res.send('No body').status(400);
    let collection = await db.collection("players");
    

    try {
        let player = new Player({
          playerKey: req.body['playerKey'],
        });
        
        let duplicateKey = await collection.findOne({
            playerKey: player.playerKey
        });
        let exists = !!duplicateKey;

        if(exists) {
            res.send({error: `playerKey ${player.playerKey} already exists`}).status(400);
            return;
        }

        let result = await collection.insertOne(player);
        res.send({result: result, entry: player}).status(204);
        console.log({
          message: 'New player',
          player: player.toJson()
        })
      } catch(exception) {
        console.error('Unexpected error: ', exception);
      }
    
  });

export default router;
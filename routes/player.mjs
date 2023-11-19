import express from "express";
import db from "../db/conn.mjs";
import Player from "../model/player.mjs";

const router = express.Router();
function getRecordsByDay(data, startDate, endDate) {
  const dailyRecords = new Map();

  function getFormattedDate(date) {
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const daysBetween = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)

  let currentDate = new Date(startDate);
  for (let i = 0; i < daysBetween; i++) {
    const currentDay = getFormattedDate(currentDate);

    const recordsForDay = data.filter(entry => {
      const createdAt = new Date(entry.createdAt);

      return createdAt.getFullYear() === currentDate.getFullYear() && createdAt.getMonth() === currentDate.getMonth() && createdAt.getDate() === currentDate.getDate();
    });

    dailyRecords.set(currentDay, recordsForDay.length);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  const result = Array.from(dailyRecords.entries()).map(([date, count]) => [date, count]);

  return result;
}

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

  const result = getRecordsByDay(players, new Date(startDate), endDate ? new Date(endDate) : new Date());

  res.send({
    data: result
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
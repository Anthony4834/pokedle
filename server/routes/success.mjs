import express from "express";
import db from "../db/conn.mjs";
import Success from "../model/success.mjs";


const router = express.Router();
const getGameModePlayCounts = (data) => {
  let output = {};
  let highest = {
    gameMode: undefined,
    timesPlayed: 0
  }

  data.forEach((item) => {
    if(!output[item.gameMode]) {
      output[item.gameMode] = 0;
    }

    output[item.gameMode] = output[item.gameMode] + 1;
    if(output[item.gameMode] > highest.timesPlayed) {
      highest = {
        gameMode: item.gameMode,
        timesPlayed: output[item.gameMode]
      }
    }
  })

  return [output, highest];
}

const getAverageAttempts = (data) => {
  let total = 0;
  data.forEach(item => {
    total += item.attempts;
  })

  return Math.floor(total / data.length);

}

const getUniquePlayers = (data) => {
  const unique = new Set([]);

  data.forEach(item => {
    unique.add(item.playerKey);
  })

  return unique.size;
}
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

router.get('/stats', async (req, res) => {
  const { startDate, endDate } = req.query
  let collection = await db.collection("success");
  
  const wins = await collection.find().toArray();
  
  const newWins = wins.filter(win => {
    const winCreatedAtTime = new Date(win.createdAt).getTime();
    const startDateTime = startDate ? new Date(startDate).getTime() : new Date('1980-01-01').getTime();
    const endDateTime = endDate ? new Date(endDate).getTime() : new Date().getTime();

    return winCreatedAtTime >= startDateTime && winCreatedAtTime <= endDateTime;
  })

  const [totalGameModePlayCounts, totalMostPlayed] = getGameModePlayCounts(wins);
  const [windowGameModePlayCounts, windowMostPlayed] = getGameModePlayCounts(newWins);
  const totalAverageAttempts = getAverageAttempts(wins);
  const windowAverageAttempts = getAverageAttempts(newWins);
  const uniquePlayers = getUniquePlayers(newWins);

  res.send({
    totalPlays: wins.length,
    windowPlays: newWins.length,
    totalGameModePlayCounts,
    totalMostPlayed,
    windowGameModePlayCounts,
    windowMostPlayed,
    totalAverageAttempts,
    windowAverageAttempts,
    uniquePlayers
  })
  
})

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
    res.send({result: result, entry: success}).status(200);
  });

export default router;
import express from "express";
import db from "../db/conn.mjs";

export const dateAsKey = (date) => {
    return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
} 
const router = express.Router();
const pickRandomFromArray = (array) => {
    const rand = Math.floor(Math.random() * array.length);

    return array[rand];
}
const increment = async (by) => {
    const collection = db.collection('tiktok');
    const res = await collection.findOne({
        isCounter: true,
    })

    console.log(res);

    collection.updateOne({
        _id: res._id
    }, {
        $set: { count: res.count + by }
    })
}
router.get('/', async(req, res) => {
    const collection = db.collection('tiktok');
    console.log({
        date: new Date(),
        formatted: dateAsKey(new Date())
    })
    const result = await collection.find().toArray();
    res.send(result).status(200)
});

const purgeOldRecords = async () => {
    const collection = db.collection('tiktok');
    const fiveMinAgo = new Date();
    fiveMinAgo.setMinutes(fiveMinAgo.getMinutes() - 2)
    await collection.deleteMany({
        createdAt: {
            $lte: fiveMinAgo
        } 
    })
}

router.get('/fiveMin', async(req, res) => {
    const collection = db.collection('tiktok');
    getRecentCount();
    
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5);

    console.log({
        old: now,
        new: new Date(),
        time: now < new Date(),
    });

    const result = await collection.findOne({
        date: dateAsKey(new Date()),
        gameMode: req.params.gameMode
    })

    res.send(false)

    // const result = await collection.findOne({
    //     date: dateAsKey(new Date()),
    //     gameMode: req.params.gameMode
    // })
    // res.send(result).status(200)
});
router.post('/', async(req, res) => {
    const collection = db.collection('tiktok');
    let names = req.body['names'];
    if(!req.body || !req.body['names'] || !Array.isArray(names)) {
        res.send(false);
        return;
    }

    await purgeOldRecords();

    let alreadyIn = await collection.find().toArray();
    alreadyIn = new Set(alreadyIn.length > 0 ? alreadyIn.map(record => record['name']) : [])

    if(!names || names.length === 0) {
        res.send(false)
        return;
    }
    console.log({
        names: names
    });
    //filter dupes
    names = names.filter((name) => name && !alreadyIn.has(name));
    //create objects
    names = names.map((name) => ({
        name: name,
        createdAt: new Date(),
    }));

    if(names.length === 0) {
        res.send(false);
        return
    }
    collection.insertMany([
        ...names
    ])

    await increment(names.length);
    res.send(true);
});
export default router;
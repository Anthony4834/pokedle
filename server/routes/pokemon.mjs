import express from "express";
import request from "request";
import db from "../db/conn.mjs";

export const dateAsKey = (date) => {
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
} 
const router = express.Router();
const pickRandomFromArray = (array) => {
    const rand = Math.floor(Math.random() * array.length);

    return array[rand];
}

router.get('/', async(req, res) => {
    const collection = db.collection('pokemon');
    
    const result = await collection.findOne({
        date: dateAsKey(new Date()),
        gameMode: 'GENERATION_1_2_3'
    })
    res.send(result).status(200)
});
router.get('/:gameMode', async(req, res) => {
    const collection = db.collection('pokemon');

    const date = dateAsKey(new Date());
    console.log(new Date())

    console.log({
        date
    })
    const result = await collection.findOne({
        date,
        gameMode: req.params.gameMode
    })
    res.send(result).status(200)
});
router.post('/', async(req, res) => {
    const secretFromReq = req.headers['authorization'];
    const { CHOOSE_POKEMON_SECRET: secretActual } = process.env;

    if(secretFromReq !== `Bearer ${secretActual}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const collection = db.collection('pokemon');
    await request('https://pokeapi.co/api/v2/pokemon?limit=386', async function (error, response, body) {
       if (!error && response.statusCode == 200) {
        let obj = JSON.parse(body);
        let arr = obj['results'].map((obj) => obj['name']);
        arr = arr.filter((name) => !(name.includes('-')));
        arr.push('deoxys');

        const gens = {
            1: arr.slice(0, 148),
            2: arr.slice(148, 247),
            3: arr.slice(248, arr.length)
        }
        await pickPokemonForAllGameModes(collection, gens)
        res.send({}).status(200);
       }
    });
});
const pickPokemonForGameMode = async (gamemode,  arr, collection) => {
    const pokemonPicked = pickRandomFromArray(arr);

    await collection.insertOne({
        date: dateAsKey(new Date()),
        pokemon: pokemonPicked,
        gameMode: gamemode
    })
}
const gameModeToString = (gameMode) => {
    let output = "GENERATION";
    for(let gen of gameMode) {
        output += `_${gen}`;
    }
    return output;
}
const pickPokemonForAllGameModes = async (collection, gens) => {
    const gameModes = [
        [1],
        [1,2],
        [1,3],
        [1,2,3],
        [2],
        [2,3],
        [3]
    ]

    console.log('Choosing new pokemon..')
    try {
        for(let gameMode of gameModes) {
            console.log(`${gameMode}..`)
            let gensArr = [];
            for(let gen of gameMode) {
                console.log()
                gensArr = [...gensArr, ...gens[String(gen)]];
            }
    
            await pickPokemonForGameMode(gameModeToString(gameMode), gensArr, collection);
    
            console.log(`${gameMode}.. DONE`)
        }
    
        console.log('SUCCESS');
    } catch(exception) {
        console.log('FAIL', exception);
    }

}

export default router;
import cors from "cors";
import express from "express";
import cron from 'node-cron';
import request from "request";
import "./loadEnvironment.mjs";
import players from './routes/player.mjs';
import pokemon from './routes/pokemon.mjs';
import success from './routes/success.mjs';


const PORT = process.env.PORT || 5050;
export const BASE_QUERY = 'https://ill-gold-shark-wig.cyclic.app';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/players", players);
app.use("/success", success);
app.use('/pokemon', pokemon);

players.get('/', async (req, res) => {
  console.log(res);
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

cron.schedule("34 17 * * *", function() {
            // API call goes here
    console.log("running a task every minute");
    request.post(BASE_QUERY + '/pokemon', function (error, response, body) {
       if (!error && response.statusCode == 200) {
          console.log(body) // Print the google web page.
       }
    })
    
})
import cors from "cors";
import express from "express";
import "./loadEnvironment.mjs";
import players from './routes/player.mjs';
import pokemon from './routes/pokemon.mjs';
import success from './routes/success.mjs';
import tiktok from './routes/tiktok.mjs';

// Assuming that you have your environment variables loaded here
export const BASE_QUERY = 'https://pokedle-lyart.vercel.app';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/players", players);
app.use("/success", success);
app.use('/pokemon', pokemon);
app.use('/tiktok', tiktok);

// Export the app as a function to be used by Vercel
export default app;

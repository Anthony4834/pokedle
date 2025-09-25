import axios from "axios";
import { BASE_QUERY } from "./server.mjs";

export default async function selectDailyPokemon(req, res) {
  try {
    const response = await axios.post(`${BASE_QUERY}/pokemon/cron`);
    res.status(200).send({ message: "Done", response: response.data });
  } catch (error) {
    console.error("Cron job error:", error.message);
    res.status(503).send({ error: error.message });
  }
}

import { BASE_QUERY } from "./server.mjs";

export default async function selectDailyPokemon(req, res) {
    return await request.post(`${BASE_QUERY}/pokemon`,  async function (error, response, body) {
        if(error) {
            res.status(503).send({error});
            return;
        }

        return res.status(200).send({message: "Done", response})
    })
}
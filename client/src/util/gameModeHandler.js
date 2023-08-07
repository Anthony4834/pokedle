import pokeDataGen1 from '../static/pokeData/gen_1.json'
import pokeDataGen2 from '../static/pokeData/gen_2.json'
import pokeDataGen3 from '../static/pokeData/gen_3.json'

const getPokeDataByGen = gen => {
    switch (gen) {
        case 1:
            return pokeDataGen1
        case 2:
            return pokeDataGen2
        case 3:
            return pokeDataGen3
        default:
            return null
    }
}
export const getGameModeInformation = forGens => {
    let pokeData = {}
    let gensString = ''
    for (let gen of forGens) {
        let genPokeData = getPokeDataByGen(gen)
        if (!genPokeData) continue

        pokeData = {
            ...pokeData,
            ...genPokeData,
        }
        gensString += gensString.length < 1 ? gen : `_${gen}`
    }

    return {
        pokeData: pokeData,
        gen: gensString,
    }
}

import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import Util from '../utl'

import './answerEntry.css'

const AnswerEntry = ({
    pokemon,
    pokeData,
    pokemonToGuess,
    isSynchronized,
    setIsSynchronized,
    entriesBoxRef,
    metric,
    mobile,
    getMetric,
    util,
}) => {
    const [entryDetails, setEntryDetails] = useState(null)
    const [detailKeys, setDetailKeys] = useState([])
    const [pokemonImage, setPokemonImage] = useState('bulbasaur')
    const [isMetric, setIsMetric] = useState(false)

    useEffect(() => {
        setEntryDetails(util.formatEntryDetails(pokemon, metric))
        updateKeys(pokemon)
        fetchPokemonImage(pokemon)
        setIsMetric(metric)
    }, [isSynchronized, metric])

    useEffect(() => {
        setIsSynchronized(!isSynchronized)
    }, [])

    const fetchPokemonImage = pokemon => {
        setPokemonImage(
            require('../../static/pokeSprites/' +
                pokeData[pokemon]['ID'] +
                '.png'),
        )
    }

    const updateKeys = pokemonName => {
        let tempObj = { ...pokeData[pokemonName] }
        let keys = Object.keys(tempObj)

        for (let index in keys) {
            let key = keys[index]
            if (key != 'ID' && !detailKeys.includes(key)) detailKeys.push(key)
        }
    }

    return (
        <>
            {entryDetails && (
                <div className='answerEntryWrapper'>
                    <img
                        className='answerEntryDetail pokeImg'
                        alt={pokemon}
                        src={pokemonImage}
                        id={pokemon}
                    ></img>
                    {detailKeys &&
                        detailKeys.map(detail => (
                            <div
                                className={
                                    'answerEntryDetail ' +
                                    util.getBackgroundClass(
                                        pokemon,
                                        detail,
                                        pokemonToGuess,
                                        entryDetails,
                                        metric,
                                    )
                                }
                                id={uuid()}
                            >
                                {entryDetails[detail]}
                            </div>
                        ))}
                    <div
                        className={
                            'answerEntryDetail ' +
                            util.getBackgroundClass(
                                pokemon,
                                'evolution',
                                pokemonToGuess,
                                entryDetails,
                                metric,
                            ) +
                            ' evoDetail'
                        }
                    >
                        {util.getEvoDetails(pokemon).split('BREAK').join('\n')}
                    </div>
                    {!mobile && <div className='answerEntryDetail'></div>}
                </div>
            )}
        </>
    )
}

export default AnswerEntry

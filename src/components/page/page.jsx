import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import AnswersBox from '../answersBox/answersBox'
import { GameControls } from '../gameControls/gameControls'
import Util from '../utl'
import VictoryScreen from '../victoryScreen/victoryScreen'
import { handleAlreadyGuessedArray, init } from './cookieManager'
import { Loading } from './loading'

export const BASE_QUERY = 'https://defiant-bass-glasses.cyclic.app/';
// export const BASE_QUERY = 'http://localhost:5050/'
export const Page = ({ pokeData, gen, metric, updateMetric, mobile }) => {
    const [pokemonToGuess, setPokemonToGuess] = useState('')
    const [alreadyGuessed, setAlreadyGuessed] = useState([])
    const [isSynchronized, setIsSynchronized] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const util = useMemo(() => new Util(mobile, pokeData), [mobile, pokeData])

    useEffect(() => {
        axios.get(`${BASE_QUERY}pokemon/GENERATION_${gen}`).then(({ data }) => {
            setPokemonToGuess(data['pokemon'])
        })
        init(gen, setAlreadyGuessed)
    }, [gen])

    useEffect(() => {
        handleAlreadyGuessedArray(gen, util, alreadyGuessed, setGameOver)
    }, [alreadyGuessed, alreadyGuessed.length, gen, isSynchronized, util])
    const getAlreadyGuessed = () => {
        return alreadyGuessed
    }
    const props = {
        gameOver: gameOver,
        pokeData: pokeData,
        pokemonToGuess: pokemonToGuess,
        alreadyGuessed: alreadyGuessed,
        getAlreadyGuessed: getAlreadyGuessed,
        util: util,
        mobile: mobile,
        isSynchronized: isSynchronized,
        setIsSynchronized: setIsSynchronized,
        gen: gen,
        metric: metric,
        updateMetric: updateMetric,
    }
    return pokemonToGuess ? (
        <div className={`pageWrapper`}>
            <GameControls {...props} />
            <VictoryScreen {...props} />
            <AnswersBox {...props} />
        </div>
    ) : (
        <Loading />
    )
}

import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import AnswersBox from '../answersBox/answersBox'
import PokeSelectMenu from '../pokeSelectMenu/pokeSelectMenu'
import Util from '../utl'
import VictoryScreen from '../victoryScreen/victoryScreen'

export const Page = ({ pokeData, gen, metric, updateMetric, mobile }) => {
    const [pokemonToGuess, setPokemonToGuess] = useState('')
    const [alreadyGuessed, setAlreadyGuessed] = useState([])
    const [isSynchronized, setIsSynchronized] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const util = new Util(mobile, pokeData)

    useEffect(() => {
        pickRandomPokemon()

        if (getCookie('initialized') == false) {
            setCookie('initialized', true)
            setCookie('correct_answer_guessed', false)
            setCookie('already_guessed_arr', '')
        } else {
            if (
                getCookie('already_guessed_arr') &&
                getCookie('already_guessed_arr').length > 0
            )
                setAlreadyGuessed(getCookie('already_guessed_arr').split(','))
        }
    }, [])

    useEffect(() => {
        let alreadyGuessedFromCookies = getCookie('already_guessed_arr')
        let alreadyGuessedLocal = util.removeBrackets(alreadyGuessed)

        if (
            alreadyGuessedLocal.replace(/ /g, '').length >
            alreadyGuessedFromCookies.length
        ) {
            console.log('updating cookies')
            setCookie('already_guessed_arr', alreadyGuessedLocal)
        }

        if (getCookie('correct_answer_guessed') == 'true') {
            setGameOver(true)
            scroll.scrollToTop()
        } else {
            setGameOver(false)
        }
    }, [alreadyGuessed.length, isSynchronized])

    const pickRandomPokemon = () => {
        // setPokemonToGuess("electabuzz");
        // return;
        let pokemonNames = Object.keys(pokeData)
        let selectedPokemon =
            pokemonNames[Math.floor(Math.random() * pokemonNames.length)]
        console.log('------->', selectedPokemon)
        setPokemonToGuess(selectedPokemon)
    }

    const getAlreadyGuessed = () => {
        return alreadyGuessed
    }

    const getCookie = cookieName => {
        if (!document.cookie || document.cookie.length < 1) return false
        let cookieArr = document.cookie.split(';')
        let cookieIndex
        cookieName = `GENERATION_${gen}_${cookieName}`

        for (let index in cookieArr) {
            if (cookieArr[index].includes(cookieName)) cookieIndex = index
        }

        if (!cookieIndex) return false
        return cookieArr[cookieIndex].split('=')[1]
    }

    const setCookie = (key, value) => {
        document.cookie = `GENERATION_${gen}_${key}=${value}; path=/`
    }
    return (
        <>
            {/* <p>{pokemonToGuess}</p> */}

            {!gameOver && (
                <PokeSelectMenu
                    pokeData={pokeData}
                    pokemonToGuess={pokemonToGuess}
                    alreadyGuessed={alreadyGuessed}
                    setIsSynchronized={setIsSynchronized}
                    isSynchronized={isSynchronized}
                    cookieMgr={{ getCookie, setCookie }}
                />
            )}
            {gameOver && (
                <VictoryScreen
                    pokeData={pokeData}
                    pokemonToGuess={pokemonToGuess}
                    cookieMgr={{ getCookie, setCookie }}
                ></VictoryScreen>
            )}
            {
                <AnswersBox
                    getAlreadyGuessed={getAlreadyGuessed}
                    pokeData={pokeData}
                    pokemonToGuess={pokemonToGuess}
                    isSynchronized={isSynchronized}
                    setIsSynchronized={setIsSynchronized}
                    mobile={mobile}
                    metric={metric}
                    updateMetric={updateMetric}
                    util={util}
                />
            }
        </>
    )
}

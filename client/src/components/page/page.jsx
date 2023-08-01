import React, { useEffect, useState } from "react"
import Header from "../header/header"
import Util from "../utl"
import PokeSelectMenu from "../pokeSelectMenu/pokeSelectMenu"
import VictoryScreen from "../victoryScreen/victoryScreen"
import AnswersBox from "../answersBox/answersBox"
import { Link, animateScroll as scroll } from 'react-scroll'
import pokeData from '../../static/pokeData/gen_1.json'


export const Page = () => {
    const [metric, setMetric] = useState(false)
    const [pokemonToGuess, setPokemonToGuess] = useState('')
    const [alreadyGuessed, setAlreadyGuessed] = useState([])
    const [isSynchronized, setIsSynchronized] = useState(false)
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const mobile = window.screen.width > 500 ? false : true
    const util = new Util(mobile)

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
        let pokemonNames = Object.keys(pokeData);
        let selectedPokemon =
            pokemonNames[Math.floor(Math.random() * pokemonNames.length)]
        console.log('------->', selectedPokemon);
        setPokemonToGuess(selectedPokemon)
    }

    const getAlreadyGuessed = () => {
        return alreadyGuessed
    }

    const reset = () => {
        window.location.reload()
    }

    const updateMetric = e => {
        setMetric(e.target.checked)
    }
    const getCookie = cookieName => {
        if (!document.cookie || document.cookie.length < 1) return false
        let cookieArr = document.cookie.split(';')
        let cookieIndex

        for (let index in cookieArr) {
            if (cookieArr[index].includes(cookieName)) cookieIndex = index
        }

        return cookieArr[cookieIndex].split('=')[1]
    }

    const setCookie = (key, value) => {
        document.cookie = key + '=' + value + '; path=/'
    }
    return (
        <>
             <Header
                mobile={mobile}
                setSettingsMenuOpen={setSettingsMenuOpen}
                settingsMenuOpen={settingsMenuOpen}
                updateMetric={updateMetric}
                reset={reset}
            />
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
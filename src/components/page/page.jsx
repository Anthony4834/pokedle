import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { animateScroll as scroll } from 'react-scroll'
import { v4 as uuid } from 'uuid'
import AnswersBox from '../answersBox/answersBox'
import { pm } from '../helpModal/helpModal'
import { HintsBox } from '../hints/hintsBox'
import PokeSelectMenu from '../pokeSelectMenu/pokeSelectMenu'
import Util from '../utl'
import VictoryScreen, { nextMidnightDate } from '../victoryScreen/victoryScreen'

export const BASE_QUERY = 'https://ill-gold-shark-wig.cyclic.app/';
export const Page = ({ pokeData, gen, metric, updateMetric, mobile, gameMode }) => {
    const [pokemonToGuess, setPokemonToGuess] = useState('')
    const [alreadyGuessed, setAlreadyGuessed] = useState([])
    const [isSynchronized, setIsSynchronized] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const util = new Util(mobile, pokeData);
    const [pK, setPk] = useState(null);

    useEffect(() => {
        getTodaysPokemon();
        setPk(getOrCreateUserKey());

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

    useEffect( () => {
        let alreadyGuessedFromCookies = getCookie('already_guessed_arr')
        let alreadyGuessedLocal = util.removeBrackets(alreadyGuessed)

        if (
            alreadyGuessedLocal.replace(/ /g, '').length >
            alreadyGuessedFromCookies.length
        ) {
            setCookie('already_guessed_arr', alreadyGuessedLocal)
        }

        if (getCookie('correct_answer_guessed') == 'true') {
            axios.post(BASE_QUERY + "players/", {
                playerKey: getOrCreateUserKey(),
            })

            axios.post(`${BASE_QUERY}success/`, {
                playerKey: getOrCreateUserKey(),
                attempts: alreadyGuessed.length,
                gameMode: `GENERATION_${gen}`
            })

            setGameOver(true)
            scroll.scrollToTop()
        } else {
            setGameOver(false)
        }
    }, [alreadyGuessed.length, isSynchronized])

    const getTodaysPokemon = async () => {

        axios.get(`${BASE_QUERY}pokemon/GENERATION_${gen}`).then(({data}) => {
            setPokemonToGuess(data['pokemon']);
        })
    }
    const getOrCreateUserKey = () => {
        const userKey = getCookie("userKey", true);
        if(!userKey) {
            setCookie('userKey', uuid(), true);
        }

        return getCookie('userKey', true);
    }
    const getAlreadyGuessed = () => {
        return alreadyGuessed
    }

    const getCookie = (cookieName, bypass) => {
        if (!document.cookie || document.cookie.length < 1) return false
        let cookieArr = document.cookie.split(';')
        let cookieIndex
        let cookie = '';
        if(!bypass) cookie = `GENERATION_${gen}_`;
        cookieName = `${cookie}${cookieName}`

        for (let index in cookieArr) {
            if (cookieArr[index].includes(cookieName)) cookieIndex = index
        }

        if (!cookieIndex) return false
        return cookieArr[cookieIndex].split('=')[1]
    }

    const setCookie = (key, value, bypass) => {
        let cookie = '';
        if(!bypass) cookie = `GENERATION_${gen}_`;

        document.cookie = `${cookie}${key}=${value};${!bypass && `expires=${nextMidnightDate().toUTCString()};`}path=/;`
    }
    return (
        <>
            {pokemonToGuess && <div className={`pageWrapper`}>
                {/* <p>{pK}</p> */}
                {!gameOver && (
                    <>
                        <div className='pageSubheading'>
                            <h1>Guess today's {pm}!</h1>
                            <p>Type a {pm}'s name or select from the list below</p>
                        </div>
                        {pokemonToGuess && (
                            <HintsBox
                                pokemonToGuess={pokemonToGuess}
                                pokeData={pokeData}
                            />
                        )}
                        <PokeSelectMenu
                            pokeData={pokeData}
                            pokemonToGuess={pokemonToGuess}
                            alreadyGuessed={alreadyGuessed}
                            setIsSynchronized={setIsSynchronized}
                            isSynchronized={isSynchronized}
                            cookieMgr={{ getCookie, setCookie }}
                        />
                    </>
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
            </div>}
            {!pokemonToGuess && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="40"
                        visible={true}
                    />
                </div>
            )}
        </>
    )
}

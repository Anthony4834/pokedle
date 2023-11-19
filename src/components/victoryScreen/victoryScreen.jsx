import axios from 'axios'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { pm } from '../helpModal/helpModal'
import { BASE_QUERY } from '../page/page'
import { getNthGrammer, nextMidnightDate } from '../utl'
import './victoryScreen.css'

const VictoryScreen = ({
    pokemonToGuess,
    pokeData,
    gameOver,
    gen,
    getAlreadyGuessed,
}) => {
    const [numTries, setNumTries] = useState(0)
    const [nthPersonToGuess, setNthPersonToGuess] = useState(null)

    useEffect(() => {
        setNumTries(getAlreadyGuessed().length)
        axios
            .get(`${BASE_QUERY}success/today`)
            .then(({ data }) => setNthPersonToGuess(data.length))
    }, [getAlreadyGuessed])

    return (
        <>
            {gameOver && (
                <div className='victoryScreenWrapper'>
                    <div className='victoryScreenCard'>
                        <h1>Gotcha!</h1>
                        <section className='pokemonGuessed'>
                            <section className='pokemonGuessedImageAndText'>
                                <img
                                    className='pokemonGuessedImage'
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData[pokemonToGuess]['ID']}.png`}
                                    alt=''
                                />
                                <section className='pokemonGuessedText'>
                                    <h3>You guessed</h3>
                                    <h3>
                                        {pokemonToGuess
                                            .charAt(0)
                                            .toUpperCase() +
                                            pokemonToGuess.slice(1)}
                                    </h3>
                                </section>
                            </section>
                            <p className='numOfTries'>
                                Number of tries: {numTries}
                            </p>
                            <p className='numOfTries'>
                                You are the {nthPersonToGuess + 1}
                                {getNthGrammer(nthPersonToGuess + 1)} person to
                                guess the correct {pm} today
                            </p>

                            <div className='countdownWrapper'>
                                <p className='numOfTries'>Next {pm} in</p>
                                <Countdown
                                    date={nextMidnightDate()}
                                    daysInHours
                                />
                                <br />
                                <span style={{ fontSize: '10px' }}>
                                    (12:00 AM UTC)
                                </span>
                            </div>
                            {/* <p className="numOfTries">Check back tomorrow for another challenge</p> */}
                        </section>
                    </div>
                </div>
            )}
        </>
    )
}

export default VictoryScreen

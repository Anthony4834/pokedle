import axios from 'axios';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { pm } from '../helpModal/helpModal';
import { BASE_QUERY } from '../page/page';
import { getNthGrammer } from '../utl';
import './victoryScreen.css';

export const nextMidnightDate = () => {
    const currentUTC = new Date();
    const millisecondsUntilNextMidnight = (24 * 60 * 60 * 1000) - (currentUTC.getUTCHours() * 60 * 60 * 1000) - (currentUTC.getUTCMinutes() * 60 * 1000) - (currentUTC.getUTCSeconds() * 1000) - currentUTC.getUTCMilliseconds();
    const nextMidnightTimestamp = currentUTC.getTime() + millisecondsUntilNextMidnight;
    
    return new Date(nextMidnightTimestamp);
}
const VictoryScreen = ({ pokemonToGuess, cookieMgr, pokeData }) => {
    const [numTries, setNumTries] = useState(0)
    const [nthPersonToGuess, setNthPersonToGuess] = useState(null);

    useEffect(() => {
        setNumTries(
            cookieMgr.getCookie('already_guessed_arr').split(',').length,
        )
        axios.get(`${BASE_QUERY}success/today`).then(({ data }) => setNthPersonToGuess(data.length));  
    }, [])

   
    const reset = () => {
        cookieMgr.setCookie('initialized', false)
        cookieMgr.setCookie('correct_answer_guessed', false)
        cookieMgr.setCookie('already_guessed_arr', '')

        window.location.replace('')
    }

    return (
        <>
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
                                    {pokemonToGuess.charAt(0).toUpperCase() +
                                        pokemonToGuess.slice(1)}
                                </h3>
                            </section>
                        </section>
                        <p className='numOfTries'>
                            Number of tries: {numTries}
                        </p>
                        <p className='numOfTries'>You are the {nthPersonToGuess + 1}{getNthGrammer(nthPersonToGuess + 1)} person to guess the correct {pm} today</p>

                        <div className='countdownWrapper'>
                            <p className='numOfTries'>Next {pm} in</p>
                            <Countdown date={nextMidnightDate()} daysInHours/>
                            <br/>
                            <span style={{fontSize: '10px'}}>(12:00 AM UTC)</span>
                        </div>
                        {/* <p className="numOfTries">Check back tomorrow for another challenge</p> */}
                    </section>
                </div>
            </div>
        </>
    )
}

export default VictoryScreen

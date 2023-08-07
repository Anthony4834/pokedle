import { useEffect, useState } from 'react'
import './victoryScreen.css'

const VictoryScreen = ({ pokemonToGuess, cookieMgr, pokeData }) => {
    const [numTries, setNumTries] = useState(0)
    useEffect(() => {
        setNumTries(
            cookieMgr.getCookie('already_guessed_arr').split(',').length,
        )
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
                        {/* <p className="numOfTries">Check back tomorrow for another challenge</p> */}
                        <p onClick={e => reset()}>Reset</p>
                    </section>
                </div>
            </div>
        </>
    )
}

export default VictoryScreen

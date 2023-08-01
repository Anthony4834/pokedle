import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import pokeDataGen1 from './static/pokeData/gen_1.json'
import pokeDataGen2 from './static/pokeData/gen_2.json'
import pokeDataGen3 from './static/pokeData/gen_3.json'
import evoData from './static/evolutionData.json'
import PokeSelectMenu from './components/pokeSelectMenu/pokeSelectMenu'
import AnswersBox from './components/answersBox/answersBox'
import Modal from './components/Modal/Modal'
import Util from './components/utl'
import Header from './components/header/header'
import VictoryScreen from './components/victoryScreen/victoryScreen'
import { Link, animateScroll as scroll } from 'react-scroll'

function App() {
    

    return (
        <div className='App'>
            {/* <p>{pokemonToGuess}</p> */}

            {/* <h1>{pokemonToGuess && "" + pokemonToGuess + " " + pokeData[pokemonToGuess]["height"]}</h1> */}
           
        </div>
    )
}

export default App

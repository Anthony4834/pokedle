import './App.css'
import pokeDataGen1 from './static/pokeData/gen_1.json'
import pokeDataGen2 from './static/pokeData/gen_2.json'
import pokeDataGen3 from './static/pokeData/gen_3.json'
import { Page } from './components/page/page'
import { useState } from 'react'
import { GameModeSelector } from './components/gameModeSelector/gameModeSelector';
import Header from './components/header/header'

function App() {
    const mobile = window.screen.width > 500 ? false : true
    const [metric, setMetric] = useState(false);
    const [gameMode, setGameMode] = useState(0);

    const updateMetric = e => {
        setMetric(e.target.checked)
    }

    const gameModes = {
        1: {
            pokeData: pokeDataGen1
        },
        2: {
            pokeData: pokeDataGen2
        },
        3: {
            pokeData: pokeDataGen3
        }
    }

    return (
        <div className='App'>
            <Header
                mobile={mobile}
                updateMetric={updateMetric}
            />
            {!gameMode && <GameModeSelector setGameMode={setGameMode} />}
            {gameMode && <Page pokeData={gameModes[gameMode].pokeData} gen={gameMode} metric={metric} updateMetric={updateMetric} mobile={mobile}/>}           
        </div>
    )
}

export default App

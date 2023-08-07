import './App.css'
import pokeDataGen1 from './static/pokeData/gen_1.json'
import pokeDataGen2 from './static/pokeData/gen_2.json'
import pokeDataGen3 from './static/pokeData/gen_3.json'
import { Page } from './components/page/page'
import { useState } from 'react'
import { GameModeSelector } from './components/gameModeSelector/gameModeSelector'
import Header from './components/header/header'
import { getGameModeInformation } from './util/gameModeHandler'

function App() {
    const mobile = window.screen.width > 500 ? false : true
    const [metric, setMetric] = useState(false)
    const [gameMode, setGameMode] = useState(null)

    const updateMetric = e => {
        setMetric(e.target.checked)
    }
    return (
        <div className='App'>
            <Header mobile={mobile} updateMetric={updateMetric} />
            {!gameMode && <GameModeSelector setGameMode={setGameMode} />}
            {gameMode && (
                <Page
                    pokeData={gameMode.pokeData}
                    gen={gameMode.gen}
                    metric={metric}
                    updateMetric={updateMetric}
                    mobile={mobile}
                />
            )}
        </div>
    )
}

export default App

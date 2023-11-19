import { useEffect, useRef, useState } from 'react'
import './App.css'
import { GameModeSelector } from './components/gameModeSelector/gameModeSelector'
import Header from './components/header/header'
import { Page } from './components/page/page'

export const mobile = window.screen.width > 500 ? false : true
function App() {
    const [metric, setMetric] = useState(false)
    const [gameMode, setGameMode] = useState(null)
    const [animated, setAnimated] = useState(true)
    const bodyRef = useRef(null)

    const updateMetric = e => {
        setMetric(e.target.checked)
    }
    useEffect(() => {
        document.title = 'Pokédle'
    }, [])
    
    return (
        <div className='App' ref={bodyRef}>
            <Header
                mobile={mobile}
                updateMetric={updateMetric}
                metric={metric}
                setGameMode={setGameMode}
                setAnimated={setAnimated}
            />
            {gameMode ? (
                <Page
                    pokeData={gameMode.pokeData}
                    gen={gameMode.gen}
                    metric={metric}
                    updateMetric={updateMetric}
                    mobile={mobile}
                    gameMode={gameMode}
                />
            ) : (
                <GameModeSelector
                    setGameMode={setGameMode}
                    animated={animated}
                />
            )}
        </div>
    )
}

export default App

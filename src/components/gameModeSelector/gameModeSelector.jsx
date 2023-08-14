import { useState } from 'react'
import { getGameModeInformation } from '../../util/gameModeHandler'
import './gameModeSelector.css'

const possibleGens = [1, 2, 3]
const createGenMap = () => {
    let obj = {}
    for (const gen of possibleGens) {
        obj[gen] = false
    }

    return obj
}
const getBackgroundImage = gen => {
    return require(`../../static/img/${gen}.png`)
}
export const GameModeSelector = ({ setGameMode, animated }) => {
    const [gensSelected, setGensSelected] = useState(createGenMap())
    const updateGensSelected = gen => {
        const output = { ...gensSelected }
        output[gen] = !output[gen]
        setGensSelected(output)
    }
    const startCustomGamesWithGens = () => {
        const gens = Object.keys(gensSelected)
            .filter(gen => gensSelected[gen])
            .flatMap(gen => Number(gen))

        if (gens.length < 1) return
        setGameMode(getGameModeInformation(gens))
    }

    return (
        <div
            className={`gameModeSelector-wrapper ${animated ? 'animated' : ''}`}
        >
            <h1>select a mode</h1>
            <ul className='gameModeSelector-list'>
                <li
                    onClick={e =>
                        setGameMode(getGameModeInformation([1, 2, 3]))
                    }
                >
                    classic
                </li>
            </ul>
            <h1 className='gameModeSelector-orSelect'>-or-</h1>
            <h1 className='gameModeSelector-orSelect'>
                choose generations below
            </h1>
            <ul className='gameModeSelector-list gameModeSelector-list-multi'>
                {possibleGens.map((gen, key) => (
                    <div
                        className='gameModeSelector-list-item-wrapper'
                        key={key}
                    >
                        <li
                            className={`gameModeSelector-list-multi-item ${
                                gensSelected[gen] ? 'active' : 'inactive'
                            }`}
                            style={{
                                backgroundImage: gensSelected[gen]
                                    ? `url(${getBackgroundImage(gen)})`
                                    : '',
                            }}
                            onClick={() => updateGensSelected(gen)}
                        >
                            generation {gen}
                        </li>
                    </div>
                ))}
            </ul>
            <button onClick={() => startCustomGamesWithGens()}>start</button>
        </div>
    )
}

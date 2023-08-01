import './gameModeSelector.css';

export const GameModeSelector = ({setGameMode}) => {
    return (
        <div className="gameModeSelector-wrapper">
            <h1>Select a mode</h1>
            <ul className='gameModeSelector-list'>
                <li onClick={e => setGameMode(1)}>gen1</li>
                <li onClick={e => setGameMode(2)}>gen2</li>
                <li onClick={e => setGameMode(3)}>gen3</li>
            </ul>
        </div>
    )
}
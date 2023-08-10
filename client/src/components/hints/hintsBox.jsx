import { useEffect, useState } from 'react';
import colorSchemes from '../../util/colorExtraction/output.json';
import { pm } from '../helpModal/helpModal';
import { ColorSchemeBox } from './colorSchemeBox';
import './hintsBox.css';

export const HintsBox = ({ pokemonToGuess, pokeData }) => {
    const [hintsShowing, setHintsShowing] = useState(false);
    const [colorData, setColorData] = useState(null)
    
    useEffect(() => {
        setColorData(colorSchemes[pokeData[pokemonToGuess]['ID']]);
    }, [pokemonToGuess, pokeData])

    return (
         <div className='hintsBox-wrapper'>
            {hintsShowing && colorData ? <ColorSchemeBox hintsShowing={hintsShowing} setHintsShowing={setHintsShowing} colorScheme={colorData} /> : 
                <div className='hintPromptBox'> 
                    <img
                        className='modalTargetIcon'
                        src={'https://img.icons8.com/?size=512&id=132&format=png'}
                        alt='settings'
                        onClick={() => setHintsShowing(!hintsShowing)}
                    />
                </div>
            }

            <p className='hintText'>{
                hintsShowing ? `Above is the color scheme of the correct ${pm}` : `Click the icon above to display a hint`
            }</p>
        </div>
       
    )
}

import React, { useState } from 'react'
import colorSchemes from '../../util/colorExtraction/output.json'
import { pm } from '../helpModal/helpModal'
import { ColorSchemeBox } from './colorSchemeBox'
import { EffectivenessHint } from './effectiveness/effectivenessText'
import './hintsBox.css'

export const HintsBox = ({
    pokemonToGuess,
    pokeData,
    alreadyGuessed,
    util,
    mobile,
}) => {
    const mostRecentGuess = alreadyGuessed[alreadyGuessed.length - 1]
    const [hintsShowing, setHintsShowing] = useState(false)
    const colorData = colorSchemes[pokeData[pokemonToGuess]['ID']]

    return (
        <div className='hintsBox-wrapper-outer'>
            {alreadyGuessed.length > 0 && (
                <EffectivenessHint
                    mostRecentGuess={mostRecentGuess}
                    pokemonToGuess={pokemonToGuess}
                    util={util}
                    mobile={mobile}
                    attacking={true}
                />
            )}

            <div className='hintsBox-wrapper'>
                {colorData && (
                    <ColorSchemeBox
                        hintsShowing={hintsShowing}
                        setHintsShowing={setHintsShowing}
                        colorScheme={colorData}
                    />
                )}
                <p className='hintText'>
                    {hintsShowing
                        ? `Above is the color scheme of the correct ${pm}`
                        : `Click the icon above to display a hint`}
                </p>
            </div>

            {!mobile && alreadyGuessed.length > 0 && (
                <EffectivenessHint
                    mostRecentGuess={mostRecentGuess}
                    pokemonToGuess={pokemonToGuess}
                    util={util}
                    attacking={false}
                />
            )}
        </div>
    )
}

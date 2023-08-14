import { pm } from "../helpModal/helpModal"
import { HintsBox } from "../hints/hintsBox"
import PokeSelectMenu from "../pokeSelectMenu/pokeSelectMenu"

export const GameControls = ({gameOver, pokemonToGuess, alreadyGuessed, pokeData, util, mobile, isSynchronized, setIsSynchronized, gen}) => {
    return( !gameOver ?
        <>
            <div className='pageSubheading'>
                <h1>Guess today's {pm}!</h1>
                <p>Type a {pm}'s name or select from the list below</p>
            </div>
            {pokemonToGuess && (
                <HintsBox
                    alreadyGuessed={alreadyGuessed}
                    pokemonToGuess={pokemonToGuess}
                    pokeData={pokeData}
                    util={util}
                    mobile={mobile}
                />
            )}
            <PokeSelectMenu
                pokeData={pokeData}
                pokemonToGuess={pokemonToGuess}
                alreadyGuessed={alreadyGuessed}
                setIsSynchronized={setIsSynchronized}
                isSynchronized={isSynchronized}
                gen={gen}
                mobile={mobile}
            />
        </> : <></>
    )
}
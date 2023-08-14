import React, { useMemo } from 'react'
import { getAttackingEffectiveness } from '../../utl'
import { EffectivenessInfo } from './effectivenessInfo'
import './effectivenessText.css'

export const EffectivenessHint = ({
    mostRecentGuess,
    pokemonToGuess,
    util,
    attacking,
    mobile,
}) => {
    const pokemonToGuessStats = useMemo(
        () => util.formatEntryDetails(pokemonToGuess, false),
        [pokemonToGuess, util],
    )
    const guessedPokemonStats = useMemo(
        () => util.formatEntryDetails(mostRecentGuess, false),
        [mostRecentGuess, util],
    )

    const effectivenessProps = {
        isAttacking: attacking,
        effectiveness: attacking
            ? getAttackingEffectiveness(
                  guessedPokemonStats,
                  pokemonToGuessStats,
              )
            : getAttackingEffectiveness(
                  pokemonToGuessStats,
                  guessedPokemonStats,
              ),
        pokemon: mostRecentGuess,
    }

    if (mobile) {
        return (
            <div className='effectivenessHint-wrapper'>
                <EffectivenessInfo {...effectivenessProps} />
                <EffectivenessInfo
                    {...effectivenessProps}
                    isAttacking={false}
                />
            </div>
        )
    }

    return <EffectivenessInfo {...effectivenessProps} />
}

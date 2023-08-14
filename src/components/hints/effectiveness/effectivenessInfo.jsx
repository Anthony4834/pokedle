import { pm } from '../../helpModal/helpModal'

const getColor = effectiveness => {
    if (effectiveness === 'effective') return '#dbc379'
    return effectiveness === 'super effective' ? '#78a55a' : '#dc5a5a'
}

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

export const EffectivenessInfo = ({ isAttacking, effectiveness, pokemon }) => (
    <p className='effectivenessText'>
        <span className='effectivenessText-label'>
            {isAttacking
                ? `${capitalize(pokemon)} vs correct ${pm}`
                : `correct ${pm} vs ${capitalize(pokemon)}`}
        </span>
        <br />
        <span style={{ color: getColor(effectiveness) }}>{effectiveness}</span>
    </p>
)

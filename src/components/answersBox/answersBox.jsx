import { useEffect, useRef, useState } from 'react'
import AnswerEntry from '../answerEntry/answerEntry'
import './answersBox.css'

const AnswersBox = ({
    getAlreadyGuessed,
    pokeData,
    pokemonToGuess,
    isSynchronized,
    setIsSynchronized,
    mobile,
    metric,
    updateMetric,
    util,
}) => {
    const [entriesToDisplay, setEntriesToDisplay] = useState([])
    const entriesBoxRef = useRef()

    useEffect(() => {
        updateEntries()
    }, [isSynchronized])

    const updateEntries = () => {
        let tempArr = [...getAlreadyGuessed()]
        tempArr.reverse()

        setEntriesToDisplay(tempArr)
    }

    return (
        <div className='answersBoxOuterContainer'>
            {entriesToDisplay.length > 0 && (
                <div className='attrLabelWrapper'>
                    <div>Pokemon</div>
                    <div>Height ({metric ? 'm' : 'ft'})</div>
                    {/* <div>Weight ({metric ? 'kg' : 'lbs'})</div> */}
                    <div>Type(s)</div>
                    {/* <div>Abilities</div> */}
                    <div>Attacking Damage</div>
                    <div>Defending Damage</div>
                    <div>Evolves by</div>
                    {!mobile && (
                        <label className='switch'>
                            <input
                                type='checkbox'
                                onChange={e => updateMetric(e)}
                            />
                            <span className='slider round'></span>
                            <span className='metricLabel'>metric</span>
                        </label>
                    )}
                </div>
            )}
            <div className='entriesBox' ref={entriesBoxRef}>
                {entriesToDisplay &&
                    entriesToDisplay.map(pokemon => (
                        <AnswerEntry
                            className='answerEntryOuter'
                            key={pokemon}
                            pokemon={pokemon}
                            pokeData={pokeData}
                            pokemonToGuess={pokemonToGuess}
                            isSynchronized={isSynchronized}
                            setIsSynchronized={setIsSynchronized}
                            entriesBoxRef={entriesBoxRef}
                            metric={metric}
                            mobile={mobile}
                            util={util}
                        />
                    ))}
            </div>
        </div>
    )
}

export default AnswersBox

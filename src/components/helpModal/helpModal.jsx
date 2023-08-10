import React from 'react'
import example from '../../static/example.png'
import questionMarkIcon from '../../static/help.png'
import Modal from '../Modal/Modal'
import './helpModal.css'

export const pm = 'Pokémon'
const modalBody = (
    <div>
        <h1 className='helpModal-header'>How to play</h1>
        <section className='helpModal-p'>
            <p>
                Simply select a {pm} from the list and it will reveal its
                attributes.
            </p>
            <p>
                The color of the tiles will change to show how close your guess
                was to the correct {pm}.
            </p>
            <p>
                <span className='green'>Green</span> indicates the property is
                an exact match.
            </p>
            <p>
                <span className='yellow'>Yellow</span> indicates partial match.
            </p>
            <p>
                <span className='red'>Red</span> indicates there is no overlap
                between your guess and the property.
            </p>
            <p>
                ⬇️ ⬆️ With arrows indicates if the answer property is above or
                below your guess.
            </p>
        </section>
        <h1 className='helpModal-header'>Attributes</h1>
        <section className='helpModal-p'>
            <p>
                These are the attributes that you will use to narrow down the
                pool of possible {pm}:
            </p>
            <p>
                <span className='green'>Height</span>: The height of the {pm}
            </p>
            <p>
                <span className='green'>Weight</span>: The weight of the {pm}
            </p>
            <p>
                <span className='green'>Types</span>: The type(s) of the {pm}{' '}
                (Water, Fire, Flying, etc)
            </p>
            <p>
                <span className='green'>Abilites</span>: The possible abilities
                of the {pm} (Swift Swim, Intimidate, Sturdy, etc)
            </p>
            <p>
                <span className='green'>Evolves by</span>: The evolution
                method(s) of the {pm} (Level, Trade, Happiness, etc)
            </p>
            <p className='hint'>
                If the {pm} does not evolve, evolves by will be "N/A"
            </p>
        </section>
        <h1 className='helpModal-header'>Example</h1>
        <section className='helpModal-p'>
            <p>
                Assume the correct answer is{' '}
                <span className='green'>Bulbasaur</span>
            </p>
            <p>
                If you guess <span className='green'>Tentacool</span>, these
                attributes will appear
            </p>
            <img
                style={{ width: '100%', right: '1%' }}
                src={example}
                alt='example'
            />
            <p>
                Height: <span className='yellow'>Yellow</span> - Since Bulbasaur
                is nearly the same height as Tentacool (2'04)
            </p>
            <p>
                Weight: <span className='red'>Red w/ DOWN arrow</span> - Since
                Bulbasaur weighs less than Tentacool (15lb)
            </p>
            <p>
                Type(s): <span className='yellow'>Yellow</span> - Since
                Bulbasaur is of type Poison, one of the two types is correct
            </p>
            <p>
                Abilites: <span className='red'>Red</span> - Since Bulbasaur
                does not share any possible abilites with Tentacool
            </p>
            <p>
                Evolves by: <span className='green'>Green</span> - Since
                Bulbasaur also <i>only</i> evolves via leveling up, it is
                exactly correct
            </p>
        </section>
    </div>
)
const modalProps = {
    className: 'helpModal',
    target: (
        <img className='modalTargetIcon' src={questionMarkIcon} alt='help' />
    ),
    body: modalBody,
}
export const HelpModal = () => {
    return <Modal {...modalProps} />
}

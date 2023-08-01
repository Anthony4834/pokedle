import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import './pokeSelectMenu.css'
import { Link, animateScroll as scroll } from 'react-scroll'
import pokeData from '../../static/pokeData/gen_1.json'


const PokeSelectMenu = ({
    pokemonToGuess,
    alreadyGuessed,
    setIsSynchronized,
    isSynchronized,
    cookieMgr,
}) => {
    const [options, setOptions] = useState([])
    const selectListRef = useRef()
    const pokemonNames = Object.keys(pokeData)
    const [selectDisabled, setSelectDisabled] = useState(false);
    
    window.addEventListener('keydown', () => {
        selectListRef.current.focus()
    })

    const updatePokemonOptions = () => {
        let tempOptions = []
        pokemonNames.map(name => {
            if (!alreadyGuessed.includes(name)) {
                let index = pokeData[name]['ID']
                let img = `https://i.ibb.co/dPXxxRt/${index}.png` //require('../../static/pokeSprites/' + index + '.png')
                tempOptions.push({
                    value: name,
                    label: (
                        <div>
                            <img src={img} />
                            {name}
                        </div>
                    ),
                })
            }
        })
        setOptions(tempOptions)
        setIsSynchronized(!isSynchronized)
    }
    useEffect(() => {
        updatePokemonOptions()
        pokemonNames.sort()
    }, [])

    useEffect(() => {
        // clearSearchBar();
    }, [isSynchronized])

    const handleSubmit = (e, submittedWithKey) => {
        
        let pokemonGuessed
        if(window.scrollY < 100)
            scroll.scrollTo(100);
        if (submittedWithKey) {
            e.preventDefault()
            setSelectDisabled(true)
            pokemonGuessed = checkForSelectedOrHighlighted()
                ? checkForSelectedOrHighlighted()
                : e.target.value
        } else {
            pokemonGuessed = e.value
        }

        // if(pokemonGuessed.length < 1 || cookies.get("correct_answer_guessed") == true)
        // return;

        if (!checkValidGuess(pokemonGuessed)) {
            for (let index in pokemonNames)
                if (
                    pokemonNames[index].includes(pokemonGuessed) &&
                    !alreadyGuessed.includes(pokemonNames[index])
                ) {
                    pokemonGuessed = pokemonNames[index]
                    break
                }

            if (!checkValidGuess(pokemonGuessed)) pokemonGuessed = ''
        }

        checkForWinner(pokemonGuessed)

        if (
            !alreadyGuessed.includes(pokemonGuessed) &&
            pokemonNames.includes(pokemonGuessed)
        )
            alreadyGuessed.push(pokemonGuessed)

        updatePokemonOptions()

        compareSelectedVsAnswer(pokemonGuessed)
    }

    const checkForSelectedOrHighlighted = () => {
        let menuOptionElements = selectListRef.current['menuListRef'].children

        for (let index in menuOptionElements) {
            if (menuOptionElements[index].className == undefined) return
            if (
                menuOptionElements[index].className.includes(
                    'css-tr4s17-option',
                ) ||
                menuOptionElements[index].className.includes(
                    'css-d7l1ni-option',
                )
            )
                return menuOptionElements[index].innerText
        }
    }
    const checkValidGuess = pokemonGuessed => {
        return pokemonNames.includes(pokemonGuessed)
    }
    const checkForWinner = pokemonGuessed => {
        if (pokemonGuessed == pokemonToGuess)
            setTimeout(() => {
                cookieMgr.setCookie('correct_answer_guessed', true)
                setIsSynchronized(!isSynchronized)
            }, 4000)
    }

    const selectionFormHandler = e => {
        if (!e.key) handleSubmit(e, false)
        if (e.key && e.key == 'Enter' && !selectDisabled) handleSubmit(e, true)
    }

    const compareSelectedVsAnswer = selected => {
        let guessedPokemonStats = pokeData[selected]
        let correctPokemonStats = pokeData[pokemonToGuess]

        let attributes = Object.keys(guessedPokemonStats)

        for (let index in attributes) {
            let attribute = attributes[index]
        }
    }

    const clearSearchBar = () => {
        selectListRef.current.controlRef.firstChild.children[0].innerText = ''
    }

    return (
        <form
            id='pokeSelectMenuWrapper'
            onKeyUp={e => setSelectDisabled(false)}
        >
            <Select
                autoFocus={true}
                onChange={e => selectionFormHandler(e)}
                onKeyDown={e => selectionFormHandler(e)}
                menuIsOpen={true}
                options={options}
                ref={selectListRef}
            />
        </form>
    )
}

export default PokeSelectMenu

import axios from 'axios'
import { animateScroll as scroll } from 'react-scroll'
import { v4 as uuid } from 'uuid'
import { mobile } from '../../App'
import { nextMidnightDate } from '../utl'
import { BASE_QUERY } from './page'

export const getCookie = (gen, cookieName, bypass) => {
    if (!document.cookie || document.cookie.length < 1) return false
    let cookieArr = document.cookie.split(';')
    let cookieIndex
    let cookie = ''
    if (!bypass) cookie = `GENERATION_${gen}_`
    cookieName = `${cookie}${cookieName}`

    for (let index in cookieArr) {
        if (cookieArr[index].includes(cookieName)) cookieIndex = index
    }

    if (!cookieIndex) return false
    return cookieArr[cookieIndex].split('=')[1]
}

export const setCookie = (gen, key, value, bypass) => {
    let cookie = ''
    if (!bypass) cookie = `GENERATION_${gen}_`

    document.cookie = `${cookie}${key}=${value};${
        !bypass && `expires=${nextMidnightDate().toUTCString()};`
    }path=/;`
}

export const getOrCreateUserKey = () => {
    const userKey = getCookie(null, 'userKey', true)
    if (!userKey) {
        setCookie(null, 'userKey', uuid(), true)
    }

    return getCookie(null, 'userKey', true)
}

export const init = (gen, setAlreadyGuessed) => {
    if (getCookie(gen, 'initialized') == false) {
        setCookie(gen, 'initialized', true)
        setCookie(gen, 'correct_answer_guessed', false)
        setCookie(gen, 'already_guessed_arr', '')
    } else {
        if (
            getCookie(gen, 'already_guessed_arr') &&
            getCookie(gen, 'already_guessed_arr').length > 0
        )
            setAlreadyGuessed(getCookie(gen, 'already_guessed_arr').split(','))
    }
}

export const handleAlreadyGuessedArray = (
    gen,
    util,
    alreadyGuessed,
    setGameOver,
) => {
    let alreadyGuessedFromCookies = getCookie(gen, 'already_guessed_arr')
    let alreadyGuessedLocal = util.removeBrackets(alreadyGuessed)

    if (
        alreadyGuessedLocal.replace(/ /g, '').length >
        alreadyGuessedFromCookies.length
    ) {
        setCookie(gen, 'already_guessed_arr', alreadyGuessedLocal)
    }

    if (getCookie(gen, 'correct_answer_guessed') == 'true') {
        axios.post(BASE_QUERY + 'players/', {
            playerKey: getOrCreateUserKey(),
        })

        axios.post(`${BASE_QUERY}success/`, {
            playerKey: getOrCreateUserKey(),
            attempts: alreadyGuessed.length,
            gameMode: `GENERATION_${gen}`,
        })

        setGameOver(true)
        if (mobile) {
            scroll.scrollToTop()
        } else {
            scroll.scrollTo(120)
        }
    } else {
        setGameOver(false)
    }
}

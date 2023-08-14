import evolutionData from '../static/evolutionData.json'
import { typeEffectiveness } from '../static/typeEffectiveness'

class Util {
    //Class to handle long formatting methods
    metric
    mobile
    pokeData

    constructor(mobile, pokeData) {
        this.mobile = mobile
        this.pokeData = pokeData
    }
    formatEntryDetails = (pokemonName, metricSystem) => {
        let keys = Object.keys(this.pokeData[pokemonName])
        let formattedEntryDetails = {}

        for (let index in keys) {
            let formattedDetail = this.pokeData[pokemonName][keys[index]]

            if (keys[index] === 'abilities' || keys[index] === 'types') {
                formattedDetail = ('' + formattedDetail).replace(/,/g, ' ')
            }

            if (keys[index] === 'height' || keys[index] === 'Weight') {
                let heightFormatted = ''
                formattedDetail = '' + formattedDetail
                if (formattedDetail.length === 1)
                    heightFormatted = '.' + formattedDetail
                else {
                    heightFormatted += formattedDetail.substr(
                        0,
                        formattedDetail.length - 1,
                    )
                    heightFormatted += '.'
                    heightFormatted += formattedDetail.substr(
                        formattedDetail.length - 1,
                    )
                }

                if (
                    heightFormatted.substring(heightFormatted.length - 2) ===
                    '.0'
                )
                    heightFormatted = heightFormatted.substring(
                        0,
                        heightFormatted.length - 2,
                    )

                if (keys[index] === 'height')
                    formattedDetail = metricSystem
                        ? heightFormatted
                        : this.convertMtoFtIn(heightFormatted)
                if (keys[index] === 'Weight')
                    formattedDetail = metricSystem
                        ? heightFormatted
                        : this.convertKgToLbs(heightFormatted)
            }

            formattedEntryDetails[keys[index]] = formattedDetail
        }
        return formattedEntryDetails
    }

    getBackgroundClass = (
        guessedPokemonName,
        detailToEval,
        pokemonToGuess,
        entryDetails,
        metric,
    ) => {
        let correctDetail
        let guessedDetail
        if (detailToEval !== 'evolution') {
            correctDetail = this.formatEntryDetails(pokemonToGuess, metric)[
                detailToEval
            ]
            guessedDetail = entryDetails[detailToEval]
        } else {
            correctDetail = ('' + evolutionData[pokemonToGuess]).replace(
                /,/g,
                ' ',
            )
            guessedDetail = ('' + evolutionData[guessedPokemonName]).replace(
                /,/g,
                ' ',
            )
        }
        let outcome = 'WRONG'
        let smallTextRequired = false
        let verySmallTextRequired = false

        if (isNaN(guessedDetail) && !guessedDetail.includes("'")) {
            let multiAnswerArrGuessed = guessedDetail.split(' ')
            let multiAnswerArrCorrect = correctDetail.split(' ')

            if (
                multiAnswerArrGuessed.length < 2 &&
                guessedDetail === correctDetail
            )
                outcome = 'CORRECT'
            else {
                let correctGuessDetailArr = []
                for (let index in multiAnswerArrGuessed) {
                    let guess = multiAnswerArrGuessed[index]
                    if (guess.length >= 10 || multiAnswerArrGuessed.length > 3)
                        smallTextRequired = true
                    if (guess.includes('_') && guess.length >= 14)
                        verySmallTextRequired = true
                    if (multiAnswerArrCorrect.includes(guess))
                        correctGuessDetailArr.push(multiAnswerArrGuessed[index])
                }

                if (correctGuessDetailArr.length > 0) outcome = 'PARTIAL'
                if (
                    correctGuessDetailArr.length ===
                        multiAnswerArrCorrect.length &&
                    multiAnswerArrCorrect.length ===
                        multiAnswerArrGuessed.length
                )
                    outcome = 'CORRECT'

                if (smallTextRequired) outcome += ' SMALL_TEXT'
                if (verySmallTextRequired) outcome += ' VERY_SMALL_TEXT'

                outcome += ' MULTI_LINE'
            }
        } else if (isNaN(guessedDetail) && guessedDetail.includes("'")) {
            let feetInSplitGuessed = guessedDetail.split("'")
            let feetInSplitCorrect = correctDetail.split("'")

            if (feetInSplitGuessed[0] === feetInSplitCorrect[0]) {
                outcome = 'PARTIAL'
                if (feetInSplitGuessed[1] === feetInSplitCorrect[1])
                    outcome = 'CORRECT'
            }

            if (
                parseInt(feetInSplitCorrect[0]) >
                parseInt(feetInSplitGuessed[0])
            )
                outcome = 'HIGHER'
            if (
                parseInt(feetInSplitCorrect[0]) <
                parseInt(feetInSplitGuessed[0])
            )
                outcome = 'LOWER'

            outcome += ' NUMBER'
        } else {
            correctDetail = parseFloat(correctDetail)
            guessedDetail = parseFloat(guessedDetail)
            if (correctDetail > guessedDetail) outcome = 'HIGHER'
            if (correctDetail < guessedDetail) outcome = 'LOWER'
            if (correctDetail === guessedDetail) outcome = 'CORRECT'

            outcome += ' NUMBER'
        }

        if (this.mobile) outcome += ' MULTI_LINE'

        return outcome
    }

    getEvoDetails = pokemon => {
        let evoArr = evolutionData[pokemon]
        if (!evoArr) return 'N/A'

        let output = ''

        for (let index in evoArr) {
            let detail = evoArr[index]
            detail = detail.replace(/min_/, '')
            detail = detail.replace(/_/g, ' ')
            if (detail === 'item') detail = 'used ' + detail
            output += detail + 'BREAK'
        }

        return output
    }

    convertMtoFtIn = meters => {
        let total = meters * 3.28
        let feet = Math.floor(total)
        let divideBy = feet > 0 ? feet : 1

        return `${feet}'${Math.floor((total % divideBy) * 12)}`
    }
    convertKgToLbs = kg => {
        return Math.floor(kg * 2.2)
    }
    removeBrackets = arr => {
        let arrString = '' + arr
        return arrString.substring(0, arrString.length)
    }
    getMultiplier = (type, vs) => {}

    getBackgroundClassForEffectiveness = (attacking, effectiveness) => {
        if (effectiveness === 1) return 'CORRECT'
        if (effectiveness === 0) return 'WRONG'
        if (attacking) return effectiveness < 1 ? 'WRONG' : 'CORRECT'
        return effectiveness < 1 ? 'CORRECT' : 'WRONG'
    }
}
export const getAttackingEffectiveness = (pokemonGuessed, pokemonToGuess) => {
    let guessedTypes = pokemonGuessed['types'].split(' ')
    let correctTypes = pokemonToGuess['types'].split(' ')
    let output = 1

    for (let type of guessedTypes) {
        const { weak, strong, ineffective } = typeEffectiveness[type]

        for (let correctType of correctTypes) {
            if (weak.includes(correctType)) output *= 0.5
            if (strong.includes(correctType)) output *= 2
            if (ineffective.includes(correctType)) output *= 0
        }
    }

    if (output === 0) return 'ineffective'
    if (output === 1) return 'effective'
    return output > 1 ? 'super effective' : 'not very effective'
}
export const getNthGrammer = num => {
    const numAsString = String(num)
    switch (numAsString[numAsString.length - 1]) {
        case '1':
            return 'st'
        case '2':
            return 'nd'
        case '3':
            return 'rd'
        default:
            return 'th'
    }
}
export const nextMidnightDate = () => {
    const currentUTC = new Date()
    const millisecondsUntilNextMidnight =
        24 * 60 * 60 * 1000 -
        currentUTC.getUTCHours() * 60 * 60 * 1000 -
        currentUTC.getUTCMinutes() * 60 * 1000 -
        currentUTC.getUTCSeconds() * 1000 -
        currentUTC.getUTCMilliseconds()
    const nextMidnightTimestamp =
        currentUTC.getTime() + millisecondsUntilNextMidnight

    return new Date(nextMidnightTimestamp)
}

export default Util

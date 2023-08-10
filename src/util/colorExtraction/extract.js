import { extractColorFromImage } from './imageExtraction'

const extractColorScheme = id => {
    let output = `"${id}": `
    let outputArr = []
    var canvas = document.querySelector('canvas')
    var context = canvas.getContext('2d')

    var image = new Image()
    /* IMPORT POKEMON SPRITES LOCALLY TO RUN */
    // image.src = require(`../static/pokeSprites/${id}.png`)
    image.onload = function () {
        context.drawImage(image, 0, 0)

        // Get the image data from the canvas
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        // Now you have the imageData, and you can extract color data from it
        const colors = extractColorFromImage(
            imageData,
            50,
            50,
            6,
            'bright',
        ).finalColor

        for (let color of colors) {
            const { r, g, b } = color.rgb
            const x = 255
            outputArr.push({
                r: r * x,
                g: g * x,
                b: b * x,
            })
        }

        output += JSON.stringify(outputArr)

        console.log(',' + output)

        context.clearRect(0, 0, canvas.width, canvas.height)
    }
}

export const extractAll = () => {
    for (let i = 1; i < 400; i++) {
        extractColorScheme(i)
    }
}

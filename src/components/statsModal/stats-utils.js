export const shapeDataPie = obj => {
    return [
        ['Game Mode', '# of Plays'],
        ...Object.keys(obj).map(key => [
            key.replace('GENERATION_', 'Generation ').replace(/_/g, ', '),
            obj[key],
        ]),
    ]
}
export const shapeDailyData = (obj) => {
    return [
        ['Winners', obj.windowPlays],
        ['Average Attempts', obj.windowAverageAttempts]
    ]
}
export const shapeDataLine = arr => {}
export const chartColors = [
    '#1f77b4', // blue
    '#ff7f0e', // orange
    '#2ca02c', // green
    '#d62728', // red
    '#9467bd', // purple
    '#8c564b', // brown
    '#e377c2', // pink
]

export const shapeDataPie = obj => {
    return [
        ['Game Mode', '# of Plays'],
        ...Object.keys(obj).map(key => [
            key.replace('GENERATION_', 'Generation ').replace(/_/g, ', '),
            obj[key],
        ]),
    ]
}
export const shapeDailyData = obj => {
    return [
        ['Winners', obj.windowPlays],
        ['Average Attempts', obj.windowAverageAttempts],
    ]
}
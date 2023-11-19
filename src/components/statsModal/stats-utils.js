export const formatDate = date => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
const currentDateInUTC = () =>{
    const output = new Date(
        Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        new Date().getUTCHours(),
        new Date().getUTCMinutes(),
        new Date().getUTCSeconds())
    );

    return output;
} 
export const getDateFromToday = (days, hrs, zeroOut) => {
    const today = currentDateInUTC();
    today.setUTCDate(today.getUTCDate() - days)
    today.setUTCHours(today.getUTCHours() - (hrs || 0))
    if(zeroOut) {
        today.setUTCHours(0);
        today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        today.setUTCMilliseconds(0);
    }
    
    return today
}

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
        ['Gotchas', obj.windowPlays],
        ['Average Guesses Needed', obj.windowAverageAttempts],
    ]
}
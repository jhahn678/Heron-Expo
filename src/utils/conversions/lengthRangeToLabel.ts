export const lengthRangeToLabel = (min: number | undefined, max: number | undefined) => {
    if(min && max) {
        let minStr = min > 24 ? `${(min/12).toFixed(1)} ft` : `${min} in`
        let maxStr = max > 24 ? `${(max/12).toFixed(1)} ft` : `${max} in`
        return `${minStr} - ${maxStr}`
    }
    if(min){
        let minStr = min > 24 ? `${(min/12).toFixed(1)} ft` : `${min} in`;
        return `> ${minStr}`
    }
    if(max) {
        let maxStr = max > 24 ? `${(max/12).toFixed(1)} ft` : `${max} in`
        return `< ${maxStr}`
    }
    return 'Length'
}
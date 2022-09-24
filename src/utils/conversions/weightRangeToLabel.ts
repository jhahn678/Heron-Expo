export const weightRangeToLabel = (min: number | undefined, max: number | undefined) => {
    if(min && max) {
        let minStr = min > 32 ? `${(min/16).toFixed(1)} lb` : `${min} oz`
        let maxStr = max > 32 ? `${(max/16).toFixed(1)} lb` : `${max} oz`
        return `${minStr} - ${maxStr}`
    }
    if(min){
        let minStr = min > 32 ? `${(min/16).toFixed(1)} lb` : `${min} oz`;
        return `> ${minStr}`
    }
    if(max) {
        let maxStr = max > 32 ? `${(max/16).toFixed(1)} lb` : `${max} oz`
        return `< ${maxStr}`
    }
    return 'Weight'
}
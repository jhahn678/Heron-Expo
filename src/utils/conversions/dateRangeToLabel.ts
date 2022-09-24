import dayjs from "../../config/dayjs"


export const dateRangeToLabel = (min: Date | undefined, max: Date | undefined) => {
    if(min && max) return `${dayjs(min).format('M/D/YY')} - ${dayjs(max).format('M/D/YY')}`
    if(min) return `${dayjs(min).format('M/D/YY')} or later`
    if(max) return `${dayjs(max).format('M/D/YY')} or earlier`
    return 'Date'
}
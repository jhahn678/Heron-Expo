import dayjs from "../../config/dayjs";

export const dateToCalendar = (date: string | Date): string => {
    return dayjs().calendar(dayjs(date))
}
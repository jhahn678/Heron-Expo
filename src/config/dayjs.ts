import calendar from 'dayjs/plugin/calendar'
import relativeTime from 'dayjs/plugin/relativeTime'

import dayjs from 'dayjs'

dayjs.extend(calendar)
dayjs.extend(relativeTime)

export default dayjs;


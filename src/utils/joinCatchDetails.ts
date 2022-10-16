type Details = (string | number | null | undefined)[]
export const joinCatchDetails = (details: Details) => details.filter(x => (x !== undefined && x !== null)).join('  •  ')

export const transformToLocation = (
    city: string | null, 
    state: string | null
): string | null => {
    if(city && state) return `${city}, ${state}`
    if(city) return city;
    if(state) return state;
    return null;
}
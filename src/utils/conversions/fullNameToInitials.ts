export const fullNameToInitials = (fullname: string): string => {
    const initials = fullname.split(' ').map(x => x.charAt(0))
    if(initials.length <= 2) return `${initials.join('')}`
    return `${initials[0]}${initials[initials.length - 1]}`
}
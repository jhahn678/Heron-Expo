interface WaterbodyDetails {
    title?: string | undefined | null
    waterbody?: {
        name: string
    } | null | undefined
    species?: string | undefined | null
}

export const catchDetailsToTitle = <T extends WaterbodyDetails>({ 
    title, waterbody, species
}: T): string => {
    if(title) return title;
    if(species && waterbody) return `Caught a ${species} at ${waterbody.name}`
    if(waterbody) return `Caught a fish at ${waterbody.name}`
    if(species) return `Caught a ${species}`
    return "Untitled Catch"
}
import { IWaterbody } from "../../types/Waterbody"

export const waterbodyLocationLabel = (x: IWaterbody) => {
    return (
        x.admin_two && x.admin_two.length < 3 ?
            `${x.admin_two[0]}, ${x.admin_one[0]}` :
        x.admin_one.length === 1 ?
            `${x.admin_one[0]}, ${x.country}` :
        x.admin_one.length > 1 && x.subregion ?
            `${x.subregion} ${x.country}` :
        x.admin_one.length > 1 ?
            `${x.admin_one[0]} + ${x.admin_one.length - 1} more, ${x.ccode}` :
            `${x.country}`
    )
}
export const truncateTotal = (total: number) => {
    if(total < 1000) return `${total}`
    if(total < 100000) return `${Math.ceil(total / 10) / 100} k`;
    if(total < 1000000) return `${(Math.ceil(total / 10) / 100).toFixed(1)} k`;
    return `${(Math.ceil(total / 1000000).toFixed(1))} m`;

}
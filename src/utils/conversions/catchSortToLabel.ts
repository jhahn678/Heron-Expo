import { CatchSort } from "../../types/Catch";

export const catchSortToLabel = (sort: CatchSort): string => {
    switch(sort){
        case CatchSort.CreatedAtNewest:
            return 'Most Recent';
        case CatchSort.CreatedAtOldest:
            return 'Least Recent';
        case CatchSort.LengthLargest:
            return 'Length Largest';
        case CatchSort.WeightLargest:
            return 'Weight Largest';
    }
}
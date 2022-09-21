import { ReviewSort } from "../../hooks/queries/useGetWaterbodyReviews";

export const reviewSortToLabel = (sort: ReviewSort | null) => {
    switch(sort){
        case ReviewSort.CreatedAtNewest:
            return 'Most Recent';
        case ReviewSort.CreatedAtOldest:
            return 'Least Recent';
        case ReviewSort.RatingHighest:
            return 'Highest Rating';
        case ReviewSort.RatingLowest:
            return "Lowest Rating";
        default:
            return 'Most Recent';
    }
}
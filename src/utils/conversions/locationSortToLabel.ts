import { LocationSort } from "../../types/Location";

export const locationSortToLabel = (sort: LocationSort): string => {
    switch (sort) {
      case LocationSort.CreatedAtNewest:
        return "Most Recent";
      case LocationSort.CreatedAtOldest:
        return "Least Recent";
      case LocationSort.MostRecommended:
        return "Most Recommended";
      case LocationSort.Nearest:
        return "Nearest To Me";
      default:
        return 'Most Recent'
    }
};

import { AutocompleteResult } from "../../hooks/queries/useAutocompleteSearch";

export const autocompleteResultColor = (data: AutocompleteResult) => (
  data.type === 'GEOPLACE' ? data.fclass === 'L' ? '#D4F4D1' : '#F2D1F4' : '#d1e5f4'
)
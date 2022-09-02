import create from 'zustand'
import { AdminOneName } from '../../types/AdminOne'
import { AutocompleteGeoplace, IGeoplace } from '../../types/Geoplace'
import { WaterbodyClassification } from '../../types/Waterbody'

interface UseSearchParamStore {
    value: string | null
    classifications: WaterbodyClassification[] | null,
    adminOne: AdminOneName[] | null,
    sort: 'distance' | 'rank',
    geoplace: AutocompleteGeoplace | null,
    setValue: (value: string) => void,
    clearValue: () => void,
    classificationsAppend: (x: WaterbodyClassification) => void,
    classificationsRemove: (x: WaterbodyClassification) => void,
    clearClassifications: () => void
    adminOneAppend: (x: AdminOneName) => void
    adminOneRemove: (x: AdminOneName) => void
    clearAdminOne: () => void
    setSort: (x: 'distance' | 'rank') => void
    setGeoplace: (geoplace: AutocompleteGeoplace) => void
    clearGeoplace: () => void,
    resetSearchParams: () => void
}

export const useSearchParamStore = create<UseSearchParamStore>((set, get) => ({
    value: null,
    classifications: null,
    adminOne: null,
    sort: 'rank',
    geoplace: null,
    setValue: value => set({ value }),
    clearValue: () => set({ value: null }),
    classificationsAppend: x => {
        const state = get().classifications; 
        set({ classifications: state ? [...state, x] : [x] })
    },
    classificationsRemove: x => {
        const state = get().classifications;
        if(!state) return null
        if(state.length > 1) set({ 
            classifications: state.filter(c => c !== x )
        })
        set({ classifications: null })
    },
    clearClassifications: () => set({ classifications: null }),
    adminOneAppend: x => {
        const state = get().adminOne
        set({ adminOne: state ? [...state, x] : [x]})
    },
    adminOneRemove: x => {
        const state = get().adminOne
        if(!state) return null
        if(state.length > 1) set({
            adminOne: state.filter(a => a !== x)
        })
        set({ adminOne: null})
    },
    clearAdminOne: () => set({ adminOne: null }),
    setSort: sort => set({ sort }),
    setGeoplace: geoplace => set({ geoplace }),
    clearGeoplace: () => set({ geoplace: null }),
    resetSearchParams: () => set({
        value: null,
        classifications: null,
        adminOne: null,
        sort: 'rank',
        geoplace: null
    })
}))
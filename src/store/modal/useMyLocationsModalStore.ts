import create from "zustand";
import { LocationSort, Privacy } from "../../types/Location";

export interface LocationsModalStore {
    minDate: Date | undefined,
    setMinDate: (date?: Date) => void
    maxDate: Date | undefined,
    setMaxDate: (date?: Date) => void
    dateVisible: boolean
    setDateVisible: (visible?: boolean) => void
    waterbody: number[] | undefined,
    setWaterbody: (waterbody?: number | undefined) => void
    waterbodyVisible: boolean
    setWaterbodyVisible: (visible?: boolean) => void
    privacy: Privacy[] | undefined,
    setPrivacy: (value?: Privacy) => void
    privacyVisible: boolean
    setPrivacyVisible: (visible?: boolean) => void
    sort: LocationSort
    setSort: (value?: LocationSort) => void
    sortVisible: boolean
    setSortVisible: (visible?: boolean) => void
    reset: () => void
}

export const useMyLocationsModalStore = create<LocationsModalStore>((set, get) => ({
    minDate: undefined,
    setMinDate: minDate => set({ minDate }),
    maxDate: undefined,
    setMaxDate: maxDate => set({ maxDate }),
    dateVisible: false,
    setDateVisible: (dateVisible=true) => set({ dateVisible }),
    waterbody: undefined,
    setWaterbody: value => {
        if(!value) return set({ waterbody: undefined });
        const state = get().waterbody;
        state ? state.includes(value) ? state.length === 1 ?
        set({ waterbody: undefined }) : 
        set({ waterbody: state.filter(x => x !== value )}) :
        set({ waterbody: [ ...state, value ]}) :
        set({ waterbody: [ value ] })
    },
    waterbodyVisible: false,
    setWaterbodyVisible: (waterbodyVisible=true) => set({ waterbodyVisible }),
    privacy: undefined,
    setPrivacy: value => {
        if(!value) return set({ privacy: undefined })
        const state = get().privacy;
        state ? state.includes(value) ? state.length === 1 ?
        set({ privacy: undefined }) :
        set({ privacy: state.filter(x => x !== value )}) :
        set({ privacy: [...state, value ]}) : 
        set({ privacy: [ value ]})
    },
    privacyVisible: false,
    setPrivacyVisible: (privacyVisible=true) => set({ privacyVisible }),
    sort: LocationSort.CreatedAtNewest,
    setSort: (sort=LocationSort.CreatedAtNewest) => set({ sort }),
    sortVisible: false,
    setSortVisible: (sortVisible=true) => set({ sortVisible }),
    reset: () => set({
        minDate: undefined,
        maxDate: undefined,
        dateVisible: false,
        waterbody: undefined,
        waterbodyVisible: false,
        privacy: [Privacy.Public, Privacy.Private, Privacy.Friends],
        privacyVisible: false,
        sort: LocationSort.CreatedAtNewest,
        sortVisible: false,
    })
}))

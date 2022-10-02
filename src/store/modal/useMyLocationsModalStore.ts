import create from "zustand";

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
    reset: () => set({
        minDate: undefined,
        maxDate: undefined,
        dateVisible: false,
        waterbody: undefined,
        waterbodyVisible: false
    })
}))

import create from 'zustand'

export interface MyCatchesModalStore {
    waterbody: number[] | undefined,
    setWaterbody: (waterbody?: number) => void

    waterbodyVisible: boolean
    setWaterbodyVisible: (visible?: boolean) => void

    species: string[] | undefined,
    setSpecies: (species?: string) => void

    speciesVisible: boolean
    setSpeciesVisible: (visible?: boolean) => void

    dateVisible: boolean
    setDateVisible: (visible?: boolean) => void

    minDate: Date | undefined,
    setMinDate: (date?: Date) => void

    maxDate: Date | undefined,
    setMaxDate: (date?: Date) => void

    lengthVisible: boolean
    setLengthVisible: (visible?: boolean) => void

    minLength: number | undefined,
    setMinLength: (length?: number) => void

    maxLength: number | undefined,
    setMaxLength: (length?: number) => void

    weightVisible: boolean
    setWeightVisible: (visible?: boolean) => void

    minWeight: number | undefined,
    setMinWeight: (weight?: number) => void

    maxWeight: number | undefined
    setMaxWeight: (weight?: number) => void

    speciesTotalsVisible: boolean
    setSpeciesTotalsVisible: (visible?: boolean) => void

    waterbodyTotalsVisible: boolean
    setWaterbodyTotalsVisible: (visible?: boolean) => void

    closeAll: () => void
    reset: () => void
}

export const useMyCatchesModalStore = create<MyCatchesModalStore>((set, get) => ({
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
    species: undefined,
    setSpecies: value => {
        if(!value) return set({ species: undefined })
        const state = get().species;
        state ? state.includes(value) ? state.length === 1 ?
        set({ species: undefined }) :
        set({ species: state.filter(x => x !== value )}) :
        set({ species: [...state, value] }) :
        set({ species: [ value ] })
    },
    speciesVisible: false,
    setSpeciesVisible: (speciesVisible=true) => set({ speciesVisible }),
    minDate: undefined,
    setMinDate: minDate => set({ minDate }),
    maxDate: undefined,
    setMaxDate: maxDate => set({ maxDate }),
    dateVisible: false,
    setDateVisible: (dateVisible=true) => set({ dateVisible }),
    minLength: undefined,
    setMinLength: minLength => set({ minLength }),
    maxLength: undefined,
    setMaxLength: maxLength => set({ maxLength }),
    lengthVisible: false,
    setLengthVisible: (lengthVisible=true) => set({ lengthVisible }),
    minWeight: undefined,
    setMinWeight: minWeight => set({ minWeight }),
    maxWeight: undefined,
    setMaxWeight: maxWeight => set({ maxWeight }),
    weightVisible: false,
    setWeightVisible: (weightVisible=true) => set({ weightVisible }),
    speciesTotalsVisible: false,
    setSpeciesTotalsVisible: (speciesTotalsVisible=true) => set({ speciesTotalsVisible }),
    waterbodyTotalsVisible: false,
    setWaterbodyTotalsVisible: (waterbodyTotalsVisible=true) => set({ waterbodyTotalsVisible }),
    closeAll: () => set({
        waterbodyVisible: false,
        speciesVisible: false,
        dateVisible: false,
        weightVisible: false,
        lengthVisible: false,
        speciesTotalsVisible: false,
        waterbodyTotalsVisible: false
    }),
    reset: () => set({
        waterbody: undefined,
        waterbodyVisible: false,
        species: undefined,
        speciesVisible: false,
        minDate: undefined,
        maxDate: undefined,
        dateVisible: false,
        minLength: undefined,
        maxLength: undefined,
        lengthVisible: false,
        minWeight: undefined,
        maxWeight: undefined,
        weightVisible: false,
        speciesTotalsVisible: false,
        waterbodyTotalsVisible: false
    })
}))
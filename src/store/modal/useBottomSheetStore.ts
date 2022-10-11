import BottomSheet from '@gorhom/bottom-sheet'
import React from 'react'
import create from 'zustand'

export interface BottomSheetStore {
    speciesRef: React.MutableRefObject<BottomSheet | null> | null
    waterbody: number | null
    isSpeciesOpen: boolean
    setSpeciesRef: (ref: React.MutableRefObject<BottomSheet | null>) => void
    openSpecies: (id: number) => void
    closeSpecies: () => void
    waterbodyUpload: boolean
    setWaterbodyUpload: (waterbody?: number | false) => void
    mediaGridUpload: boolean
    setMediaGridUpload: (waterbody?: number | false) => void
}

export const useBottomSheetStore = create<BottomSheetStore>((set, get) => ({
    speciesRef: null,
    waterbody: null,
    isSpeciesOpen: false,
    setSpeciesRef: ref => set({ speciesRef: ref }) ,
    openSpecies: id => {
        const ref = get().speciesRef;
        if(ref) ref.current?.expand()
        set({ isSpeciesOpen: true, waterbody: id })
    },
    closeSpecies: () => {
        const ref = get().speciesRef;
        if(ref) ref.current?.close();
        set({ isSpeciesOpen: false, waterbody: null })
    },
    waterbodyUpload: false,
    setWaterbodyUpload: waterbody => set({
        waterbodyUpload: Boolean(waterbody),
        waterbody: waterbody || null
    }),
    mediaGridUpload: false,
    setMediaGridUpload: waterbody => set({
        mediaGridUpload: Boolean(waterbody),
        waterbody: waterbody || null
    }),
}))
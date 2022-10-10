import create from 'zustand'

interface  ReviewModalStore {
    waterbody: number | null
    name: string | null
    showWaterbodyReview: (args: { waterbody: number, name: string }) => void
    ratingVisible: boolean
    setRatingVisible: (value: boolean) => void
    rating: number | null
    setRating: (value?: number | null) => void
    bodyVisible: boolean
    setBodyVisible: (value: boolean) => void
    body: string | null
    setBody: (value?: string) => void
    addImagesVisible: boolean
    setAddImagesVisible: (value: boolean) => void
    conditionsVisible: boolean
    setConditionsVisible: (value: boolean) => void
    conditions: string | null
    setConditions: (value: string | null) => void
    getValues: () => { waterbody: number, rating: number, text: string } | null
    reset: () => void
}

export const useReviewModalStore = create<ReviewModalStore>((set, get) => ({
    waterbody: null,
    name: null,
    showWaterbodyReview: ({ waterbody, name }) => set({ 
        name, 
        waterbody, 
        rating: null,
        ratingVisible: true,
        body: null,
        bodyVisible: false,
        addImagesVisible: false,
        conditionsVisible: false,
        conditions: null,
    }),
    rating: null,
    setRating: rating => set({ rating: rating ? rating : null }),
    ratingVisible: false,
    setRatingVisible: ratingVisible => set({ ratingVisible }),
    bodyVisible: false,
    setBodyVisible: bodyVisible => set({ bodyVisible }),
    body: null,
    setBody: value => set({ body: value ? value : null }),
    addImagesVisible: false,
    setAddImagesVisible: addImagesVisible => set({ addImagesVisible }),
    conditionsVisible: false,
    setConditionsVisible: conditionsVisible => set({ conditionsVisible }),
    conditions: null,
    setConditions: conditions => set({ conditions }),
    getValues: () => {
        const { waterbody, rating, body } = get();
        if(!waterbody || !rating || !body) return null;
        return { waterbody, rating, text: body }
    },
    reset: () => set({
        waterbody: null,
        name: null,
        rating: null,
        ratingVisible: false,
        bodyVisible: false,
        body: null,
        addImagesVisible: false,
        conditionsVisible: false,
        conditions: null,
    }),
}))
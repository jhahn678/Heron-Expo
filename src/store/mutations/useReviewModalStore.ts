import create from 'zustand'

interface  ReviewModalStore {
    /** Name of waterbody */
    name: string | null
    /** ID of waterbody */
    waterbody: number | null
    /** Initiates review bottomsheet UI  */
    showWaterbodyReview: (args: { waterbody: number, name: string }) => void
    /** Is first sheet visible */
    ratingVisible: boolean
    /** Set first sheet visible */
    setRatingVisible: (value: boolean) => void
    /** Rating value from user */
    rating: number | null
    /** Set value of rating */
    setRating: (value?: number | null) => void
    /** Is second sheet visible */
    bodyVisible: boolean
    /** Set second sheet visible */
    setBodyVisible: (value: boolean) => void
    /** Body text value */
    body: string | null
    /** Set text value */
    setBody: (value?: string) => void
    /** Is third sheet visible */
    addImagesVisible: boolean
    /** Set third sheet visible */
    setAddImagesVisible: (value: boolean) => void
    conditionsVisible: boolean
    setConditionsVisible: (value: boolean) => void
    conditions: string | null
    setConditions: (value: string | null) => void
    /** Get current input values */
    getValues: () => { waterbody: number, rating: number, text: string } | null
    reset: () => void
}

export const useReviewModalStore = create<ReviewModalStore>((set, get) => ({
    name: null,
    waterbody: null,
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
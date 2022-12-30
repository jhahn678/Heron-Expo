import create from 'zustand'


interface StartReviewArgs {
    name: string
    waterbody: number
    refetch: () => void
}

interface  ReviewModalStore {
    /** Is review flow active */
    active: boolean
    /** Name of waterbody */
    name: string | null
    /** ID of waterbody */
    waterbody: number | null
    /** Refetch on completed */
    refetch: (() => void) | null
    /** Initiates review bottomsheet UI  */
    startWaterbodyReview: (args: StartReviewArgs) => void
    /** Rating value from user */
    rating: number | null
    /** Set value of rating */
    setRating: (value?: number | null) => void
    /** Body text value */
    body: string | null
    /** Set text value */
    setBody: (value?: string) => void
    conditions: string | null
    setConditions: (value: string | null) => void
    /** Get current input values */
    getValues: () => { waterbody: number, rating: number, text: string } | null
    reset: () => void
}

export const useReviewModalStore = create<ReviewModalStore>((set, get) => ({
    name: null,
    waterbody: null,
    active: false,
    refetch: null,
    startWaterbodyReview:  ({ waterbody, name, refetch }) => set({ 
        name, 
        waterbody,
        refetch,
        active: true,
        rating: null,
        body: null,
        conditions: null,
    }),
    rating: null,
    setRating: rating => set({ rating: rating ? rating : null }),
    body: null,
    setBody: value => set({ body: value ? value : null }),
    conditions: null,
    setConditions: conditions => set({ conditions }),
    getValues: () => {
        const { waterbody, rating, body } = get();
        if(!waterbody || !rating || !body) return null;
        return { waterbody, rating, text: body }
    },
    reset: () => set({
        active: false,
        waterbody: null,
        refetch: null,
        name: null,
        rating: null,
        body: null,
        conditions: null,
    }),
}))
import { useMutation, gql } from "@apollo/client";

const EDIT_REVIEW = gql`
mutation EditWaterbodyReview($id: Int!, $input: ReviewUpdate!) {
  editWaterbodyReview(id: $id, input: $input) {
    id
    waterbody {
      id
    }
    rating
    text
  }
}
`

interface Res {
    editWaterbodyReview: {
        id: number
        rating: number
        text: string
        waterbody: {
            id: number
        }
    }
}

interface Vars {
    id: number
    input: {
        rating: number,
        text: string | null
    }
}

export const useEditReview = () => useMutation<Res, Vars>(EDIT_REVIEW, {
    update: (cache, { data }) => {
        if(data){
            const { id, rating, text } = data.editWaterbodyReview;
            cache.writeFragment({
                id: `WaterbodyReview:${id}`,
                data: { rating, text },
                fragment: gql`
                    fragment WaterbodyReview${id} on WaterbodyReview{
                        rating
                        text
                    }
                `
            })
        }
    }
})
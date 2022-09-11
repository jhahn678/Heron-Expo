import { faker } from "@faker-js/faker";
import { GetWaterbodyReviews } from "./src/hooks/queries/useGetWaterbodyReviews";
import { GetImage } from "./src/hooks/queries/useGetImageQuery";
import { GetWaterbodyMedia } from "./src/hooks/queries/useGetWaterbodiesMedia";

interface Args {
  loading?: boolean, 
  error?: boolean
}

interface Res<TData> {
  data: TData
  loading: boolean,
  error: boolean
}

export const useGetWaterbodyReviewsMock = (
  { loading=false, error=false, limit=12}: Args & { limit?: number}
): Res<GetWaterbodyReviews> => {

  const data: GetWaterbodyReviews = {
    waterbody: {
      reviews: new Array(limit).fill(null).map(() => ({
        id: Math.random() * 100000 + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        text: faker.lorem.paragraph(),
        created_at: faker.date.past(),
        user: {
          id: Math.random() * 100000 + 1,
          avatar: faker.internet.avatar(),
          fullname: faker.name.fullName()
        }
      }))
    }
  }

  return { data, loading, error }
}



export const useGetImageMock = ({ loading=false, error=false }: Args): Res<GetImage> => {
  const data: GetImage = {
    id: faker.datatype.number({ min: 10000 }),
    created_at: faker.date.past(),
    url: faker.image.nature(),
    user: {
      avatar: faker.internet.avatar(),
      fullname: faker.name.fullName(),
      id: faker.datatype.number({ min: 10000 })
    }
  }
  return { data, error, loading }
}


export const useGetWaterbodyMediaMock = (
  { loading=false, error=false, limit=24 }: Args & { limit?: number }
): Res<GetWaterbodyMedia> => {

  const data: GetWaterbodyMedia = {
    waterbody: {
      media: new Array(limit).fill(null).map(() => ({
        id: faker.datatype.number({ min: 100000 }),
        created_at: faker.date.past(),
        url: faker.image.nature()
      }))
    }
  }

  return { data, error, loading }
}

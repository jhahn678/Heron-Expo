import { faker } from "@faker-js/faker";
import { GetWaterbodyReviews } from "./src/hooks/queries/useGetWaterbodyReviews";
import { GetImage } from "./src/hooks/queries/useGetImageQuery";
import { GetWaterbodyMedia } from "./src/hooks/queries/useGetWaterbodiesMedia";
import { GetWaterbodyRes } from './src/hooks/queries/useGetWaterbodyQuery';
import { GetWaterbodySpeciesRes } from './src/hooks/queries/useGetWaterbodySpecies'
import { GetCatchesRes } from "./src/hooks/queries/useGetCatches";

interface Args {
  loading?: boolean, 
  error?: boolean
}

interface Res<TData> {
  data: TData | undefined
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

  return { data: (loading || error) ? undefined : data, loading, error }
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
  return { data: (loading || error) ? undefined : data, loading, error }
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

  return { data: (loading || error) ? undefined : data, loading, error }
}


export const useGetWaterbodyMock = ({ loading=false, error=false }: Args): Res<GetWaterbodyRes> => {
  
  const data: GetWaterbodyRes = {
    waterbody: {
      id: faker.datatype.number({ min: 100000 }),
      name: `${faker.word.adjective()} ${faker.word.noun()} Lake`,
      ccode: 'US',
      country: 'United States',
      admin_one: ['Connecticut'],
      admin_two: [faker.address.county()],
      subregion: 'Northeastern',
      classification: 'lake',
      average_rating: 4.5,
      total_catches: 384,
      total_locations: 18,
      total_species: 6,
      total_media: 122,
      total_reviews: 32,
      media: new Array(12).fill(null).map(x => ({ url: faker.image.nature(640, 480, true) })),
      catches: new Array(3).fill(null).map(x => ({ 
        id: faker.datatype.number({ min: 100000 }),
        user: {
          id: faker.datatype.number({ min: 100000 }),
          fullname: faker.name.fullName(),
          avatar: faker.internet.avatar()
        },
        media: [{ url: faker.image.nature() }],
        species: faker.animal.fish(),
        created_at: faker.date.past()
      })),
    }
  }

  return { data: (loading || error) ? undefined : data, loading, error }
}



export const useGetWaterbodySpeciesMock = ({ total=5, loading=false, error=false }: Args & { total?: number }): Res<GetWaterbodySpeciesRes> => {
  const data: GetWaterbodySpeciesRes = {
    waterbody: {
      id: faker.datatype.number({ min: 100000 }),
      name: 'Golden Lake',
      all_species: new Array(total).fill(null).map(() => ({
        count: faker.datatype.number({ min: 2, max: 100 }),
        species: faker.animal.fish()
      })).sort((a, b) => b.count - a.count)
    }
  }
  return { data: (loading || error) ? undefined : data, loading, error }
}


export const useGetCatchesQueryMock = ({ error=false, limit=20, loading=false }: Args & { limit?: number }): Res<GetCatchesRes> => {
  const data: GetCatchesRes = {
    catches: new Array(limit).fill(null).map(() => ({
      id: faker.datatype.number({ min: 100000 }),
      title: faker.lorem.words(),
      description: faker.lorem.sentence(10),
      weight: faker.datatype.number({ min: 4, max: 16 }),
      length: faker.datatype.number({ min: 6, max: 28 }),
      species: faker.animal.fish(),
      geom: {
        type: 'Point',
        coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())]
      },
      created_at: faker.date.past(),
      waterbody: {
        id: 12385,
        name: "Magnificence Lake"
      },
      user: {
        avatar: faker.internet.avatar(),
        fullname: faker.name.fullName(),
        id: 75634
      },
      media: [{ url: faker.image.animals() }]
    }))
  }

  return { data: (loading || error) ? undefined : data, loading, error }
}
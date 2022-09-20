import { faker } from "@faker-js/faker";
import { GetWaterbodyReviews } from "./src/hooks/queries/useGetWaterbodyReviews";
import { GetImage } from "./src/hooks/queries/useGetImage";
import { GetWaterbodyMedia } from "./src/hooks/queries/useGetWaterbodyMedia";
import { GetWaterbodyRes } from './src/hooks/queries/useGetWaterbody';
import { GetWaterbodySpeciesRes } from './src/hooks/queries/useGetWaterbodySpecies'
import { GetCatchesRes } from "./src/hooks/queries/useGetCatches";
import { GetLocationsRes } from "./src/hooks/queries/useGetLocations";
import { Privacy } from "./src/types/Location";
import { GetLocationRes } from "./src/hooks/queries/useGetLocation";

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
      id: faker.datatype.number({ min: 100000 }),
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
      name: `Shooting Star Lake`,
      ccode: "US",
      country: "United States",
      admin_one: ["Connecticut"],
      admin_two: [faker.address.county()],
      subregion: "Northeastern",
      classification: "lake",
      average_rating: 4.5,
      total_catches: 384,
      total_locations: 18,
      total_species: 6,
      total_media: 122,
      total_reviews: 32,
      is_saved: false,
      media: new Array(12)
        .fill(null)
        .map((x) => ({
          id: Math.random(),
          url: faker.image.nature(640, 480, true),
        })),
    },
  };

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
      title: 'New PB at the lake',
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
      media: new Array(3).fill(null).map(() => ({ id: Math.random(), url: faker.image.nature()})),
      is_favorited: false,
      total_favorites: Math.floor(Math.random()* 10) + 1,
    }))
  }

  return { data: (loading || error) ? undefined : data, loading, error }
}

export const useGetLocationsQueryMock = ({ error=false, limit=20, loading=false }: Args & { limit?: number }): Res<GetLocationsRes> => {
  
  const data: GetLocationsRes = {
    locations: new Array(limit).fill(null).map(() => ({
      id: faker.datatype.number({ min: 100000 }),
      privacy: Privacy.Public,
      title: faker.lorem.words(),
      description: faker.lorem.sentence(10),
      hexcolor: faker.color.rgb().slice(2),
      geom: {
        type: "Point",
        coordinates: [
          parseFloat(faker.address.longitude()),
          parseFloat(faker.address.latitude()),
        ],
      },
      created_at: faker.date.past(),
      waterbody: {
        id: 12385,
        name: "Magnificence Lake",
      },
      user: {
        avatar: faker.internet.avatar(),
        fullname: faker.name.fullName(),
        id: 75634,
      },
      media: new Array(1)
        .fill(null)
        .map(() => ({ id: Math.random(), url: faker.image.nature() })),
      nearest_geoplace: `${faker.address.cityName()}, ${faker.address.state()}`,
      is_favorited: false,
      total_favorites: Math.floor(Math.random() * 10) + 1,
      is_saved: false
    })),
  };
  
  return { data: (loading || error) ? undefined : data, loading, error }
}


export const useGetWaterbodyFragmentMock = (): GetWaterbodyRes['waterbody'] => {
  const data: GetWaterbodyRes["waterbody"] = {
    id: faker.datatype.number({ min: 100000 }),
    name: "Swatara Creekistan",
    ccode: "US",
    country: "United States",
    admin_one: ["Connecticut"],
    admin_two: [faker.address.county()],
    subregion: "Northeastern",
    classification: "creek",
    average_rating: 4.1,
    total_catches: 85,
    total_locations: 18,
    total_species: 5,
    total_media: 122,
    total_reviews: 32,
    is_saved: false,
    media: new Array(12)
      .fill(null)
      .map((x) => ({
        id: Math.random(),
        url: faker.image.nature(640, 480, true),
      })),
  };

  return data;
}

export const useGetLocationFragementMock = (privacy: Privacy) => () => {
  const data: GetLocationsRes["locations"][number] = {
    id: faker.datatype.number({ min: 100000 }),
    privacy,
    title: "Harrisburg Pike Bridge",
    description:
      "Theres a pull off on Swatara Creek Rd. Walk down to the bridge",
    hexcolor: "rgb(123, 126, 198)",
    geom: {
      type: "Point",
      coordinates: [
        parseFloat(faker.address.longitude()),
        parseFloat(faker.address.latitude()),
      ],
    },
    created_at: faker.date.past(),
    waterbody: {
      id: 12385,
      name: "Swatara Creek",
    },
    user: {
      avatar: faker.internet.avatar(),
      fullname: faker.name.fullName(),
      id: 75634,
    },
    media: new Array(1)
      .fill(null)
      .map(() => ({ id: Math.random(), url: faker.image.nature() })),
    nearest_geoplace: `${faker.address.cityName()}, ${faker.address.state()}`,
    is_favorited: false,
    total_favorites:
      privacy === Privacy.Public ? Math.floor(Math.random() * 10) + 1 : 0,
    is_saved: false
  };

  return data;
}
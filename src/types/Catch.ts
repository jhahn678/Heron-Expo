import { IUser } from "./User";
import { Point } from 'geojson'
import { IMedia } from "./Media";


export interface ICatch {
  id: number;
  description?: string;
  geom?: Point;
  /** INCHES */
  length?: number;
  rig?: string;
  species?: string;
  title?: string;
  /** OUNCES */
  weight?: number;
  map_image?: IMedia | null
  created_at: Date;
  updated_at?: Date;
}

export interface GetWaterbodyCatch extends Pick<
    ICatch, 'id' | 'species' | 'created_at'
>{
    user: Pick<IUser, 'fullname' | 'id' | 'avatar'>
    media: Pick<IMedia, 'url' | 'id'>[]
    map_image?: Pick<IMedia, 'url' | 'id'>
}

export enum CatchSort {
  CreatedAtNewest = "CREATED_AT_NEWEST",
  CreatedAtOldest = "CREATED_AT_OLDEST",
  LengthLargest = "LENGTH_LARGEST",
  Nearest = "NEAREST",
  WeightLargest = "WEIGHT_LARGEST",
}

export enum CatchQuery {
  Coordinates = 'COORDINATES',
  Following = 'FOLLOWING',
  User = 'USER',
  Waterbody = 'WATERBODY'
}
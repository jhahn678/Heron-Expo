import create from 'zustand';

export interface MapModalStore {
  catchId: number | null
  catchVisible: boolean
  setCatch: (id?: number) => void
  locationId: number | null
  locationVisible: boolean
  setLocation: (id: number) => void;
  waterbodyId: number | null
  waterbodyVisible: boolean
  setWaterbody: (id: number) => void;
  reset: () => void
}

export const useMapModalStore = create<MapModalStore>((set, get) => ({
  catchId: null,
  catchVisible: false,
  setCatch: catchId => { 
    catchId ?
    set({ catchId, catchVisible: true }) :
    set({ catchId: null, catchVisible: false})
  },
  locationId: null,
  locationVisible: false,
  setLocation: locationId => {
    locationId ?
    set({ locationId, locationVisible: true }) :
    set({ locationId: null, locationVisible: false })
  },
  waterbodyId: null,
  waterbodyVisible: false,
  setWaterbody: waterbodyId => {
    waterbodyId ?
    set({ waterbodyId, waterbodyVisible: true }) :
    set({ waterbodyId: null, waterbodyVisible: false })
  },
  reset: () => set({
    catchId: null,
    catchVisible: false,
    locationId: null,
    locationVisible: false,
    waterbodyId: null,
    waterbodyVisible: false
  })
}));
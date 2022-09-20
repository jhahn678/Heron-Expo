import create from 'zustand';

export interface MapModalStore {
  catchId: number | null
  catchDismissable: boolean
  catchVisible: boolean
  setCatch: (args?: { id?: number | null, dismissable?: boolean }) => void
  locationId: number | null
  locationDismissable: boolean
  locationVisible: boolean
  setLocation: (args?: { id?: number | null, dismissable?: boolean }) => void;
  waterbodyId: number | null
  waterbodyVisible: boolean
  setWaterbody: (id: number) => void;
  reset: () => void
}

export const useMapModalStore = create<MapModalStore>((set, get) => ({
  catchId: null,
  catchVisible: false,
  catchDismissable: false,
  setCatch: (args) => {
    if (!args) {
      set({ catchId: null, catchVisible: false, catchDismissable: false });
    } else {
      const { id=null, dismissable=false } = args;
      set({ 
        catchId: id, 
        catchDismissable: dismissable, 
        catchVisible: Boolean(id)
      });
    }
  },
  locationId: null,
  locationVisible: false,
  locationDismissable: false,
  setLocation: (args) => {
    if (!args) {
      set({ locationId: null, locationVisible: false, locationDismissable: false });
    } else {
      const { id=null, dismissable=false } = args;
      set({ 
        locationId: id, 
        locationDismissable: dismissable, 
        locationVisible: Boolean(id)
      });
    }
  },
  waterbodyId: null,
  waterbodyVisible: false,
  setWaterbody: (waterbodyId) => {
    waterbodyId
      ? set({ waterbodyId, waterbodyVisible: true })
      : set({ waterbodyId: null, waterbodyVisible: false });
  },
  reset: () =>
    set({
      catchId: null,
      catchVisible: false,
      catchDismissable: false,
      locationId: null,
      locationVisible: false,
      locationDismissable: false,
      waterbodyId: null,
      waterbodyVisible: false,
    }),
}));
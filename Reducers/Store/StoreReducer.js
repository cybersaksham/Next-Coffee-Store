import StoreActions from "./StoreActions";

const StoreReducer = (state, action) => {
  switch (action.type) {
    case StoreActions.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case StoreActions.SET_NEARBY_STORES: {
      return { ...state, nearbyStores: action.payload.nearbyStores };
    }
    case StoreActions.SET_IS_FINDING: {
      return { ...state, isFinding: action.payload.isFinding };
    }
    default:
      throw new Errro(`Unhandled action type: ${action.type}`);
  }
};

export default StoreReducer;

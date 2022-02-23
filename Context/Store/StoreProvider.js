import { useReducer } from "react";
import StoreContext from "./StoreContext";
import { StoreReducer } from "../../Reducers";

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    nearbyStores: null,
    isFinding: false,
  };

  const [state, dispatch] = useReducer(StoreReducer, initialState);

  return (
    <StoreContext.Provider
      value={{
        latLong: state.latLong,
        nearbyStores: state.nearbyStores,
        isFinding: state.isFinding,
        dispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

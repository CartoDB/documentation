import { createContext, useContext, useState } from 'react';

export const INITIAL_VIEW_STATE = {
  latitude: 40.715,
  longitude: -74,
  zoom: 17,
  pitch: 60,
  bearing: 0,
};

const AppContext = createContext({
  viewState: INITIAL_VIEW_STATE,
  setView: () => {},
});

export default AppContext;

export const AppContextProvider = AppContext.Provider;

export function useContextInApp() {
  const [viewState, setView] = useState(INITIAL_VIEW_STATE);

  const contextValues = {
    viewState,
    setView,
  };

  return contextValues;
}

export function useAppContext() {
  return useContext(AppContext);
}

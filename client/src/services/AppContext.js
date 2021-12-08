import React, { useState, useContext } from "react";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };
  const toggleShowVirtualLayer = () => {
    setShowVirtualLayer(!showVirtualLayer);
  };

  return (
    <AppContext.Provider
      value={{
        autoRotate,
        toggleAutoRotate,
        showVirtualLayer,
        toggleShowVirtualLayer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

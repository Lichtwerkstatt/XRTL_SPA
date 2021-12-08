import React, { useState, useContext } from "react";
import { MdSettingsInputAntenna } from "react-icons/md";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);
  const [selectedComps, setSelectedComps] = useState(new Set())

  console.log(selectedComps)

  const toggleSelectedComp = compId => {
    if (!selectedComps.has(compId)) {
      setSelectedComps(prev => new Set(prev.add(compId)))
      console.log("added ", compId)
    } else {
      setSelectedComps(prev => new Set([...prev].filter(x => x !== compId)))
      console.log("deselected ", compId)
    }
  }

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
        selectedComps,
        toggleSelectedComp
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

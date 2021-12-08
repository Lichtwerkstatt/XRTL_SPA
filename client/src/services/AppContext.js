import React, { useState, useContext } from "react";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);
  const [selectedComps, setSelectedComps] = useState(new Set())
  const [logs, setLogs] = useState([])

  console.log(logs)

  const toggleSelectedComp = compId => {
    console.log("looking for ", compId, "=", !selectedComps.has(compId))
    if (!selectedComps.has(compId)) {
      setSelectedComps(prev => new Set(prev.add(compId)))
      console.log("selected ", compId)
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

  const addLog = (log) => {
    setLogs(prev => [log,...prev])
  }

  return (
    <AppContext.Provider
      value={{
        autoRotate,
        toggleAutoRotate,
        showVirtualLayer,
        toggleShowVirtualLayer,
        selectedComps,
        toggleSelectedComp,
        logs,
        addLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

import React, { useState, useContext } from "react";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);
  const [showWebcam, setShowWebcam] = useState(false);
  const [selectedComps, setSelectedComps] = useState(new Set())
  const [busyComps, setBusyComps] = useState(new Set())
  const [logs, setLogs] = useState([])

  const toggleSelectedComp = compId => {
    if (!selectedComps.has(compId)) {
      setSelectedComps(prev => new Set(prev.add(compId)))
    } else {
      setSelectedComps(prev => new Set([...prev].filter(x => x !== compId)))
    }
  };

  const addBusyComp = compId => {
    if (!busyComps.has(compId)) {
      setBusyComps(prev => new Set(prev.add(compId)))
    }
  };

  const removeBusyComp = compId => {
    if (busyComps.has(compId)) {
      setBusyComps(prev => new Set([...prev].filter(x => x !== compId)))
    }
  };

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  const toggleShowVirtualLayer = () => {
    setShowVirtualLayer(!showVirtualLayer);
  };

  const addLog = (log) => {
    setLogs(prev => [log, ...prev])
  };

  const toggleShowWebcam = () => {
    setShowWebcam(!showWebcam);
  };

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
        busyComps,
        addBusyComp,
        removeBusyComp,
        showWebcam,
        toggleShowWebcam,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

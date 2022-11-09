import React, { useState, useContext } from "react";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [autoRotate, setAutoRotate] = useState(false);
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);
  const [selectedComps, setSelectedComps] = useState(new Set());
  const [busyComps, setBusyComps] = useState(new Set());
  const [logs, setLogs] = useState([]);
  const [showTags, setShowTags] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [showBeam, setShowBeam] = useState(false);


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
  const toggleShowTags = () => {
    setShowTags(!showTags)
  }

  const addLog = (log) => {
    setLogs(prev => [log, ...prev])
  };

  const toggleShowBeam = () => {
    setShowBeam(!showBeam);
  }

  const toggleShowInfoWindow = () => {
    setShowInfoWindow(!showInfoWindow);
  }

  const toggleLogin = () => {
    setShowLogin(!showLogin);
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
        busyComps,
        addBusyComp,
        removeBusyComp,
        showTags,
        toggleShowTags,
        showBeam,
        toggleShowBeam,
        showLogin,
        setShowLogin,
        showInfoWindow,
        toggleShowInfoWindow,
        toggleLogin
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

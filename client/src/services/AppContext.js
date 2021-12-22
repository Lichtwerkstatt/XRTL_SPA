import React, { useState, useContext } from "react";
import { v1 as uuid } from "uuid";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);
  const [selectedComps, setSelectedComps] = useState(new Set())
  const [busyComps, setBusyComps] = useState(new Set())
  const [logs, setLogs] = useState([])

  const toggleSelectedComp = compId => {
    if (!selectedComps.has(compId)) {
      setSelectedComps(prev => new Set(prev.add(compId)))
    } else {
      setSelectedComps(prev => new Set([...prev].filter(x => x !== compId)))
    }
  }

  const addBusyComp = compId => {
    if (!busyComps.has(compId)) {
      setBusyComps(prev => new Set(prev.add(compId)))
    }
  }

  const removeBusyComp = compId => {
    if (busyComps.has(compId)) {
      setBusyComps(prev => new Set([...prev].filter(x => x !== compId)))
    }
  }

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };
  const toggleShowVirtualLayer = () => {
    setShowVirtualLayer(!showVirtualLayer);
  };

  const addLog = (log) => {
    setLogs(prev => [log, ...prev])
  }
  const createRoom = (props) => {
    const id = uuid();
    console.log(id);
    props.history.push(`/${id}`);
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
        createRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

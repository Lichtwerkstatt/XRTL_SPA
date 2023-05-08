import React, { useState, useContext } from "react";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [lastClosedComponent, setLastClosedComponent] = useState('');
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);
  const [selectedComps, setSelectedComps] = useState(new Set());
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [showManualWindow, setShowManual] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showBeam, setShowBeam] = useState('off');
  const [showTags, setShowTags] = useState(true);
  const [showCam, setShowCam] = useState(false);
  const [logs, setLogs] = useState([]);
  const [smallSetting, setSmallSetting] = useState(false);

  const toggleSelectedComp = compId => {
    if (!selectedComps.has(compId)) {
      setSelectedComps(prev => new Set(prev.add(compId)));
    } else {
      setSelectedComps(prev => new Set([...prev].filter(x => x !== compId)));
      setLastClosedComponent(compId);
    }
  };

  const toogleLastComp = () => {
    setLastClosedComponent('');
  }

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

  const toggleShowBeam = (newVal) => {
    setShowBeam(newVal);
  }

  const toggleShowInfoWindow = () => {
    setShowInfoWindow(!showInfoWindow);
  }

  const toggleShowManualWindow = () => {
    setShowManual(!showManualWindow);
  }

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }

  const toggleCam = () => {
    setShowCam(!showCam);
    toggleSelectedComp('Cam_1')
  }

  const smallSettings = () => {
    setSmallSetting(!smallSetting)
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
        showTags,
        toggleShowTags,
        showBeam,
        toggleShowBeam,
        showLogin,
        setShowLogin,
        showInfoWindow,
        toggleShowInfoWindow,
        toggleLogin,
        toggleCam,
        showCam,
        lastClosedComponent,
        toogleLastComp,
        toggleShowManualWindow,
        showManualWindow,
        smallSettings,
        smallSetting
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

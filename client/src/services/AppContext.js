import React, { useState, useContext } from "react";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [lastClosedComponent, setLastClosedComponent] = useState('');
  const [smallSettingTemp, setSmallSettingTemp] = useState(false);
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);
  const [selectedComps, setSelectedComps] = useState(new Set());
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [smallSetting, setSmallSetting] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showBeam, setShowBeam] = useState('off');
  const [showTags, setShowTags] = useState(true);
  const [showLED, setShowLED] = useState('none');
  const [logs, setLogs] = useState([]);

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

  const toggleShowInfoWindow = () => {
    setShowInfoWindow(!showInfoWindow);
  }

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }

  const toggleShowLED = (newVal) => {
    setShowLED(newVal);
  }

  const toggleShowBeam = (newVal) => {
    setShowBeam(newVal);
  }

  const smallSettings = () => {
    setSmallSetting(!smallSetting)
  }

  const smallSettingsTemp = () => {
    setSmallSettingTemp(!smallSettingTemp)
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
        lastClosedComponent,
        toogleLastComp,
        showLED,
        toggleShowLED,
        smallSettings,
        smallSetting,
        smallSettingsTemp,
        smallSettingTemp
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

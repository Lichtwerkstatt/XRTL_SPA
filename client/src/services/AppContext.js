import React, { useState, useContext } from "react";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [underConstruction, setUnderConstruction] = useState(false);
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);
  const [roomComponent, setRoomComponent] = useState(new Set());
  const [selectedComps, setSelectedComps] = useState(new Set());
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [showManualWindow, setShowManual] = useState(false);
  const [showWelcomeWindow, setShowWelcome] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [manualPage, setManualPage] = useState(1);
  const [showBeam, setShowBeam] = useState(false);
  const [showTags, setShowTags] = useState(true);
  const [showCam, setShowCam] = useState(false);
  const [username, setUsername] = useState('');
  const [socket, setSocket] = useState('');
  const [logs, setLogs] = useState([]);

  const toggleSelectedComp = (compId) => {
    if (!selectedComps.has(compId)) {
      setSelectedComps(prev => new Set(prev.add(compId)));
    } else {
      setSelectedComps(prev => new Set([...prev].filter(x => x !== compId)));
      toogleRoomComp(compId);
    }
  };

  const toogleRoomComp = (compId, val = false) => {
    try {
      if (!roomComponent.has(compId) && val !== false) {
        setRoomComponent(prev => new Set(prev.add(compId)));

        socket.emit('join stream room', {
          controlId: compId,
          userId: username
        });
      } else if (roomComponent.has(compId)) {
        setRoomComponent(prev => new Set([...prev].filter(x => x !== compId)));

        socket.emit("leave stream room", {
          controlId: compId,
          userId: username
        });
      }
    } catch (e) {

    }
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

  const toggleShowBeam = () => {
    setShowBeam(!showBeam)
  }

  const toggleShowInfoWindow = () => {
    setShowInfoWindow(!showInfoWindow);
  }

  const toggleShowManualWindow = () => {
    setShowManual(!showManualWindow);
  }

  const toggleShowWelcomeWindow = () => {
    setShowWelcome(!showWelcomeWindow);
  }

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }

  const toggleCam = () => {
    setShowCam(!showCam);
    toggleSelectedComp('overview')
  }

  const toggleunderConstruction = (newVal) => {
    setUnderConstruction(newVal)
  }

  const toggleSetManualPage = (newVal) => {
    setManualPage(newVal)
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
        toggleLogin,
        showInfoWindow,
        toggleShowInfoWindow,
        showCam,
        toggleCam,
        setRoomComponent,
        toogleRoomComp,
        showManualWindow,
        toggleShowManualWindow,
        showWelcomeWindow,
        toggleShowWelcomeWindow,
        underConstruction,
        toggleunderConstruction,
        manualPage,
        toggleSetManualPage,
        username,
        setUsername,
        socket,
        setSocket
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

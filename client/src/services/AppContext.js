import React, { useState, useContext } from "react";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [roomComponent, setRoomComponent] = useState(new Set());
  const [showVirtualLayer, setShowVirtualLayer] = useState(true);
  const [selectedComps, setSelectedComps] = useState(new Set());
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showBeam, setShowBeam] = useState('off');
  const [showTags, setShowTags] = useState(true);
  const [showCam, setShowCam] = useState(false);
  const [showLED, setShowLED] = useState('none');
  const [logs, setLogs] = useState([]);
  const [socket, setSocket] = useState('');
  const [username, setUsername] = useState('');


  const toggleSelectedComp = (compId) => {
    if (!selectedComps.has(compId)) {
      setSelectedComps(prev => new Set(prev.add(compId)));
    } else {
      setSelectedComps(prev => new Set([...prev].filter(x => x !== compId)));
      toogleRoomComp(compId);
    }
  };

  const toogleRoomComp = (compId, val = false) => {
    if (!roomComponent.has(compId) && val !== false) {
      setRoomComponent(prev => new Set(prev.add(compId)));
      if (socket) {
        socket.emit('join stream room', {
          controlId: compId,
          userId: username
        });
      }
    } else if (roomComponent.has(compId)) {
      setRoomComponent(prev => new Set([...prev].filter(x => x !== compId)));
      if (socket) {
        socket.emit("leave stream room", {
          controlId: compId,
          userId: username
        });
      }
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

  const toggleShowInfoWindow = () => {
    setShowInfoWindow(!showInfoWindow);
  }

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }

  const toggleCam = () => {
    setShowCam(!showCam);
    toggleSelectedComp('Overview')
  }

  const toggleShowLED = (newVal) => {
    setShowLED(newVal);
  }

  const toggleShowBeam = (newVal) => {
    setShowBeam(newVal);
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
        roomComponent,
        setRoomComponent,
        toogleRoomComp,
        showLED,
        toggleShowLED,
        socket,
        setSocket,
        username,
        setUsername
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

import React, { useState, useContext } from "react";

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext);
}

/**
 * AppContext
 * 
 * @description This React component is the highest according to the hiearchie. It can be imported within every React component 
 * and contains the globally most important variables. For example for the display of the component windows,
 * all the function are andles of the navigation bar etc. 
 * 
 * @returns {React.Context} App context
 */
export function AppContextProvider({ children }) {
  const [underConstruction, setUnderConstruction] = useState(false);
  const [roomComponent, setRoomComponent] = useState(new Set());
  const [showVirtualLayer, setShowVirtualLayer] = useState(false);
  const [selectedComps, setSelectedComps] = useState(new Set());
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [lightSource, setLightSource] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showBeam, setShowBeam] = useState('off');
  const [showTags, setShowTags] = useState(true);
  const [showCam, setShowCam] = useState(false);
  const [showLED, setShowLED] = useState('none');
  const [logs, setLogs] = useState([]);
  const [socket, setSocket] = useState('');
  const [username, setUsername] = useState('');

  // Contains all the controlIds of the component windows, which are currently open
  const toggleSelectedComp = (compId) => {
    //Adds controlId to set, when a component window is opened
    if (!selectedComps.has(compId)) {
      setSelectedComps(prev => new Set(prev.add(compId)));
      // Removes controlId of a window, whenever it is closed
    } else {
      setSelectedComps(prev => new Set([...prev].filter(x => x !== compId)));
      toogleRoomComp(compId);
    }
  };

  /**
   * Data recieving controlIds set
   * 
   * @description This function adds or removes the controlIds of a data recieving window, if it is openns or closed.
   * controlId is added, when this function is called within a React component after the import of this ContextProvider
   * and is removed, wheather the toggleSelectedComp function is called.
   * 
   * @param {string} compId - controlId  
   * @param {boolean} val - prevents the mutiple calling of this function
   */
  const toogleRoomComp = (compId, val = false) => {
    try {
      // Adds a new controlId to the set and sends join stream room events
      if (!roomComponent.has(compId) && val !== false) {
        setRoomComponent(prev => new Set(prev.add(compId)));

        socket.emit('join stream room', {
          controlId: compId,
          userId: username
        });

        // Removes controlId from the set and sends leave stream room events
      } else if (roomComponent.has(compId)) {
        setRoomComponent(prev => new Set([...prev].filter(x => x !== compId)));

        socket.emit("leave stream room", {
          controlId: compId,
          userId: username
        });
      }
    } catch (e) { }
  }

  // Switches between the 2D (OverviewCam) and 3D (experiment visualisation) VirtualLayer
  const toggleShowVirtualLayer = () => {
    setShowVirtualLayer(!showVirtualLayer);
  };

  // Operats the display of the labels and descriptions of the experiment components
  const toggleShowTags = () => {
    setShowTags(!showTags)
  }

  // Adds a new log entry to the existing log
  const addLog = (log) => {
    setLogs(prev => [log, ...prev])
  };

  // For displaying the beam path within the 3D visualisation
  const toggleShowBeam = (newVal) => {
    setShowBeam(newVal);
  }

  // For displaying the beam path of the white and red within the 3D visualisation
  const toggleShowLED = (newVal) => {
    setShowLED(newVal);
  }

  // Handles the display of the Information window
  const toggleShowInfoWindow = () => {
    setShowInfoWindow(!showInfoWindow);
  }

  // Handles the display of the Login window
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }

  // Handles the display of the OverviewCam window
  const toggleCam = () => {
    setShowCam(!showCam);
    toggleSelectedComp('Overview')
  }

  // Displays the underConstruction information in the navigation bar
  const toggleunderConstruction = (newVal) => {
    setUnderConstruction(newVal)
  }

    // To turn the light source next to the experiment on or off
    const toggleHandleLightSource = () => {
      setLightSource(!lightSource)
  
      socket.emit("command", {
        controlId: 'relay_light',
        userId: username,
        switch: lightSource
      });
  
    }

  // Contains all variables, which can be accessed within a React component, if this ContextProvider is imported
  return (
    <AppContext.Provider
      value={{
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
        setUsername,
        underConstruction,
        toggleunderConstruction,
        lightSource,
        toggleHandleLightSource,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

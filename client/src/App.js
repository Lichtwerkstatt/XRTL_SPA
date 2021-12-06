import {SocketContext, socket} from './services/socket';
import Child from './Chat/Chat_old';
import AppTemp from './AppTemp';
import React from 'react';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <AppTemp />

    </SocketContext.Provider>
  );
}
export default App;
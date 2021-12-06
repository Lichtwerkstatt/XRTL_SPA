import {SocketContext, socket} from './services/socket';
import Child from './Chat/Chat_old';
import React from 'react';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Child />

    </SocketContext.Provider>
  );
}
export default App;
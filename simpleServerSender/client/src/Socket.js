import React from "react";
import socket from "socket.io-client";

const useSocket = (serverUrl, topic) => {
  const [temp, setTemp] = React.useState(0);
  const [isConnected, setConnected] = React.useState(false);
  const [socketClient, setSocketClient] = React.useState(null)

  React.useEffect(() => {
    if(!isConnected){

      let thisSocketClient = socket.connect(serverUrl);
      thisSocketClient.on("connect", () => setConnected(true));
      thisSocketClient.on("disconnect", () => setConnected(false));
      thisSocketClient.on(topic, data => {
        setTemp(data);
      });
      setSocketClient(thisSocketClient)
    }
  }, [topic]);

  return { temp, isConnected, socketClient };
};


const SocketConsumer = ({ serverUrl, topic }) => {
  const { temp, isConnected, socketClient } = useSocket(serverUrl, topic);

  const clickHandler = () => {
    console.log('clicked evA!');
    socketClient.emit('evA')
  }

  const clickHandlerTwo = () => {
    console.log('clicked evB!');
    socketClient.emit('evB')
  }

  return (
    <div>
      <h4>Temperature</h4>
      <h1>{temp}</h1>
      <h3>{`CONNECTED: ${isConnected}`}</h3>
      <button onClick={clickHandler}>Send EventA!</button>
      <button onClick={clickHandlerTwo}>Send EventB!</button>
    </div>
  );
};

export default SocketConsumer;

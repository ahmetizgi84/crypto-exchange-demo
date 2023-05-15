import React, { useState, useCallback, useMemo, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Link } from "react-router-dom";

export default function WebSocketDemo() {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("wss://echo.websocket.org");
  const messageHistory = useRef([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastMessage),
    [lastMessage]
  );

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("wss://demos.kaazing.com/echo"),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <>
      <div className="error-page vh-100 d-flex justify-content-center text-center">
        <div className="my-auto">
          <h2>404</h2>
          <p>Oops something went wrong</p>
          <Link to="/" className="btn">
            Back to Home <i className="icon ion-md-home"></i>
          </Link>
          <button onClick={handleClickChangeSocketUrl}>
            Click Me to change Socket Url
          </button>
          <button
            onClick={handleClickSendMessage}
            disabled={readyState !== ReadyState.OPEN}
          >
            Click Me to send 'Hello'
          </button>
          <span>The WebSocket is currently {connectionStatus}</span>
          {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
          <ul>
            {messageHistory.current.map((message, idx) => (
              <span key={idx}>{message.data}</span>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

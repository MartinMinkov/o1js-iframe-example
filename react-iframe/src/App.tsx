import React, { useState, useEffect, useRef } from "react";

function App() {
  if (window.crossOriginIsolated) {
    console.log("Embed Cross-origin isolation is enabled!");
  } else {
    console.log("Embed Cross-origin isolation is NOT enabled!");
  }

  const iframeRef = useRef(null);

  const [messageFromIframe, setMessageFromIframe] = useState("");

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === "http://localhost:3000") {
        setMessageFromIframe(event.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const sendMessageToIframe = () => {
    iframeRef.current.contentWindow.postMessage(
      "Hello from parent!",
      "http://localhost:3000"
    );
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        allow="cross-origin-isolated"
        src="http://localhost:3000"
        width={1000}
        height={1000}
      />
      <button onClick={sendMessageToIframe}>Send Message to Iframe</button>
      <div>{messageFromIframe}</div>
    </>
  );
}

export default App;

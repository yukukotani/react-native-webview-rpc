import { useRef } from "react";
import WebView from "react-native-webview";
import { useWebViewRpcHandler } from "../../packages/native/src/index";

const rpcs = {
  async alert() {},
};

export default function App() {
  const ref = useRef<WebView>(null);
  const onMessage = useWebViewRpcHandler(ref, rpcs);

  return (
    <WebView
      ref={ref}
      onMessage={onMessage}
      source={{ uri: "http://localhost:5173" }}
    />
  );
}

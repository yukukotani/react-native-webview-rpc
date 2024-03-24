import { wrap } from "@react-native-webview-rpc/web";
import "./App.css";
import type { WebViewRpcs } from "../../native/App";
import { useState } from "react";

const rpc = wrap<WebViewRpcs>();

function App() {
  const [result, setResult] = useState<"ok" | "cancel">();

  const onClickButton = async () => {
    const res = await rpc.confirmAlert(
      "Alert from WebView",
      "This is fired from WebView and rendered in native"
    );
    setResult(res);
  };

  return (
    <>
      <h1>This is rendered in WebView</h1>
      <div className="card">
        <button onClick={onClickButton}>Show native alert through RPC</button>
      </div>
      <span>Result: {result}</span>
    </>
  );
}

export default App;

import { useRef } from "react";
import WebView from "react-native-webview";
import { useWebViewRpcHandler } from "@react-native-webview-rpc/native";
import { Alert } from "react-native";

const rpcs = {
  async confirmAlert(title: string, body: string): Promise<"ok" | "cancel"> {
    return await new Promise((resolve) => {
      Alert.alert(title, body, [
        {
          text: "Cancel",
          style: "cancel",
          onPress() {
            resolve("cancel");
          },
        },
        {
          text: "OK",
          onPress() {
            resolve("ok");
          },
        },
      ]);
    });
  },
};

export type WebViewRpcs = typeof rpcs;

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

import * as Comlink from "comlink";

export const webViewRpcEndpoint: Comlink.Endpoint = {
  postMessage: (data) => {
    console.debug("[webview:req]", data);
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  },
  addEventListener: (_, listener, ...args) => {
    document.addEventListener("ReactNativeWebViewCallback", listener, ...args);
  },
  removeEventListener: (_, listener) => {
    document.removeEventListener("ReactNativeWebViewCallback", listener);
  },
};

declare global {
  interface Window {
    // Exposed by react-native-webview
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

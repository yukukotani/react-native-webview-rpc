# React Native WebView RPC

React Native WebView RPC allows type-safe calls of React Native functions from JavaScript inside WebView.

## Installation

### Native side

```bash
npm install @react-native-webview-rpc/native
npm install react-native-webview comlink # peer dependencies
```

### Web side

```bash
npm install @react-native-webview-rpc/web
npm install comlink # peer dependencies
```

## Usage

### Native side

First, you need to define functions that you want to expose to the WebView. You should also export the type of functions that will be imported from the web side later.

```tsx
// rpcs.tsx
import { Alert } from "react-native";
const rpcs = {
  async alert(title: string, body: string) {
    Alert.alert(title, body);
    return "ok";
  },
};

export type WebViewRpcs = typeof rpcs;
```

Then, create a message handler by `useWebViewRpcHandler` and pass it to WebView component.

```tsx
import { useRef } from "react";
import WebView from "react-native-webview";
import { useWebViewRpcHandler } from "@react-native-webview-rpc/native";
import { rpcs } from "./rpcs";

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
```

### Web side

Import the type of native functions that is exported from the native side. Then, call `wrap` to create a proxy object that can call native functions.

```tsx
import type { WebViewRpcs } from "../native/rpcs";
import { wrap } from "@react-native-webview-rpc/web";
const rpcs = wrap<WebViewRpcs>();
```

Now you can call native functions from the web side.

```tsx
const result = await rpcs.alert("Hello", "World");
```

## Example

You can find the full example in the `examples` directory.

![CleanShot 2024-03-25 at 00 37 01](https://github.com/yukukotani/react-native-webview-rpc/assets/16265411/1290ab39-0807-40c4-b0d0-153d52f9a512)

## FAQ

### `Failed to return RPC response to WebView via postMessage`

In some cases, like when the RPC closes the WebView, it's expected that the RPC cannot return the response to the WebView since it's already closed. In this case, you can ignore the error by returning `SYMBOL_IGNORING_RPC_RESPONSE_ERROR` from the RPC.

```tsx
import { SYMBOL_IGNORING_RPC_RESPONSE_ERROR } from "@react-native-webview-rpc/native";

const rpcs = {
  async closeWebView() {
    router.dismiss();
    return SYMBOL_IGNORING_RPC_RESPONSE_ERROR;
  },
};
```

## Related projects

- [rn-webview-rpc](https://github.com/ronhe/rn-webview-rpc): The great prior art, but is built for old things (e.g. class component, JavaScriptCore, etc.)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview): React Native WebView RPC is built on top of React Native WebView's messaging system.
- [Comlink](https://github.com/GoogleChromeLabs/comlink): React Native WebView RPC's function style messaging is provided by Comlink.

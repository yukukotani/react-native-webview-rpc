import * as Comlink from "comlink";
import { RefObject, useCallback, useEffect, useRef } from "react";
import WebView, { WebViewProps } from "react-native-webview";
import { WebViewEndpoint, createWebViewRpcEndpoint } from "./endpoint";

/**
 * Returns a handler of RPC message from WebView.
 */
export function useWebViewRpcHandler<Rpcs>(
  webViewRef: RefObject<WebView>,
  rpcs: Rpcs
) {
  const endpointRef = useRef<WebViewEndpoint>();
  const onMessage: WebViewProps["onMessage"] = useCallback(
    (e) => {
      endpointRef.current?.onMessage(e);
    },
    [endpointRef]
  );

  useEffect(() => {
    const endpoint = createWebViewRpcEndpoint(webViewRef);
    endpointRef.current = endpoint;

    Comlink.expose(rpcs, endpoint);

    return () => {
      endpointRef.current = undefined;
    };
  }, [webViewRef, rpcs]);

  return onMessage;
}

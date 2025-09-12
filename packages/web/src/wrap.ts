import * as Comlink from "comlink";
import { webViewRpcEndpoint } from "./endpoint";

export function wrap<Rpcs>(): Comlink.Remote<Rpcs> {
  return Comlink.wrap<Rpcs>(webViewRpcEndpoint, {});
}

export function safeWrap<Rpcs>(): Comlink.Remote<Rpcs> | null {
  if (typeof window.ReactNativeWebView === "undefined") {
    return null;
  }
  return wrap<Rpcs>();
}

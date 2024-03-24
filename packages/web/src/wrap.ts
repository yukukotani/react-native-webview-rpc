import * as Comlink from "comlink";
import { webViewRpcEndpoint } from "./endpoint";

export function wrap<Rpcs>(): Comlink.Remote<Rpcs> {
  return Comlink.wrap<Rpcs>(webViewRpcEndpoint, {});
}

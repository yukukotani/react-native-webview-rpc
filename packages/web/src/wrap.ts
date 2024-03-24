import * as Comlink from "comlink";
import { webViewRpcEndpoint } from "./endpoint";

export function wrap<Rpcs>(rpcs: Rpcs): Comlink.Remote<Rpcs> {
  return Comlink.wrap(webViewRpcEndpoint, rpcs);
}

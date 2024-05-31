import { IncomingHttpHeaders, ServerHttp2Stream } from "node:http2";

export default class Middleware {
  readonly option: option;

  constructor(obj?: option) {
    if (obj) this.option = obj;
    else this.option = defaultOption;
  }

  check(stream: ServerHttp2Stream, HEADERS: IncomingHttpHeaders): boolean {
    return true;
  }
}

type option = {
  path: string;
  name: string;
  protocol: "http" | "https" | "all";
  method: string | string[];
};

const defaultOption: option = {
  path: "/",
  name: "Default",
  protocol: "https",
  method: "ALL",
};

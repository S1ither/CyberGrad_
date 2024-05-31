import { IncomingHttpHeaders } from "node:http2";
import ServerStream from "../CORE/ServerStream.mjs";

export default class Controller {
  readonly option: option;

  constructor(obj?: option) {
    this.option = obj ?? defaultOption;
  }

  do(serverStream: ServerStream, HEADERS: IncomingHttpHeaders): void {
    serverStream.render("<h1>Hello World!</h1>", {});
  }
}

type option = {
  path: string;
  name: string;
  protocol: "http" | "https" | "all";
  method: string | string[] | "ALL";
};

const defaultOption: option = {
  path: "/",
  name: "Default",
  protocol: "https",
  method: "ALL"
};

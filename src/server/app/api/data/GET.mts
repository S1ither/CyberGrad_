import { IncomingHttpHeaders } from "node:http2";
import Controller from "../../../bin/CORE/Controller.mjs";
import ServerStream from "../../../bin/CORE/ServerStream.mjs";

export default class AboutController extends Controller {
  constructor() {
    super({
      method: "GET",
      name: "init",
      path: "/api",
      protocol: "https",
    });
  }

  do(stream: ServerStream, HEADERS: IncomingHttpHeaders): void {
    stream.render("index.html");
  }
}

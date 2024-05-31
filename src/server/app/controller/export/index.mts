import { IncomingHttpHeaders } from "node:http2";
import Controller from "../../../bin/CORE/Controller.mjs";
import ServerStream from "../../../bin/CORE/ServerStream.mjs";

export default class ExportController extends Controller {
  constructor() {
    super({
      method: "GET",
      name: "init",
      path: "/export",
      protocol: "https",
    });
  }

  do(stream: ServerStream, HEADERS: IncomingHttpHeaders): void {
    stream.render("export/index.html");
  }
}

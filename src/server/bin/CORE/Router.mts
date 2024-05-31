import { existsSync } from "node:fs";
import { IncomingHttpHeaders, ServerHttp2Stream } from "node:http2";
import { join } from "node:path";
import CollectorApp from "./CollectorApp.mjs";
import Controller from "./Controller.mjs";
import ServerStream from "./ServerStream.mjs";
import { requestBodyParse } from "../../types/index.mjs";

export default class Router {
  private _controller: Controller[] = [];

  constructor() {
    new Promise(async () => {
      this._controller.push(
        ...(await CollectorApp.controllerDepthScan(
          join(process.cwd(), "src", "server", "app", "controller")
        ))
      );
    });
    new Promise(async () => {
      this._controller.push(
        ...(await CollectorApp.controllerDepthScan(
          join(process.cwd(), "src", "server", "app", "api")
        ))
      );
    });
  }

  public exec(
    stream: ServerHttp2Stream,
    HEADERS: IncomingHttpHeaders,
    body: requestBodyParse[]
  ) {
    if (
      HEADERS[":path"]?.split("/")[1] &&
      ["css", "js", "img", "font", "svg"].some(
        (v) => v == HEADERS[":path"]?.split("/")[1]
      )
    )
      if (
        existsSync(
          join(process.cwd(), "src", "client", decodeURI(HEADERS[":path"]!))
        )
      )
        stream.respondWithFile(
          join(process.cwd(), "src", "client", decodeURI(HEADERS[":path"]!))
        );
      else stream.end();
    else {
      const serverStream = new ServerStream(stream, body);
      this.find(HEADERS[":path"] ?? "/", HEADERS[":method"] ?? "GET")?.do(
        serverStream,
        HEADERS
      );
    }
  }

  public find(path: string, method: string): Controller | undefined {
    for (const controller of this._controller)
      if (
        controller.option.path == path &&
        (controller.option.method.toString().toUpperCase() ==
          method.toUpperCase() ||
          controller.option.method.toString().toUpperCase() == "ALL")
      )
        return controller;
    return undefined;
  }
}

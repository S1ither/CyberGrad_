import { ServerHttp2Stream } from "node:http2";
import { join } from "node:path";
import { HttpHeader, requestBodyParse, resJSON } from "../../types/index.mjs";
import HTMLBuilder from "./HTMLBuilder.mjs";
import { readFileSync, writeFileSync } from "node:fs";

export default class ServerStream {
  private _stream: ServerHttp2Stream;
  private _HTMLBuilder: HTMLBuilder = new HTMLBuilder(
    join(process.cwd(), "src", "client")
  );
  private _headers: HttpHeader = {};

  public readonly body: requestBodyParse[] | undefined;

  constructor(stream: ServerHttp2Stream, body: requestBodyParse[]) {
    this._stream = stream;
    this.body = body;
    Object.freeze(this.body)
  }


  public render(pathToHTML: string, header?: HttpHeader): void {
    const renderedFile =
      this._HTMLBuilder.render(join("html", pathToHTML)) || "error";
    this.end(renderedFile);
  }

  public sendJSON(json: resJSON, header?: HttpHeader): void {
    this.end(JSON.stringify(json), header);
  }

  public end(obj: any = undefined, header: HttpHeader = {}): void {
    let baseHeader = {
      "Access-Control-Allow-Origin": "https://localhost",
      "Access-Control-Request-Header": "X-Requested-With",
      "Access-Control-Allow-Methods": ["POST", "GET", "OPTIONS", "DELETE"],
      "Access-Control-Allow-Headers": "*",
    };
    this.setHeaders(baseHeader);
    this.setHeaders(header);
    this._stream.respond(JSON.parse(JSON.stringify(this._headers)));
    this._stream.end(obj);
  }

  public setHeaders(header: HttpHeader): void {
    this._headers = header;
    return void 0;
  }
}

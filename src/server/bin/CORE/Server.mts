import { readFileSync } from "node:fs";
import https from "node:http2";
import { join } from "node:path";
import { ServerOption, requestBodyParse } from "../../types/index.mjs";
import Router from "./Router.mjs";
//import DB from "../../db/index.mjs";
import { parseDataFromDB } from "../../function/parseDataFromDB.mjs";
//import { DataSource } from "mikro-orm";

export default class Server {
  private _DB: DataSource | undefined = undefined;
  private _option: ServerOption = {
    ssl: {
      key: readFileSync(
        join(process.cwd(), "src", "server", "bin", "ssl", "miruki.key"),
        {
          encoding: "utf8",
        }
      ),
      cert: readFileSync(
        join(process.cwd(), "src", "server", "bin", "ssl", "miruki.crt"),
        {
          encoding: "utf8",
        }
      ),
      passphrase: "",
      alowHTTP1: true,
    },
    port: 443,
    host: "localhost",
    staticPath: join(process.cwd()),
  };
  private _router = new Router();

  constructor() {}

  public get option(): ServerOption {
    return this._option;
  }
  public set option(v: ServerOption) {
    this._option = v;
  }

  private async db() {
  }

  private syncDateOnService() {
    this.db();
    setTimeout(() => {
      parseDataFromDB();
    }, 3600);
  }

  public launch(): void {
    //this._option.db && new DB(this._option.db).connect()
    this.syncDateOnService();
    https
      .createSecureServer(this._option.ssl)
      .listen(this._option.port, this._option.host, () =>
        console.log("Server running!")
      )
      .on("stream", (stream, HEADERS) => {
        let bodyRaw: string[] = [];
        let bodyParse: requestBodyParse[] = [];
        stream
          .setEncoding("utf-8")
          .on("data", (chunk: string) => {
            if (chunk.length > 0) {
              bodyRaw.push(...chunk.split("Content-Disposition: "));
            }
          })
          .on("end", () => {
            let cache;
            for (const item of bodyRaw) {
              cache = item.match(
                /name=(?<name>.*)\r\n(?<filename>.*)\r\n(?<value>.*)\r\n.*W/
              );
              if (cache && cache.groups)
                bodyParse.push({
                  name: cache[1].slice(1, -1),
                  filename: cache[2],
                  value: cache[3],
                });
            }
            this._router.exec(stream, HEADERS, bodyParse);
          });
      });
  }
}

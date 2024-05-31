import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export default class HTMLBuilder {
  private _staticPathDir: string;
  public get staticPathDir(): string {
    return this._staticPathDir;
  }
  public set staticPathDir(v: string) {
    this._staticPathDir = v;
  }

  /**
   * @param staticPath path to client dir html
   */
  constructor(staticPath: string) {
    this._staticPathDir = staticPath;
  }

  public render(pathToFile: string) {
    let file = readFileSync(join(this._staticPathDir, pathToFile), {
      encoding: "utf8",
    });
    let endPoint: boolean = true;
    while (endPoint) {
      const match = file.match(/^\s*@(param|file)\((.*)\)$/m);
      if (
        match &&
        match[1] == "file" &&
        existsSync(join(this._staticPathDir, "html", match[2] + ".html"))
      )
        file = file.replace(
          `@${match[1]}(${match[2]})`,
          readFileSync(join(this._staticPathDir, "html", match[2] + ".html"), {
            encoding: "utf-8",
          })
        );
      else endPoint = false;
    }
    return file;
  }
}

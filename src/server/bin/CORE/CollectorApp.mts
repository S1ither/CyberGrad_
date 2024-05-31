import { lstatSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Controller from "./Controller.mjs";

export default class CollectorApp {
  public static async controllerDepthScan(path: string): Promise<Controller[]> {
    const files = readdirSync(path);
    const controllers: Controller[] = [];
    for (const file of files) {
      if (lstatSync(join(path, file)).isDirectory()) {
        controllers.push(...(await this.controllerDepthScan(join(path, file))));
      } else {
        const controller = new (
          await import(join("file:///", path, file))
        ).default();
        controllers.push(controller);
      }
    }
    return controllers;
  }
}

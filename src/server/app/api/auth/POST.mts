import { IncomingHttpHeaders } from "node:http2";
import Controller from "../../../bin/CORE/Controller.mjs";
import ServerStream from "../../../bin/CORE/ServerStream.mjs";
import { resJSON } from "../../../types/index.mjs";
import { readFileSync } from "path";

export default class AboutController extends Controller {
  constructor() {
    super({
      method: "POST",
      name: "auth",
      path: "/api/auth",
      protocol: "https",
    });
  }

  do(stream: ServerStream, HEADERS: IncomingHttpHeaders): void {
    const res: resJSON = {
      message: "token=sjdhkfyj:th346fdfh-sefr3ge245-adva245vg2sf45g-terqr24t2r",
      code: 200,
      obj: {},
    };
    stream.sendJSON(res, {
      "Set-Cookie": `token=sjdhkfyj:th346fdfh-sefr3ge245-adva245vg2sf45g-terqr24t2r;domain=localhost;expires=${new Date(
        Date.now() + 86400e3
      ).toUTCString()};httpOnly=True`,
    });
  }
}

import {join} from "node:path"
import Server from "./bin/CORE/Server.mjs";

const serv = new Server();

serv.option.port = 443
serv.option.host = "localhost"

serv.launch();

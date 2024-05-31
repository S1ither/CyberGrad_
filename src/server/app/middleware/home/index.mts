import { IncomingHttpHeaders, ServerHttp2Stream } from "node:http2";
import Middleware from "../../../bin/CORE/Middleware.mjs";

export default class HomeMiddleware extends Middleware{
	constructor(){
		super()
	}

	check(stream: ServerHttp2Stream, HEADERS: IncomingHttpHeaders){
		return true
	}
}
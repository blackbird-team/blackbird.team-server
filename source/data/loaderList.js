import Server from "~/server";

const LoaderList = [{
	step: 0,
	parts: [{
		name: "server",
		type: "init",
		controller: Server
	}]
}]

export default LoaderList;
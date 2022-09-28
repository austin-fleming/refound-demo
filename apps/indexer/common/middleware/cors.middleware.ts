import cors = require("cors");

export default (origins: string[]) =>
	cors({
		// TODO: possibly harden this depending on if API should be public.
		origin: origins,
	});

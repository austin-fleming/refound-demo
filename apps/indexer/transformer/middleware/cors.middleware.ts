import cors = require("cors");
import config from "@transformer/config";

export default cors({
	// TODO: possibly harden this depending on if API should be public.
	origin: config.cors.origins,
});

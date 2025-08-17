import { envs } from "./envs/index.js";
import { createServer } from "./server.js";

createServer(envs.PORT);

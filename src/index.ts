import * as dotenv from "dotenv";

import { createApp } from "./server.js";

dotenv.config();

const app = createApp();

app.listen(process.env.PORT, () => {
  console.log("🚀 Server ready at: http://localhost:3000");
});

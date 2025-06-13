import app from "./app";
import config from "./config/config";

app
  .listen(config.port, () => {
    console.log(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });

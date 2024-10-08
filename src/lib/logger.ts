import pino, { Logger } from "pino";

      const getLogger = (): Logger => {
        switch (process.env["NODE_ENV"]) {
          case "production":
            // JSON logging in production with warnings and above
            return pino({ level: "warn" });
      
          case "test":
            // Silent logging in test
            return pino({ level: "silent" });
      
          default:
            // Pretty print in development with debug level logging
            return pino({
              transport: {
                target: "pino-pretty",
                options: {
                  colorize: true,
                },
              },
              level: "debug",
            });
        }
      };
      
      export const logger: Logger = getLogger();
      
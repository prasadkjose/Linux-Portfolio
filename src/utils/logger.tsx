const logger = {
  log: (message: string) => {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
  },
  info: (message: string) => {
    console.info(`[INFO] ${new Date().toISOString()}: ${message}`);
  },

  error: (message: string) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
  },

  warn: (message: string) => {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
  },
};

export default logger;

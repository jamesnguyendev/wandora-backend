export const logger = {
  info: (message: string | any) => console.log(`[INFO] ===>: ${message}`),
  error: (message: string, err?: any) =>
    console.error(`[ERROR]: ${message}`, err),
};

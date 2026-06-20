export class Logger {
  info(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()} ${message}`);
  }

  error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${new Date().toISOString()} ${message}`);

    if (error instanceof Error) {
      console.error(error.stack ?? error.message);
      return;
    }

    if (error) {
      console.error(String(error));
    }
  }
}

export const logger = new Logger();

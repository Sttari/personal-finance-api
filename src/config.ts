const requiredEnv = (name:string) : string => {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const config = {
    databaseUrl: requiredEnv('DATABASE_URL'),
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV ?? 'development',
} as const;
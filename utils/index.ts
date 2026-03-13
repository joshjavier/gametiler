/**
 * Returns the value of an environment variable or throws if it is not set.
 * @param key - The name of the environment variable
 * @returns The value of the environment variable
 * @throws {Error} If the environment variable is not set
 */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined) throw new Error(`Missing required environment variable: "${key}"`);
  return value;
}

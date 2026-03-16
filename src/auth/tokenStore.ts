import NodeCache from "node-cache";
import { logger } from "../utils/logger";

export interface TokenSet {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp ms
  zohoPortalId?: string;
}

// TTL-backed in-memory store. Replace with Redis/Key Vault for production.
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 300 });

/**
 * Persist a token set for a Teams user.
 * Key = AAD Object ID (activity.from.aadObjectId)
 */
export function storeTokens(userId: string, tokens: TokenSet): void {
  cache.set(userId, tokens);
  logger.debug(`Stored tokens for user ${userId}`);
}

/**
 * Retrieve stored token set for a user.
 */
export function getTokens(userId: string): TokenSet | null {
  return cache.get<TokenSet>(userId) ?? null;
}

/**
 * Delete tokens (e.g. on sign-out).
 */
export function deleteTokens(userId: string): void {
  cache.del(userId);
  logger.debug(`Deleted tokens for user ${userId}`);
}

/**
 * Check whether the stored access token is still valid (>5 min buffer).
 */
export function isAccessTokenValid(tokens: TokenSet): boolean {
  const fiveMinMs = 5 * 60 * 1000;
  return Date.now() < tokens.expiresAt - fiveMinMs;
}

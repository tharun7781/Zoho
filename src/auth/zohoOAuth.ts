import axios from "axios";
import { config } from "../config/config";
import { logger } from "../utils/logger";
import {
  storeTokens,
  getTokens,
  isAccessTokenValid,
  TokenSet,
} from "./tokenStore";

/** Build the Zoho OAuth authorization URL to redirect users to */
export function getAuthorizationUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.zoho.clientId,
    redirect_uri: config.zoho.redirectUri,
    scope: config.zoho.scopes,
    access_type: "offline",
    state,
  });
  return `${config.zoho.accountsUrl}/oauth/v2/auth?${params.toString()}`;
}

/** Exchange an authorization code for access + refresh tokens */
export async function exchangeCodeForTokens(
  code: string,
  userId: string
): Promise<TokenSet> {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: config.zoho.clientId,
    client_secret: config.zoho.clientSecret,
    redirect_uri: config.zoho.redirectUri,
    code,
  });

  const response = await axios.post(
    `${config.zoho.accountsUrl}/oauth/v2/token`,
    params.toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const data = response.data;
  if (data.error) throw new Error(`Zoho OAuth error: ${data.error}`);

  const tokens: TokenSet = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  storeTokens(userId, tokens);
  logger.info(`OAuth tokens stored for user ${userId}`);
  return tokens;
}

/** Refresh an expired access token using the stored refresh token */
export async function refreshAccessToken(userId: string): Promise<TokenSet> {
  const existing = getTokens(userId);
  if (!existing) throw new Error("No token found for user — please sign in.");

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: config.zoho.clientId,
    client_secret: config.zoho.clientSecret,
    refresh_token: existing.refreshToken,
  });

  const response = await axios.post(
    `${config.zoho.accountsUrl}/oauth/v2/token`,
    params.toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const data = response.data;
  if (data.error) throw new Error(`Token refresh failed: ${data.error}`);

  const refreshed: TokenSet = {
    ...existing,
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  storeTokens(userId, refreshed);
  logger.debug(`Access token refreshed for user ${userId}`);
  return refreshed;
}

/** Get a valid access token, refreshing if needed */
export async function getValidAccessToken(userId: string): Promise<string> {
  let tokens = getTokens(userId);
  if (!tokens) throw new Error("User not authenticated. Please sign in to Zoho.");

  if (!isAccessTokenValid(tokens)) {
    logger.info(`Token expired for user ${userId}, refreshing…`);
    tokens = await refreshAccessToken(userId);
  }

  return tokens.accessToken;
}

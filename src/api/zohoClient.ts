import axios, { AxiosInstance, AxiosError } from "axios";
import { config } from "../config/config";
import { getValidAccessToken, refreshAccessToken } from "../auth/zohoOAuth";
import { logger } from "../utils/logger";

/** Create an Axios instance with Zoho auth headers injected */
export function createZohoClient(userId: string): AxiosInstance {
  const client = axios.create({
    baseURL: config.zoho.apiBaseUrl,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
  });

  // Inject Bearer token before every request
  client.interceptors.request.use(async (req) => {
    const token = await getValidAccessToken(userId);
    req.headers.Authorization = `Zoho-oauthtoken ${token}`;
    return req;
  });

  // On 401 try one token refresh, then fail gracefully
  client.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        logger.warn(`401 from Zoho — attempting token refresh for ${userId}`);
        try {
          await refreshAccessToken(userId);
          const token = await getValidAccessToken(userId);
          if (error.config) {
            error.config.headers.Authorization = `Zoho-oauthtoken ${token}`;
            return axios(error.config);
          }
        } catch {
          throw new Error("Session expired. Please sign in again with /signin.");
        }
      }
      if (error.response?.status === 403) {
        throw new Error(
          "Access denied — you do not have permission to perform this action."
        );
      }
      throw error;
    }
  );

  return client;
}

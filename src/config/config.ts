import * as dotenv from "dotenv";
dotenv.config();

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}
const opt = (name: string, fb: string) => process.env[name] ?? fb;

export const config = {
  bot: {
    appId: opt("MICROSOFT_APP_ID", "DEMO_APP_ID"),
    appPassword: opt("MICROSOFT_APP_PASSWORD", "DEMO_PASSWORD"),
    tenantId: opt("MICROSOFT_APP_TENANT_ID", "common"),
  },
  zoho: {
    // Mock mode: no real Zoho credentials needed for demo
    useMockData: opt("ZOHO_USE_MOCK", "true") === "true",
    clientId: opt("ZOHO_CLIENT_ID", ""),
    clientSecret: opt("ZOHO_CLIENT_SECRET", ""),
    redirectUri: opt("ZOHO_REDIRECT_URI", "http://localhost:3978/auth/zoho/callback"),
    accountsUrl: opt("ZOHO_ACCOUNTS_URL", "https://accounts.zoho.com"),
    apiBaseUrl: opt("ZOHO_API_BASE_URL", "https://projectsapi.zoho.com/restapi"),
    scopes: "ZohoProjects.portals.READ,ZohoProjects.projects.READ,ZohoProjects.tasks.ALL,ZohoProjects.users.READ",
  },
  groq: {
    apiKey: opt("GROQ_API_KEY", ""),
    model: opt("GROQ_MODEL", "llama-3.3-70b-versatile"),
  },
  server: {
    port: parseInt(opt("PORT", "3978"), 10),
    dashboardPort: parseInt(opt("DASHBOARD_PORT", "4000"), 10),
    nodeEnv: opt("NODE_ENV", "development"),
    publicUrl: opt("BOT_PUBLIC_URL", "http://localhost:3978"),
  },
  logLevel: opt("LOG_LEVEL", "info"),
};

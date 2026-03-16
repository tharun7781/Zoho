import express from "express";
import * as dotenv from "dotenv";
import { CloudAdapter, ConfigurationServiceClientCredentialFactory, createBotFrameworkAuthenticationFromConfiguration } from "botbuilder";
import { TeamsBot } from "./bot/teamsBot";
import { config } from "./config/config";
import { logger } from "./utils/logger";

import { startDashboard } from "./dashboard/server";

dotenv.config();

const server = express();
server.use(express.json());

// 0. Landing Page (prevent "Cannot GET /")
server.get("/", (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; padding: 40px; text-align: center;">
            <h1 style="color: #38bdf8;">Zoho Projects Bot Server</h1>
            <p>Bot Endpoint: <code>/api/messages</code></p>
            <p>Dashboard: <a href="http://localhost:4000">http://localhost:4000</a></p>
            <p style="color: #666; font-size: 0.9rem;">Status: Running</p>
        </div>
    `);
});

// 0.1 Auth Success Page (for demo flow)
server.get("/auth/success", (req, res) => {
    res.send(`
        <div style="font-family: 'Outfit', sans-serif; padding: 60px; text-align: center; background: #0f172a; color: white; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="background: #10b981; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                <span style="font-size: 40px; color: white;">✓</span>
            </div>
            <h1 style="color: #10b981;">Authentication Successful</h1>
            <p style="font-size: 1.2rem; color: #94a3b8; max-width: 400px;">Your Zoho/SAP account is now connected to Microsoft Teams.</p>
            <p style="margin-top: 20px;"><a href="http://localhost:4000" style="color: #38bdf8; text-decoration: none; border: 1px solid #38bdf8; padding: 10px 20px; border-radius: 8px;">Explore Dashboard</a></p>
        </div>
    `);
});

// 1. Create Bot Adapter & Bot instance
const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: config.bot.appId,
    MicrosoftAppPassword: config.bot.appPassword,
    MicrosoftAppTenantId: config.bot.tenantId
});

const botAuth = createBotFrameworkAuthenticationFromConfiguration(null, credentialsFactory);
const adapter = new CloudAdapter(botAuth);

adapter.onTurnError = async (context, error) => {
    logger.error(`[onTurnError] unhandled error: ${error}`);
    await context.sendActivity("The bot encountered an error or bug. Sorry!");
};

const bot = new TeamsBot();

// 2. Bot Message Endpoint
server.post("/api/messages", async (req, res) => {
    await adapter.process(req, res, (context) => bot.run(context));
});

// 3. Health check
server.get("/health", (req, res) => res.send({ status: "ok", time: new Date() }));

// 4. Start Both Servers
const port = config.server.port;
server.listen(port, () => {
    logger.info(`Bot server listening on http://localhost:${port}`);
    startDashboard();
});

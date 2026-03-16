import express from "express";
import cors from "cors";
import path from "path";
import { config } from "../config/config";
import * as zoho from "../api/zohoService";
import { logger } from "../utils/logger";

export function startDashboard() {
    const app = express();
    app.use(cors());
    app.use(express.static(path.join(__dirname, "public")));

    // API for Dashboard UI
    app.get("/api/dashboard", async (req, res) => {
        try {
            const userId = "demo-user";
            const [projects, tasks, utilization, teamUtilization, sapProjects] = await Promise.all([
                zoho.listProjects(userId),
                zoho.listAllTasks(userId),
                zoho.getUserUtilization(userId),
                zoho.getTeamUtilization(userId),
                zoho.getSapProjects(userId)
            ]);
            
            res.json({ projects, tasks, utilization, teamUtilization, sapProjects });
        } catch (error) {
            logger.error("Dashboard data fetch failed", error);
            res.status(500).json({ error: "Failed to fetch dashboard data" });
        }
    });

    const port = config.server.dashboardPort || 4000;
    app.listen(port, () => {
        logger.info(`Premium Dashboard API listening at http://localhost:${port}`);
    });
}

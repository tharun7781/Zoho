import express from "express";
import cors from "cors";
import path from "path";
import { config } from "../config/config";
import * as zoho from "../api/zohoService";
import { logger } from "../utils/logger";
import { parseIntent } from "../nlp/intentRouter";

export function startDashboard() {
    const app = express();
    app.use(cors());
    app.use(express.json());
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

    app.post("/api/update-status", async (req, res) => {
        const { taskId, status } = req.body;
        try {
            await zoho.updateTaskStatus("demo-user", taskId, status);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: "Update failed" });
        }
    });

    app.post("/api/assign-task", async (req, res) => {
        const { taskId, assigneeId } = req.body;
        try {
            await zoho.assignTask("demo-user", taskId, assigneeId);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: "Assignment failed" });
        }
    });

    app.post("/api/query", async (req, res) => {
        const { query } = req.body;
        try {
            const userId = "demo-user";
            const { intent, entities } = await parseIntent(query);
            logger.info(`Dashboard Query: ${query} -> Intent: ${intent}`);

            let data: any = null;
            let message: string = "";

            const isSap = entities.platform === "sap";

            switch (intent) {
                case "list_projects":
                    data = isSap ? await zoho.getSapProjects(userId) : await zoho.listProjects(userId);
                    message = `Fetched active ${isSap ? 'SAP' : 'Zoho'} projects.`;
                    break;
                case "list_tasks":
                    if (isSap) {
                        data = await zoho.getSapTasks(userId, entities.project_id || "sap_01");
                        message = "Fetched active SAP tasks.";
                    } else {
                        data = await zoho.listTasksByProject(userId, entities.project_id || "p1");
                        message = "Fetched active Zoho tasks.";
                    }
                    break;
                case "show_my_tasks":
                    data = isSap ? await zoho.getSapTasks(userId, "sap_01") : await zoho.listOpenTasks(userId);
                    message = `Fetched your open ${isSap ? 'SAP' : 'Zoho'} tasks.`;
                    break;
                case "utilization":
                    data = await zoho.getTeamUtilization(userId);
                    message = "Fetched team utilization metrics.";
                    break;
                case "due_this_month":
                    data = isSap ? [] : await zoho.getProjectsDueThisMonth(userId);
                    message = data.length > 0 ? `Fetched ${isSap ? 'SAP' : 'Zoho'} projects due this month.` : `No ${isSap ? 'SAP' : 'Zoho'} projects due this month.`;
                    break;
                case "help":
                    message = "Try: 'list tasks', 'show sap projects', or 'team workload'.";
                    break;
                default:
                    message = `Unknown intent: ${intent}. Try asking for projects or tasks.`;
            }

            res.json({ success: true, intent, message, data });
        } catch (error) {
            logger.error("Query failed", error);
            res.status(500).json({ success: false, error: "Failed to process query" });
        }
    });

    const port = config.server.dashboardPort || 4000;
    app.listen(port, () => {
        logger.info(`Premium Dashboard API listening at http://localhost:${port}`);
    });
}

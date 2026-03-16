import { TeamsActivityHandler, TurnContext, MessageFactory } from "botbuilder";
import { parseIntent } from "../nlp/intentRouter";
import * as zoho from "../api/zohoService";
import { createProjectsCard } from "../cards/projectsCard";
import { createTasksCard } from "../cards/tasksCard";
import { createUtilizationCard } from "../cards/utilizationCard";
import { createUpdateStatusCard } from "../cards/updateStatusCard";
import { createAssignCard } from "../cards/assignCard";
import { logger } from "../utils/logger";

export class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context, next) => {
      const text = TurnContext.removeMentionText(context.activity, context.activity.recipient.id).trim();
      const userId = context.activity.from.aadObjectId || "demo-user";

      // 1. NLP parsing
      const { intent, entities } = await parseIntent(text);
      logger.info(`Intent detected: ${intent} for user ${userId}`);

      // 2. Dispatch
      switch (intent) {
        case "list_projects":
          const projects = await zoho.listProjects(userId);
          await context.sendActivity({ attachments: [createProjectsCard(projects)] });
          break;

        case "list_tasks":
          const pid = entities.project_id || "p1";
          const tasks = await zoho.listTasksByProject(userId, pid);
          await context.sendActivity({ attachments: [createTasksCard(tasks, pid)] });
          break;

        case "due_this_month":
          const dueProjects = await zoho.getProjectsDueThisMonth(userId);
          if (dueProjects.length === 0) {
              await context.sendActivity("No projects are due this month! Great job staying ahead.");
          } else {
              await context.sendActivity({ attachments: [createProjectsCard(dueProjects)] });
          }
          break;

        case "assign_task":
          if (entities.task_id) {
              const users = await zoho.listUsers(userId);
              const assignCard = createAssignCard(entities.task_id, users);
              await context.sendActivity({ attachments: [assignCard] });
          } else {
              await context.sendActivity("Which task would you like to assign? (e.g., 'assign task t1 to Bob')");
          }
          break;

        case "utilization":
          const uUtils = await zoho.getUserUtilization(userId);
          const tUtils = await zoho.getTeamUtilization(userId);
          await context.sendActivity({ attachments: [createUtilizationCard(uUtils, tUtils)] });
          break;

        case "help":
          await context.sendActivity(MessageFactory.text("I can help you manage Zoho Projects! Try: 'show projects', 'my tasks', or 'team workload'."));
          break;

        default:
          await context.sendActivity(MessageFactory.text(`I'm not sure how to help with: "${text}". Try asking for projects or tasks.`));
      }

      await next();
    });

    // Handle button clicks from Adaptive Cards
    this.onInvokeActivity = async (context: TurnContext): Promise<any> => {
      if (context.activity.name === "adaptiveCard/action") {
        const data = context.activity.value?.action?.data;
        const userId = context.activity.from.aadObjectId || "demo-user";

        if (data?.action === "view_tasks") {
            const tasks = await zoho.listTasksByProject(userId, data.projectId);
            await context.sendActivity({ attachments: [createTasksCard(tasks, data.projectId)] });
        } else if (data?.action === "show_status_update") {
            await context.sendActivity({ attachments: [createUpdateStatusCard(data.taskId, "open")] });
        } else if (data?.action === "submit_status_update") {
            const status = context.activity.value.action.data.newStatus;
            await zoho.updateTaskStatus(userId, data.taskId, status);
            await context.sendActivity(`✅ Task ${data.taskId} updated to ${status}.`);
        } else if (data?.action === "submit_assign_task") {
            const assigneeId = context.activity.value.action.data.assigneeId;
            await zoho.assignTask(userId, data.taskId, assigneeId);
            await context.sendActivity(`✅ Task ${data.taskId} has been assigned to user ${assigneeId}.`);
        }
        return { status: 200 };
      }
      return { status: 404 };
    };
  }
}

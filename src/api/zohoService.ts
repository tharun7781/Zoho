// Zoho API service — wraps mock or real API transparently
import { config } from "../config/config";
import {
  MOCK_PROJECTS, MOCK_TASKS, MOCK_USERS, MOCK_PORTAL,
  MOCK_SAP_PROJECTS, MOCK_SAP_TASKS,
  calculateUtilization, calculateTeamUtilization,
  MockProject, MockTask, MockUser, UserUtilization, TeamUtilization,
} from "../data/mockData";

// ── Projects ──────────────────────────────────────────────────
export async function listProjects(_userId: string): Promise<MockProject[]> {
  return MOCK_PROJECTS;
}

export async function getProjectsDueThisMonth(_userId: string): Promise<MockProject[]> {
  const now = new Date();
  return MOCK_PROJECTS.filter((p) => {
    const parts = p.end_date.split("-");
    if (parts.length !== 3) return false;
    const d = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
}

// ── Tasks ─────────────────────────────────────────────────────
export async function listAllTasks(_userId: string): Promise<MockTask[]> {
  return MOCK_TASKS;
}

export async function listTasksByProject(
  _userId: string,
  projectId: string
): Promise<MockTask[]> {
  return MOCK_TASKS.filter((t) => t.project_id === projectId);
}

export async function listOpenTasks(_userId: string): Promise<MockTask[]> {
  return MOCK_TASKS.filter((t) => t.status === "open" || t.status === "inprogress");
}

export async function assignTask(
  _userId: string,
  taskId: string,
  assigneeId: string
): Promise<any> {
  // Check Zoho Tasks
  const task = MOCK_TASKS.find((t) => t.id === taskId);
  if (task) {
    const user = MOCK_USERS.find((u) => u.id === assigneeId);
    if (!user) throw new Error(`User ${assigneeId} not found`);
    task.assignee_id = user.id;
    task.assignee_name = user.name;
    return task;
  }

  // Check SAP Tasks/Projects (for demo, we just return success or update a stub)
  const sapTask = MOCK_SAP_TASKS.find(t => t.id === taskId);
  if (sapTask) {
    return { ...sapTask, assignee_id: assigneeId };
  }

  const sapProj = MOCK_SAP_PROJECTS.find(p => p.id === taskId);
  if (sapProj) {
    return { ...sapProj, assignee_id: assigneeId };
  }

  throw new Error(`Task/Project ${taskId} not found`);
}

export async function updateTaskStatus(
  _userId: string,
  taskId: string,
  status: any
): Promise<any> {
  // Check Zoho Tasks
  const task = MOCK_TASKS.find((t) => t.id === taskId);
  if (task) {
    task.status = status;
    if (status === "closed") task.percent_complete = 100;
    return task;
  }

  // Check SAP Tasks
  const sapTask = MOCK_SAP_TASKS.find(t => t.id === taskId);
  if (sapTask) {
    sapTask.status = status.charAt(0).toUpperCase() + status.slice(1);
    return sapTask;
  }

  // Check SAP Projects (Dashboards sometimes update project status directly)
  const sapProj = MOCK_SAP_PROJECTS.find(p => p.id === taskId);
  if (sapProj) {
    sapProj.status = status.charAt(0).toUpperCase() + status.slice(1);
    if (status === 'closed' || status === 'Completed') sapProj.percent_complete = 100;
    return sapProj;
  }

  throw new Error(`Task/Project ${taskId} not found`);
}

// ── Users ─────────────────────────────────────────────────────
export async function listUsers(_userId: string): Promise<MockUser[]> {
  return MOCK_USERS;
}

// ── Portal ────────────────────────────────────────────────────
export async function getPortal(_userId: string) {
  return MOCK_PORTAL;
}

// ── Utilization ───────────────────────────────────────────────
export async function getUserUtilization(_userId: string): Promise<UserUtilization[]> {
  return calculateUtilization();
}

export async function getTeamUtilization(_userId: string): Promise<TeamUtilization[]> {
  return calculateTeamUtilization();
}

// ── Extensibility: SAP Integration Stubs ──────────────────────
/**
 * Prototype for SAP integration. 
 * To enable: switch config.zoho.useMockData to false and implement the service call.
 */
export async function getSapProjects(_userId: string): Promise<any[]> {
    return MOCK_SAP_PROJECTS;
}

export async function getSapTasks(_userId: string, sapProjectId: string): Promise<any[]> {
    return MOCK_SAP_TASKS.filter(p => p.project_id === sapProjectId);
}

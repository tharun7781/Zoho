import { createZohoClient } from "./zohoClient";
import { logger } from "../utils/logger";

export interface ZohoProject {
  id: string;
  name: string;
  status: string;
  owner: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  percent_complete: number;
  description: string;
  task_count: { open: number; closed: number };
}

/** List all projects in a portal */
export async function listProjects(
  userId: string,
  portalId: string
): Promise<ZohoProject[]> {
  const client = createZohoClient(userId);
  logger.info(`Fetching projects for portal ${portalId}`);
  const res = await client.get(`/portal/${portalId}/projects/`);
  return res.data.projects ?? [];
}

/** Projects whose end_date falls in the current calendar month */
export async function getProjectsDueThisMonth(
  userId: string,
  portalId: string
): Promise<ZohoProject[]> {
  const all = await listProjects(userId, portalId);
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  return all.filter((p) => {
    if (!p.end_date) return false;
    // Zoho format: MM-DD-YYYY
    const parts = p.end_date.split("-");
    if (parts.length !== 3) return false;
    const d = new Date(
      parseInt(parts[2]),
      parseInt(parts[0]) - 1,
      parseInt(parts[1])
    );
    return d.getFullYear() === y && d.getMonth() === m;
  });
}

/** Fetch a single project detail */
export async function getProject(
  userId: string,
  portalId: string,
  projectId: string
): Promise<ZohoProject> {
  const client = createZohoClient(userId);
  const res = await client.get(`/portal/${portalId}/projects/${projectId}/`);
  return res.data.projects[0];
}

/** List all portals the authenticated user has access to */
export async function listPortals(
  userId: string
): Promise<Array<{ id: string; name: string; role: string }>> {
  const client = createZohoClient(userId);
  const res = await client.get(`/portals/`);
  return res.data.login_info ?? [];
}

// =============================================================
//  Mock Zoho Data — simulates Zoho Projects API responses
//  Used when ZOHO_USE_MOCK=true (no real API credentials needed)
// =============================================================

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  avatar: string;
}

export interface MockTask {
  id: string;
  name: string;
  status: "open" | "inprogress" | "testing" | "closed";
  priority: "high" | "medium" | "low";
  assignee_id: string;
  assignee_name: string;
  project_id: string;
  project_name: string;
  start_date: string;
  due_date: string;
  percent_complete: number;
  description: string;
  hours_logged: number;
  estimated_hours: number;
}

export interface MockProject {
  id: string;
  name: string;
  status: "active" | "onhold" | "completed";
  owner_id: string;
  owner_name: string;
  start_date: string;
  end_date: string;
  percent_complete: number;
  description: string;
  team: string;
  task_count: { open: number; inprogress: number; closed: number };
}

// ── Portal ────────────────────────────────────────────────────
export const MOCK_PORTAL = {
  id: "portal_001",
  name: "TechCorp Solutions",
  role: "admin",
};

// ── Users / Team ──────────────────────────────────────────────
export const MOCK_USERS: MockUser[] = [
  { id: "u1", name: "Alice Johnson",  email: "alice@techcorp.com",  role: "Admin",     team: "Engineering", avatar: "AJ" },
  { id: "u2", name: "Bob Martinez",   email: "bob@techcorp.com",    role: "Developer", team: "Engineering", avatar: "BM" },
  { id: "u3", name: "Carol Smith",    email: "carol@techcorp.com",  role: "Developer", team: "Engineering", avatar: "CS" },
  { id: "u4", name: "David Lee",      email: "david@techcorp.com",  role: "Designer",  team: "Design",      avatar: "DL" },
  { id: "u5", name: "Emma Wilson",    email: "emma@techcorp.com",   role: "QA",        team: "QA",          avatar: "EW" },
  { id: "u6", name: "Frank Brown",    email: "frank@techcorp.com",  role: "PM",        team: "Management",  avatar: "FB" },
  { id: "u7", name: "Grace Chen",     email: "grace@techcorp.com",  role: "Developer", team: "Engineering", avatar: "GC" },
  { id: "u8", name: "Henry Taylor",   email: "henry@techcorp.com",  role: "DevOps",    team: "Engineering", avatar: "HT" },
];

// ── Projects ──────────────────────────────────────────────────
export const MOCK_PROJECTS: MockProject[] = [
  {
    id: "p1", name: "Customer Portal Redesign",
    status: "active", owner_id: "u6", owner_name: "Frank Brown",
    start_date: "01-15-2026", end_date: "03-31-2026",
    percent_complete: 65, team: "Engineering",
    description: "Full redesign of the customer-facing portal with new UX",
    task_count: { open: 8, inprogress: 5, closed: 12 },
  },
  {
    id: "p2", name: "Mobile App v2.0",
    status: "active", owner_id: "u6", owner_name: "Frank Brown",
    start_date: "02-01-2026", end_date: "03-16-2026",
    percent_complete: 40, team: "Engineering",
    description: "Major release with offline support and new dashboard",
    task_count: { open: 15, inprogress: 6, closed: 9 },
  },
  {
    id: "p3", name: "Data Analytics Platform",
    status: "active", owner_id: "u1", owner_name: "Alice Johnson",
    start_date: "01-01-2026", end_date: "04-30-2026",
    percent_complete: 30, team: "Engineering",
    description: "Real-time analytics pipeline with interactive dashboards",
    task_count: { open: 20, inprogress: 4, closed: 6 },
  },
  {
    id: "p4", name: "API Gateway Migration",
    status: "onhold", owner_id: "u8", owner_name: "Henry Taylor",
    start_date: "03-01-2026", end_date: "05-31-2026",
    percent_complete: 10, team: "Engineering",
    description: "Migrate legacy REST API to GraphQL with new gateway",
    task_count: { open: 18, inprogress: 0, closed: 2 },
  },
  {
    id: "p5", name: "Brand Refresh Campaign",
    status: "active", owner_id: "u4", owner_name: "David Lee",
    start_date: "02-15-2026", end_date: "03-20-2026",
    percent_complete: 80, team: "Design",
    description: "New brand guidelines, assets, and marketing collateral",
    task_count: { open: 2, inprogress: 3, closed: 15 },
  },
];

// ── Tasks ─────────────────────────────────────────────────────
export const MOCK_TASKS: MockTask[] = [
  { id: "t1",  name: "Design new homepage layout",       status: "inprogress", priority: "high",   assignee_id: "u4", assignee_name: "David Lee",    project_id: "p1", project_name: "Customer Portal Redesign", start_date: "02-01-2026", due_date: "03-10-2026", percent_complete: 70, description: "Wireframes and high-fidelity mockups", hours_logged: 28, estimated_hours: 40 },
  { id: "t2",  name: "Implement OAuth login flow",        status: "inprogress", priority: "high",   assignee_id: "u2", assignee_name: "Bob Martinez",  project_id: "p1", project_name: "Customer Portal Redesign", start_date: "02-05-2026", due_date: "03-15-2026", percent_complete: 50, description: "SSO with Azure AD integration",        hours_logged: 20, estimated_hours: 35 },
  { id: "t3",  name: "Write unit tests for auth module",  status: "open",       priority: "medium", assignee_id: "u5", assignee_name: "Emma Wilson",   project_id: "p1", project_name: "Customer Portal Redesign", start_date: "03-01-2026", due_date: "03-20-2026", percent_complete: 0,  description: "Full coverage for auth service",       hours_logged: 0,  estimated_hours: 16 },
  { id: "t4",  name: "Set up CI/CD pipeline",             status: "closed",     priority: "high",   assignee_id: "u8", assignee_name: "Henry Taylor",  project_id: "p1", project_name: "Customer Portal Redesign", start_date: "01-20-2026", due_date: "02-15-2026", percent_complete: 100,description: "GitHub Actions with staging deploy",   hours_logged: 24, estimated_hours: 24 },
  { id: "t5",  name: "Build offline data sync",           status: "inprogress", priority: "high",   assignee_id: "u3", assignee_name: "Carol Smith",   project_id: "p2", project_name: "Mobile App v2.0",          start_date: "02-10-2026", due_date: "03-16-2026", percent_complete: 45, description: "IndexedDB sync with conflict resolution",hours_logged: 32, estimated_hours: 60 },
  { id: "t6",  name: "Push notification integration",     status: "open",       priority: "high",   assignee_id: "u2", assignee_name: "Bob Martinez",  project_id: "p2", project_name: "Mobile App v2.0",          start_date: "03-01-2026", due_date: "03-25-2026", percent_complete: 0,  description: "FCM and APNs support",                hours_logged: 0,  estimated_hours: 20 },
  { id: "t7",  name: "Performance profiling & tuning",    status: "open",       priority: "medium", assignee_id: "u7", assignee_name: "Grace Chen",    project_id: "p2", project_name: "Mobile App v2.0",          start_date: "03-05-2026", due_date: "03-28-2026", percent_complete: 0,  description: "Target <2s cold start time",          hours_logged: 0,  estimated_hours: 24 },
  { id: "t8",  name: "Design data ingestion pipeline",    status: "inprogress", priority: "high",   assignee_id: "u1", assignee_name: "Alice Johnson", project_id: "p3", project_name: "Data Analytics Platform",  start_date: "01-15-2026", due_date: "03-16-2026", percent_complete: 60, description: "Kafka → Spark → Data Lake",           hours_logged: 40, estimated_hours: 60 },
  { id: "t9",  name: "Build interactive charts module",   status: "open",       priority: "medium", assignee_id: "u7", assignee_name: "Grace Chen",    project_id: "p3", project_name: "Data Analytics Platform",  start_date: "03-10-2026", due_date: "04-05-2026", percent_complete: 0,  description: "D3.js + React dashboard components",  hours_logged: 0,  estimated_hours: 32 },
  { id: "t10", name: "Create new brand style guide",      status: "closed",     priority: "high",   assignee_id: "u4", assignee_name: "David Lee",    project_id: "p5", project_name: "Brand Refresh Campaign",   start_date: "02-15-2026", due_date: "03-01-2026", percent_complete: 100,description: "Colors, typography, iconography",     hours_logged: 30, estimated_hours: 30 },
  { id: "t11", name: "Design social media templates",     status: "inprogress", priority: "medium", assignee_id: "u4", assignee_name: "David Lee",    project_id: "p5", project_name: "Brand Refresh Campaign",   start_date: "03-01-2026", due_date: "03-18-2026", percent_complete: 85, description: "LinkedIn, Twitter, Instagram",        hours_logged: 18, estimated_hours: 20 },
  { id: "t12", name: "QA regression testing",             status: "open",       priority: "medium", assignee_id: "u5", assignee_name: "Emma Wilson",   project_id: "p2", project_name: "Mobile App v2.0",          start_date: "03-15-2026", due_date: "03-30-2026", percent_complete: 0,  description: "Full regression on iOS and Android",  hours_logged: 0,  estimated_hours: 40 },
];

// ── Utilization calculation ───────────────────────────────────
export interface UserUtilization {
  user: MockUser;
  activeTasks: number;
  totalHoursLogged: number;
  totalEstimatedHours: number;
  utilizationPercent: number;
  status: "available" | "normal" | "busy" | "overloaded";
}

export function calculateUtilization(): UserUtilization[] {
  return MOCK_USERS.map((user) => {
    const userTasks = MOCK_TASKS.filter(
      (t) => t.assignee_id === user.id && t.status !== "closed"
    );
    const logged = userTasks.reduce((s, t) => s + t.hours_logged, 0);
    const estimated = userTasks.reduce((s, t) => s + t.estimated_hours, 0);
    const util = estimated > 0 ? Math.round((logged / estimated) * 100) : 0;
    const active = userTasks.length;

    let status: UserUtilization["status"] = "available";
    if (util > 90) status = "overloaded";
    else if (util > 70) status = "busy";
    else if (util > 30) status = "normal";

    return {
      user,
      activeTasks: active,
      totalHoursLogged: logged,
      totalEstimatedHours: estimated,
      utilizationPercent: util,
      status,
    };
  });
}

// ── Team-level utilization ────────────────────────────────────
export interface TeamUtilization {
  team: string;
  members: number;
  avgUtilization: number;
  totalTasks: number;
}

export function calculateTeamUtilization(): TeamUtilization[] {
  const byUser = calculateUtilization();
  const teams: Record<string, UserUtilization[]> = {};
  byUser.forEach((u) => {
    if (!teams[u.user.team]) teams[u.user.team] = [];
    teams[u.user.team].push(u);
  });

  return Object.entries(teams).map(([team, members]) => ({
    team,
    members: members.length,
    avgUtilization: Math.round(
      members.reduce((s, m) => s + m.utilizationPercent, 0) / members.length
    ),
    totalTasks: members.reduce((s, m) => s + m.activeTasks, 0),
  }));
}

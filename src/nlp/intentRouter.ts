import Groq from "groq-sdk";
import { config } from "../config/config";
import { logger } from "../utils/logger";

const groq = new Groq({ apiKey: config.groq.apiKey });

export interface IntentResponse {
  intent: "list_projects" | "list_tasks" | "due_this_month" | "utilization" | "assign_task" | "update_status" | "help" | "unknown";
  entities: {
    project_id?: string;
    task_id?: string;
    user_id?: string;
    status?: string;
    query_string?: string;
  };
}

const SYSTEM_PROMPT = `
You are a project management assistant for Zoho Projects and SAP. Your goal is to route natural language queries to specific intents.
Support multiple languages (English, German, Spanish, French, etc.) by routing correctly regardless of the input language.
Always respond in the following JSON format:
{ "intent": "intent_name", "entities": { "id": "value", ... } }

INTENTS:
- list_projects: User wants to see projects.
- list_tasks: User wants to see tasks (can be filtered by project).
- due_this_month: User wants to see projects or tasks due this month (e.g., "due this month", "this month's deadlines").
- utilization: Team or member utilization/workload (e.g., "utilization", "who is busy").
- assign_task: Assigning a task to someone.
- update_status: Changing task status.
- help: User asking what you can do.

EXAMPLES:
"show my projects" -> {"intent": "list_projects", "entities": {}}
"what is due this month?" -> {"intent": "due_this_month", "entities": {}}
"list tasks for p1" -> {"intent": "list_tasks", "entities": {"project_id": "p1"}}
"who is overloaded?" -> {"intent": "utilization", "entities": {}}
"assign task t1 to alice" -> {"intent": "assign_task", "entities": {"task_id": "t1", "query_string": "alice"}}
"mark t2 as closed" -> {"intent": "update_status", "entities": {"task_id": "t2", "status": "closed"}}

Respond ONLY with valid JSON.
`;

export async function parseIntent(message: string): Promise<IntentResponse> {
  if (!config.groq.apiKey) {
    logger.warn("Groq API Key missing, falling back to basic keyword matching");
    return fallbackParser(message);
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      model: config.groq.model,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from Groq");

    return JSON.parse(content) as IntentResponse;
  } catch (error) {
    logger.error("Groq NLP failed:", error);
    return fallbackParser(message);
  }
}

/** Simple regex-based fallback if Groq is unavailable */
function fallbackParser(message: string): IntentResponse {
  const m = message.toLowerCase();
  if (m.includes("project")) return { intent: "list_projects", entities: {} };
  if (m.includes("task")) return { intent: "list_tasks", entities: {} };
  if (m.includes("utiliz") || m.includes("busy") || m.includes("load")) return { intent: "utilization", entities: {} };
  if (m.includes("due")) return { intent: "due_this_month", entities: {} };
  if (m.includes("assign")) return { intent: "assign_task", entities: {} };
  if (m.includes("help")) return { intent: "help", entities: {} };
  return { intent: "unknown", entities: { query_string: message } };
}

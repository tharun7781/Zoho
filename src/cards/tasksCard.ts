import { CardFactory, Attachment } from "botbuilder";
import { MockTask } from "../data/mockData";

export function createTasksCard(tasks: MockTask[], projectName: string): Attachment {
  const taskItems = tasks.map(t => ({
    type: "Container",
    separator: true,
    items: [
      {
        type: "ColumnSet",
        columns: [
          {
            type: "Column",
            width: "stretch",
            items: [
              { type: "TextBlock", text: t.name, weight: "Bolder" },
              { type: "TextBlock", text: `Assigned: ${t.assignee_name} • Due: ${t.due_date}`, isSubtle: true, spacing: "None" }
            ]
          },
          {
            type: "Column",
            width: "auto",
            items: [
              {
                type: "ActionSet",
                actions: [
                  { 
                    type: "Action.Submit", 
                    title: "Status", 
                    data: { action: "show_status_update", taskId: t.id } 
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }));

  return CardFactory.adaptiveCard({
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.4",
    body: [
      { type: "TextBlock", text: `Tasks: ${projectName}`, weight: "Bolder", size: "Large" },
      ...taskItems.slice(0, 8) // Show top 8
    ]
  });
}

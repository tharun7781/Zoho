import { CardFactory, Attachment } from "botbuilder";
import { MockProject } from "../data/mockData";

/** Build a list card for all projects */
export function createProjectsCard(projects: MockProject[]): Attachment {
  const body = projects.map((p) => ({
    type: "Container",
    separator: true,
    spacing: "Medium",
    items: [
      {
        type: "ColumnSet",
        columns: [
          {
            type: "Column",
            width: "stretch",
            items: [
              { type: "TextBlock", text: p.name, weight: "Bolder", size: "Medium", color: "Accent" },
              { type: "TextBlock", text: `${p.percent_complete}% Complete • ${p.status.toUpperCase()}`, isSubtle: true, spacing: "None" },
            ],
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
                    title: "View Tasks",
                    data: { action: "view_tasks", projectId: p.id },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "TextBlock",
        text: p.description,
        wrap: true,
        size: "Small",
        maxLines: 2,
      },
    ],
  }));

  return CardFactory.adaptiveCard({
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.4",
    body: [
      { type: "TextBlock", text: "Zoho Projects", weight: "Bolder", size: "Large" },
      ...body,
    ],
  });
}

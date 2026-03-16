import { CardFactory, Attachment } from "botbuilder";
import { UserUtilization, TeamUtilization } from "../data/mockData";

export function createUtilizationCard(userUtils: UserUtilization[], teamUtils: TeamUtilization[]): Attachment {
  const teamItems = teamUtils.map(t => ({
    type: "Container",
    items: [
      {
        type: "ColumnSet",
        columns: [
          {
            type: "Column",
            width: "stretch",
            items: [
              { type: "TextBlock", text: t.team, weight: "Bolder" },
              { type: "TextBlock", text: `${t.members} Members • ${t.totalTasks} Active Tasks`, isSubtle: true, spacing: "None" }
            ]
          },
          {
            type: "Column",
            width: "auto",
            items: [
              { 
                type: "TextBlock", 
                text: `${t.avgUtilization}%`, 
                weight: "Bolder", 
                color: t.avgUtilization > 85 ? "Attention" : (t.avgUtilization > 60 ? "Warning" : "Good") 
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
      { type: "TextBlock", text: "Team Workload & Utilization", weight: "Bolder", size: "Large" },
      { type: "TextBlock", text: "Overview of engineer bandwidth across projects.", isSubtle: true },
      ...teamItems,
      {
        type: "ActionSet",
        actions: [
          { type: "Action.OpenUrl", title: "Open Full Dashboard", url: "http://localhost:4000" }
        ]
      }
    ]
  });
}

import { CardFactory, Attachment } from "botbuilder";
import { MockUser } from "../data/mockData";

/** Build a task assignment card with a user selector */
export function createAssignCard(taskId: string, users: MockUser[]): Attachment {
  return CardFactory.adaptiveCard({
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.4",
    body: [
      { type: "TextBlock", text: "Assign Task", weight: "Bolder", size: "Medium" },
      { type: "TextBlock", text: `Select a team member to assign to task ${taskId}:`, isSubtle: true },
      {
        type: "Input.ChoiceSet",
        id: "assigneeId",
        label: "Select Member",
        choices: users.map(u => ({ title: `${u.name} (${u.team})`, value: u.id }))
      }
    ],
    actions: [
      {
        type: "Action.Submit",
        title: "Confirm Assignment",
        data: { action: "submit_assign_task", taskId }
      }
    ]
  });
}

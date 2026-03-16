import { CardFactory, Attachment } from "botbuilder";

export function createUpdateStatusCard(taskId: string, currentStatus: string): Attachment {
  return CardFactory.adaptiveCard({
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.4",
    body: [
      { type: "TextBlock", text: "Update Task Status", weight: "Bolder", size: "Medium" },
      { type: "TextBlock", text: `Current: ${currentStatus}`, isSubtle: true },
      {
        type: "Input.ChoiceSet",
        id: "newStatus",
        label: "Select new status",
        value: currentStatus,
        choices: [
          { title: "Open", value: "open" },
          { title: "In Progress", value: "inprogress" },
          { title: "Testing", value: "testing" },
          { title: "Closed", value: "closed" }
        ]
      }
    ],
    actions: [
      {
        type: "Action.Submit",
        title: "Update",
        data: { action: "submit_status_update", taskId }
      }
    ]
  });
}

export const buildTodoEmail = (todo, user, assignee) => {
  const assigneeName = assignee === "a" ? user.spouse_a_name : user.spouse_b_name;

  const subject = `Reminder: ${todo.title}`;

  const body = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <p>Hey ${assigneeName || "there"},</p>
    <p>Make sure to check your <strong>2DOOR</strong>! You have a new reminder waiting:</p>

    <div style="
      background: #f7f7f7;
      border-radius: 8px;
      padding: 12px 16px;
      margin: 16px 0;
      border: 1px solid #ddd;
    ">
      <h3 style="margin: 0 0 8px;">${todo.title}</h3>
      <p style="margin: 0;">${todo.description || "No details provided."}</p>
    </div>

    <p style="font-size: 14px; color: #777;">
      Have a great day,<br/>
      — Your JayTwoDoor Team
    </p>
  </div>
  `;

  return { subject, body };
};

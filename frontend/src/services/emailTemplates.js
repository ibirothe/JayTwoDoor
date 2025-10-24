export const buildTodoEmail = (todo, user, assignee) => {
  const assigneeName = assignee === "a" ? user.spouse_a_name : user.spouse_b_name;
  const serviceUrl = "https://jay-two-door.vercel.app";
  const imageUrl = "https://github.com/ibirothe/JayTwoDoor/tree/main/frontend/src/assets/email.png";

  const subject = `Reminder: ${todo.title}`;

  const body = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <a href="${serviceUrl}" target="_blank" style="text-decoration: none;">
      <img 
        src="${imageUrl}" 
        alt="JayTwoDoor Banner" 
        style="width: 100%; max-width: 600px; border-radius: 8px; display: block; margin: 0 auto 16px;" 
      />
    </a>

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

    <p style="text-align: center; margin-top: 20px;">
      <a href="${serviceUrl}" target="_blank" style="
        background: #007bff;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        display: inline-block;
      ">
        Open 2DOOR
      </a>
    </p>

    <p style="font-size: 14px; color: #777; margin-top: 24px;">
      Have a great day,<br/>
      — Your JayTwoDoor Team
    </p>
  </div>
  `;

  return { subject, body };
};

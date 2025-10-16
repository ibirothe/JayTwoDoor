import axiosInstance from "./axios";
import { buildTodoEmail } from "./emailTemplates";

export const sendMail = async ({ todo, user, setLoading, toast }) => {
  setLoading(true);

  try {
    const isAssigneeA = todo.assignee === 0;
    const recipientEmail = isAssigneeA ? user.spouse_a_email : user.spouse_b_email;

    if (!recipientEmail) {
      toast({
        title: "Provide assignee email in settings first.",
        status: "warning",
        isClosable: true,
        duration: 2500,
      });
      return;
    }

    const { subject, body } = buildTodoEmail(todo, user, isAssigneeA ? "a" : "b");

    await axiosInstance.post("/email/send", {
      to: recipientEmail,
      subject,
      body,
    });

    toast({
      title: "Email sent successfully",
      status: "success",
      isClosable: true,
      duration: 2000,
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to send email",
      status: "error",
      isClosable: true,
      duration: 2000,
    });
  } finally {
    setLoading(false);
  }
};

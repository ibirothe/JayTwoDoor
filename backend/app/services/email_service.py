import os
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from app.core.config import settings


class EmailService:
    @staticmethod
    async def send_email(data):
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key['api-key'] = settings.BREVO_API_KEY

        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
            sib_api_v3_sdk.ApiClient(configuration)
        )

        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": data.to}],
            sender={"name": "JayTwoDoor", "email": "owlkikiwood@gmail.com"},
            subject=data.subject,
            text_content=data.body,
        )

        try:
            api_response = api_instance.send_transac_email(send_smtp_email)
            print(f"Email sent successfully: {api_response}")
            return {"message": "Email sent successfully", "email": data.to}
        except ApiException as e:
            raise RuntimeError(f"Failed to send email: {e}")

# app/services/email_service.py
import httpx
import os
from app.schemas.user_schema import UserAuth
from app.schemas.email_schema import EmailOut

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
BREVO_API_URL = "https://api.sendinblue.com/v3/smtp/email"

class EmailService:

    @staticmethod
    async def send_email(data: UserAuth) -> EmailOut:
        """
        Sends an email using Brevo (Sendinblue) API.
        """
        payload = {
            "sender": {"name": "Todo App", "email": "no-reply@todoapp.com"},
            "to": [{"email": data.email}],
            "subject": getattr(data, "subject", "Notification from Todo App"),
            "textContent": getattr(data, "body", ""),
        }

        headers = {
            "api-key": BREVO_API_KEY,
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(BREVO_API_URL, json=payload, headers=headers)

        if response.status_code >= 400:
            raise RuntimeError(f"Failed to send email: {response.text}")

        return EmailOut(message="Email sent successfully", email=data.email)

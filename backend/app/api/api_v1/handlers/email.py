from fastapi import APIRouter, HTTPException, status
from app.schemas.email_schema import EmailIn, EmailOut
from app.services.email_service import EmailService
import sys
import traceback

email_router = APIRouter()

@email_router.post(
    "/send",
    summary="Send notification email",
    response_model=EmailOut
)
async def send_notification_mail(data: EmailIn):
    try:
        print(f"=== Attempting to send email to: {data.to} ===", file=sys.stderr)
        result = await EmailService.send_email(data)
        print(f"=== Email sent successfully ===", file=sys.stderr)
        return result
    except Exception as e:
        print(f"=== UNEXPECTED ERROR ===", file=sys.stderr)
        print(f"Error type: {type(e).__name__}", file=sys.stderr)
        print(f"Error message: {str(e)}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import require_admin
from app.database.database import get_db
from app.models.issue import IssueReport
from app.models.user import User
from app.schemas.issue import IssueResponse, IssueStatusUpdate


router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"]
)


@router.get(
    "/issues",
    response_model=list[IssueResponse]
)
def get_all_issues_for_admin(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):
    issues = db.query(IssueReport).order_by(
        IssueReport.created_at.desc()
    ).all()

    return issues
@router.put(
    "/issues/{issue_id}/status",
    response_model=IssueResponse
)
def update_issue_status(
    issue_id: int,
    status_data: IssueStatusUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):
    issue = db.query(IssueReport).filter(
        IssueReport.id == issue_id
    ).first()

    if not issue:
        raise HTTPException(
            status_code=404,
            detail="Issue not found"
        )

    allowed_statuses = [
        "reported",
        "under_review",
        "in_progress",
        "resolved"
    ]

    if status_data.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid issue status"
        )

    issue.status = status_data.status

    db.commit()
    db.refresh(issue)

    return issue
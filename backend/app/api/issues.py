from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.issue import IssueReport
from app.schemas.issue import (
    IssueCreate,
    IssueResponse,
    IssueStatusUpdate
)
from app.api.dependencies import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/api/issues",
    tags=["Issues"]
)


# =========================================================
# CREATE ISSUE
# =========================================================

@router.post(
    "",
    response_model=IssueResponse,
    status_code=status.HTTP_201_CREATED
)
def create_issue(
    issue_data: IssueCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_issue = IssueReport(
        title=issue_data.title,
        description=issue_data.description,
        location=issue_data.location,
        category_id=issue_data.category_id,
        user_id=current_user.id,
        status="reported"
    )

    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)

    return new_issue


# =========================================================
# GET ALL ISSUES
# ADMIN DASHBOARD
# =========================================================

@router.get(
    "",
    response_model=list[IssueResponse]
)
def get_all_issues(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Only admin can view all citizen reports
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    issues = (
        db.query(IssueReport)
        .order_by(IssueReport.created_at.desc())
        .all()
    )

    return issues


# =========================================================
# GET MY ISSUES
# CITIZEN
# =========================================================

@router.get(
    "/my",
    response_model=list[IssueResponse]
)
def get_my_issues(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    issues = (
        db.query(IssueReport)
        .filter(
            IssueReport.user_id == current_user.id
        )
        .order_by(IssueReport.created_at.desc())
        .all()
    )

    return issues


# =========================================================
# UPDATE ISSUE STATUS
# ADMIN ONLY
# =========================================================

@router.put(
    "/{issue_id}/status",
    response_model=IssueResponse
)
def update_issue_status(
    issue_id: int,
    status_data: IssueStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # -----------------------------------------
    # CHECK ADMIN
    # -----------------------------------------

    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    # -----------------------------------------
    # FIND ISSUE
    # -----------------------------------------

    issue = (
        db.query(IssueReport)
        .filter(IssueReport.id == issue_id)
        .first()
    )

    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found"
        )

    # -----------------------------------------
    # VALIDATE STATUS
    # -----------------------------------------

    allowed_statuses = {
        "reported",
        "in_progress",
        "resolved"
    }

    if status_data.status not in allowed_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status"
        )

    # -----------------------------------------
    # UPDATE
    # -----------------------------------------

    issue.status = status_data.status

    db.commit()
    db.refresh(issue)

    return issue
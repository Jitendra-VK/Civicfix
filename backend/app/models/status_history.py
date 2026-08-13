from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class StatusHistory(Base):
    __tablename__ = "status_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    issue_id = Column(
        Integer,
        ForeignKey("issue_reports.id"),
        nullable=False
    )

    old_status = Column(
        String(30),
        nullable=True
    )

    new_status = Column(
        String(30),
        nullable=False
    )

    changed_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    changed_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
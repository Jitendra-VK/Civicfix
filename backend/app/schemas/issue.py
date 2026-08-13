from datetime import datetime

from pydantic import BaseModel


class IssueCreate(BaseModel):
    category_id: int
    title: str
    description: str
    location: str


class IssueResponse(BaseModel):
    id: int
    category_id: int
    title: str
    description: str
    location: str
    image_path: str | None = None
    status: str
    user_id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class IssueStatusUpdate(BaseModel):
    status: str
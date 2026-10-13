
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.issues import router as issues_router
from app.api.admin import router as admin_router
from app.database.database import Base, engine
from app.models.user import User
from app.models.issue import IssueReport
from app.models.category import IssueCategory
Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="CivicFix API",
    description="Smart Civic Reporting Platform API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://civicfix-jitendra.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(issues_router)
app.include_router(admin_router)


@app.get("/")
def root():
    return {
        "message": "CivicFix API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }


from fastapi.staticfiles import StaticFiles
import os

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

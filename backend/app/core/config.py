import os

from dotenv import load_dotenv


load_dotenv()


class Settings:
    APP_NAME = "CivicFix"
    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "development-secret-key-change-before-deployment"
    )
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60


settings = Settings()
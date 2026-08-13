from app.database.database import SessionLocal
from app.models.user import User
from app.services.security import hash_password


def create_admin():
    db = SessionLocal()

    try:
        email = "admin@civicfix.com"

        existing_admin = db.query(User).filter(
            User.email == email
        ).first()

        if existing_admin:
            print("Admin account already exists.")
            return

        admin = User(
            name="CivicFix Admin",
            email=email,
            password=hash_password("Admin@123"),
            role="admin",
            is_active=True
        )

        db.add(admin)
        db.commit()

        print("Admin account created successfully!")
        print("Email: admin@civicfix.com")
        print("Password: Admin@123")

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()
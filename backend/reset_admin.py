from app.database.database import SessionLocal
from app.models.user import User
from app.services.security import hash_password


db = SessionLocal()

try:
    admin = db.query(User).filter(
        User.email == "admin@civicfix.com"
    ).first()

    if not admin:
        print("Admin account NOT found.")
    else:
        admin.password = hash_password("Admin@123")
        admin.role = "admin"
        admin.is_active = True

        db.commit()

        print("================================")
        print("ADMIN PASSWORD RESET SUCCESSFUL")
        print("Email: admin@civicfix.com")
        print("Password: Admin@123")
        print("Role: admin")
        print("================================")

finally:
    db.close()
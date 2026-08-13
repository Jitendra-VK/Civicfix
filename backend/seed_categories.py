from app.database.database import SessionLocal
from app.models.category import IssueCategory


categories = [
    {
        "name": "Pothole",
        "description": "Report potholes and damaged road surfaces."
    },
    {
        "name": "Streetlight",
        "description": "Report broken or non-working streetlights."
    },
    {
        "name": "Garbage",
        "description": "Report garbage accumulation or missed collection."
    },
    {
        "name": "Road Damage",
        "description": "Report damaged roads, cracks, or unsafe surfaces."
    },
    {
        "name": "Water Leakage",
        "description": "Report water leaks or damaged public water infrastructure."
    },
]


def seed_categories():
    db = SessionLocal()

    try:
        for category_data in categories:

            existing_category = db.query(IssueCategory).filter(
                IssueCategory.name == category_data["name"]
            ).first()

            if existing_category:
                print(
                    f"Already exists: {category_data['name']}"
                )
                continue

            category = IssueCategory(
                name=category_data["name"],
                description=category_data["description"]
            )

            db.add(category)

        db.commit()

        print("Categories seeded successfully!")

    finally:
        db.close()


if __name__ == "__main__":
    seed_categories()
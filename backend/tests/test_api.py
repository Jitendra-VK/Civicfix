from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_or_root_endpoint():
    response = client.get("/")
    assert response.status_code in [200, 404]


def test_register_requires_valid_data():
    response = client.post(
        "/api/auth/register",
        json={}
    )

    assert response.status_code in [400, 422]


def test_login_requires_credentials():
    response = client.post(
        "/api/auth/login",
        data={}
    )

    assert response.status_code in [400, 401, 422]


def test_my_reports_requires_authentication():
    response = client.get("/api/issues/my")

    assert response.status_code in [401, 403]
def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
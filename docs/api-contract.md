# CivicFix API Contract

## 1. Base URL

```text
http://127.0.0.1:8000/api
## API Development Notes

All protected endpoints use JWT-based authentication. The frontend sends the access token through the Authorization header using the Bearer authentication scheme. Citizen operations are restricted to the authenticated user's reports, while administrator operations are protected through role-based authorization.
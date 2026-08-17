# Security Policy

## Reporting a Vulnerability
If you find a security issue in this repository, please do not open a public issue.
Contact the maintainers directly via GitHub (nikunj-joshi-eth) with details.

## Handling of Secrets
- Never commit `.env`, service account JSON, API keys, or payment secrets.
- Local development uses `.env` (see `backend/.env.example` for required variables).
- Production uses GCP Secret Manager / Cloud Run environment configuration.
- Uploaded student images are stored privately in Cloud Storage; access is via
  signed URLs or authenticated service-account access only, never public ACLs.

## Data Handling
This project processes student-submitted question images and solution attempts.
These are treated as private user data and are never made publicly accessible.

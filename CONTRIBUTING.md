# Contributing to SocraticAI

## Workflow
1. Create a feature branch from `main`:
   `git checkout -b feature/short-description`
2. Make your changes, commit with clear messages.
3. Push and open a Pull Request into `main`.
4. At least one review is required before merging.
5. Do not push directly to `main`.

## Commit Messages
Use a short imperative summary, e.g.:
- `feat: add /questions/upload endpoint`
- `fix: correct Firestore attempt schema`
- `docs: update architecture diagram`

## Branch Naming
- `feature/...` for new functionality
- `fix/...` for bug fixes
- `chore/...` for tooling, docs, config

## Code Review Checklist
- No secrets committed
- Pydantic models used for all request/response bodies
- Errors return consistent, meaningful status codes
- New endpoints documented in `docs/api.md`

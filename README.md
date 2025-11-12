QR Code Generator
=================

Short description
-----------------
A small full-stack QR code generator project with an Angular frontend, a Node.js backend, and a Python service for QR generation.

Branching & SOLID/OOP refactor workflow
--------------------------------------
This project follows a branch-per-task workflow with an "epic" branch for large refactors (like adding SOLID/OOP principles) and component feature branches for focused work.

Main branches
- main (or master): production-ready code
- develop: integration branch for active development

Refactor branches (recommended for your SOLID/OOP work)
- epic/solid-oop-refactor — integration branch for the entire SOLID/OOP refactor
- feature/solid/oop-frontend — frontend-specific refactor work
- feature/solid/oop-backend — backend-specific refactor work
- feature/solid/oop-python — python-service-specific refactor work

Branching rules
1. Create small, focused commits (one responsibility per commit) and use conventional commit messages (e.g., feat:, fix:, refactor:, chore:).
2. Work in a feature branch:
   - Start from the epic branch: for example, when doing the frontend work:

     ```powershell
     git checkout develop
     git pull origin develop
     git checkout -b epic/solid-oop-refactor
     git push -u origin epic/solid-oop-refactor
     git checkout -b feature/solid/oop-frontend
     git push -u origin feature/solid/oop-frontend
     ```

3. Open a PR from feature/* → epic/solid-oop-refactor.
   - Use the PR to discuss design, run CI/tests, and get reviews.
4. Once the feature is reviewed and merged into the epic branch, the epic branch should be used to integrate several feature branches and run full integration tests.
5. When the epic is stable, open a PR epic/solid-oop-refactor → develop (or directly to main if you are releasing).

Commit message examples
- feat(qr): extract generator class and add configuration API
- refactor(py): apply SRP to QR generator (move code to classes)
- chore: add tests for QR generator

PR & CI suggestions
- Protect `main` and `develop` with branch protection rules:
  - Require pull request reviews (1 or 2 approvers)
  - Require status checks (unit tests / linters) to pass before merge
  - Disallow force pushes

Working tips for SOLID/OOP refactor
- Start small: extract a single responsibility (e.g., QR encoding) into a class and add unit tests.
- Keep interfaces thin and explicit.
- Use dependency injection where appropriate (especially in backend and python service).
- Add tests for the behavior you refactor to avoid regressions.

Quick commands (PowerShell)
- Create epic branch from develop:

  ```powershell
  git checkout develop
  git pull origin develop
  git checkout -b epic/solid-oop-refactor
  git push -u origin epic/solid-oop-refactor
  ```

- Create a feature branch from epic:

  ```powershell
  git checkout epic/solid-oop-refactor
  git checkout -b feature/solid/oop-backend
  git push -u origin feature/solid/oop-backend
  ```

Notes
- If you do not want to track uploaded files, add the uploads directory to `.gitignore` (for example: `backend/uploads/`) and remove any uploaded files from the index with `git rm --cached`.
- Keep pull requests small and focused by refactoring one concept at a time.

If you'd like, I can:
- Add a PR template to `.github/PULL_REQUEST_TEMPLATE.md`.
- Add branch protection recommendations you can apply in GitHub settings.
- Create an initial skeleton for one of the feature branches (frontend/backend/python) to demonstrate the refactor structure.



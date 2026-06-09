# AGENTS.md

## Project Notes
- This workspace is a VS Code extension for CodeIgniter PHP projects.
- Main extension metadata lives in `client/package.json`.
- Server language-service code lives in `server/src/`.

## Working Rules
- Keep changes minimal and focused on the requested behavior.
- Prefer `apply_patch` for file edits.
- Validate server changes with the existing compile and bundle tasks.
- When packaging a release, rebuild the VSIX from `client/`.

## Release Notes
- If you change behavior that affects users, update `client/CHANGELOG.md`.
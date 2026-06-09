ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${VARIANT}

# Keep this minimal; base image already contains Node.js, npm, git, and common build tools.
RUN corepack enable

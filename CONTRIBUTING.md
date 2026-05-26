# Contributing

Thanks for helping improve the GDG on Campus DGI website.

## Before You Start

- Search existing issues and pull requests before opening a new one.
- Keep changes focused and scoped.
- For larger work, open an issue first so the approach can be discussed.

## Local Setup

1. Fork and clone the repository.
2. Copy the example environment files:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Start the project either with Docker Compose or with separate frontend and backend processes.

## Branching

- Use descriptive branch names such as `feat/event-filters` or `fix/docker-docs`.

## Pull Requests

- Explain what changed and why.
- Include screenshots for UI changes when relevant.
- Mention any environment or setup changes.
- Link the related issue if one exists.
- Keep pull requests reviewable in size when possible.

## Code Style

- Follow the existing project structure and naming patterns.
- Avoid unrelated refactors in the same pull request.
- Update docs when behavior, setup, or contributor workflow changes.

## Testing

- Run frontend tests before submitting:

```bash
cd frontend
npm test
```

- If you could not run a check, mention that clearly in the pull request.

## Community

By contributing, you agree to follow the project's [Code of Conduct](CODE_OF_CONDUCT.md).

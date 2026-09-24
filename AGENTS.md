# AGENTS.md

## Key Instructions for OpenCode

### Repository Structure
- Portfolio contains multiple projects in `projects/` directory
- Each project has its own `package.json` and build configuration

### Essential Commands
- `npm install` before any development work
- `npm run build` to compile all projects
- `npm test` to run all tests across projects

### Testing Workflow
- Run type checks first: `npm run typecheck`
- Then run unit tests: `npm run test`
- Integration tests require Docker: `docker-compose up`

### Style Guides
- Follow Prettier formatting rules
- Use TypeScript strictly
- Commit messages follow Conventional Commits

### Special Notes
- The `portfolio` package is the main entry point
- API keys are loaded from `config/.env` file
- Production builds require `--prod` flag

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

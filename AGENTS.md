# Repository working agreement

## Scope and source of truth

- This repository owns the Sol Hair Studio web, mobile and shared API applications. Do not copy from or modify the separate personal Next.js landing-page repository.
- GitHub Issues are the only backlog. Do not create a second Markdown task list that must be kept in sync.
- The official rubric, deadline and member capacity are not recorded yet. Treat technology and course mappings in `docs/course-scope.md` as assumptions until the team confirms them.
- Keep shared capabilities shared. A task used by both courses may carry both course labels; do not duplicate it into separate web/mobile tickets without a real delivery boundary.

## Before changing code

1. Read the issue, `README.md`, `docs/course-scope.md`, current branch, `git status` and recent history.
2. Preserve unrelated and uncommitted work. Never discard or rewrite another person's changes.
3. Confirm the requested work belongs to this repository and does not silently expand the assignment scope.
4. Never print or commit tokens, `.env` files, credentials, device identifiers or production data.

## Issue, branch and pull request flow

- Start from an issue with a testable goal, dependencies, exclusions and acceptance criteria.
- Use a focused branch such as `feat/<issue>-short-name`, `fix/<issue>-short-name` or `chore/<issue>-short-name`.
- Do not push directly to `main`, merge your own PR, lower branch rules or bypass a failing check.
- Keep commits focused. Reference the issue in the PR and use `Closes #<number>` only when the PR fully satisfies it.
- Leave work unassigned until the team agrees on ownership. Do not infer skills or availability from usernames.
- Update the Project status honestly: blocked/unclear work stays in Backlog; only actionable work moves to Ready; code awaiting review moves to In Review.

## Implementation boundaries

- Prefer the existing monorepo and simple modules over new services, orchestration or framework layers.
- API contracts and data models are shared by web and mobile. Changes to them must describe compatibility impact.
- API base URLs must remain environment-configurable. Never assume browser, Android emulator, iOS simulator and physical devices use the same host address.
- Add dependencies only when they directly support the issue. Keep versions compatible with the Node/Expo baselines documented in the repo and commit the root lockfile.
- Do not claim emulator/device, database or browser verification unless it was actually performed.

## Required checks and handoff

Run the checks relevant to touched code; for cross-cutting changes run all of them:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

In the PR, report:

- what changed and what is explicitly out of scope;
- the exact commands that passed or failed;
- manual environments actually exercised (browser, emulator, physical device, database);
- screenshots/log excerpts required by the issue;
- remaining risks, dependencies and follow-up issues.

Never weaken tests, swallow failures or add placeholder tests just to make CI green.

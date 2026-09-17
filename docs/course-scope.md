# Course scope and assumptions

This note separates facts currently known from technical assumptions and decisions that still require the official rubrics. It is not a claim that either assignment is complete.

## Known context

- Sol Hair Studio is the shared product topic for SDN302 and MMA301.
- SDN302 requires a complete ReactJS website, including responsive behavior in mobile browsers.
- MMA301 requires a separate React Native application for Android/iOS.
- Web and mobile use one backend and shared data, while each course still needs its own run/demo flow and requirement evidence.
- Roles are not split by client: web is not assumed to be admin-only and mobile is not assumed to be customer-only.
- The first shared product slice is a real service-catalog API consumed by both web and mobile.

## Current technical assumptions

These choices provide a maintainable starting point and may be revised after rubric review:

- npm workspaces monorepo with `apps/web`, `apps/mobile` and `apps/api`.
- Node.js 24 LTS and TypeScript.
- React with Vite for web; React Native with Expo SDK 57 for mobile.
- Express 5 for the shared HTTP API.
- MongoDB with Mongoose 9 when persistence is introduced.
- One shared API contract, with environment-specific base URLs for each client runtime.
- GitHub Issues, milestones, Project fields and PRs provide planning and evidence; no parallel Markdown backlog.

## Provisional course mapping

| Capability | SDN302 evidence | MMA301 evidence | Current status |
| --- | --- | --- | --- |
| Shared API health and configuration | Web can call the API | Mobile can call the API | Baseline only |
| Service catalog | Responsive React view | Native Android/iOS view | Planned; rubric mapping unconfirmed |
| Authentication and roles | Unknown | Unknown | Awaiting rubric |
| Booking workflow | Unknown | Unknown | Awaiting rubric |
| Administration/dashboard | Unknown | Unknown | Awaiting rubric |
| Payment | Unknown | Unknown | Awaiting rubric |

## Information still needed

- Official SDN302 and MMA301 rubrics, required features and grading evidence.
- Deadline, demo format, deployment constraints and any mandated libraries/services.
- Supported browser, Android and iOS version targets.
- Team capacity, agreed ownership and review rotation.
- Data/privacy constraints, authentication roles and whether payments are simulated or integrated.

Until these are confirmed, issues that depend on them should stay in Backlog and must not claim rubric compliance.

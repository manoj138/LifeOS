# LifeOS Workspace Architectural Guidelines & Rules

## 🚫 Dynamic Data Enforcement Rule (No Hardcoded UI Data)

1. **Strictly No Hardcoded UI Values**:
   - Frontend UI components (`pages/`, `components/`) MUST NOT contain static hardcoded mock names, emails, target roles, progress numbers, or hardcoded dates.
   - All UI text and metrics MUST be dynamically derived from React Contexts (`UserContext`, `VoiceGuiderContext`), State, or API responses (`apiService`).

2. **Context & API Single Source of Truth**:
   - User Profile & Preferences: `user?.name`, `user?.email`, `preferences?.targetRole`, `preferences?.skillLevels`, `preferences?.dailyHours`, `preferences?.aiPersona`.
   - Learning & Progress: Dynamically fetched via `LearningProgress` context / API endpoint.
   - Tasks & Progress: Dynamically loaded from user logs rather than fixed numbers.

3. **Fallback Graceful Handling**:
   - When API / Context data is loading or empty, components must display dynamic fallback placeholders computed from user props or state defaults, never static dummy hardcoded user strings.


## 🚫 No Database Seeder Rule (No Seeder Generation or Usage)

1. **Strictly No Seeder Generation or Execution**:
   - Antigravity MUST NOT create, generate, or execute backend database seeders (e.g. seed scripts, mock data inserters, or automatic seeder triggers).
   - All database records, modules, topics, and application data MUST be generated, managed, and created dynamically via UI forms, API endpoints, or user/admin actions.



## 🚫 No Automated Testing Rule (Antigravity Constraints)

1. **No Automatic Test Suite Execution**:
   - Antigravity MUST NOT automatically run unit tests, integration tests, or end-to-end testing runners (e.g. `npm test`, `jest`, `vitest`, `cypress`, `playwright`) unless the user explicitly requests automated testing in their prompt.
   - Focus on feature implementation, code writing, and clear manual verification instructions instead of autonomous test execution.


## 📋 Mandatory Implementation Plan First Rule

1. **Mandatory Deep Codebase Inspection First**:
   - Before drafting any `implementation_plan.md`, Antigravity MUST thoroughly read and inspect all relevant Frontend files (`pages/`, `components/`, `services/`, `layouts/`, `contexts/`) and Backend files (`routes/`, `controllers/`, `modals/`, `config/`, `middleware/`) involved in or affected by the user's request.
   - All proposed changes, file paths, and function signatures in the plan MUST be derived from actual existing codebase investigation, not assumptions.

2. **Always Provide an Implementation Plan Before Execution**:
   - For every user request or prompt, Antigravity MUST first create an `implementation_plan.md` artifact detailing the proposed changes, design decisions, and verification steps.
   - Antigravity MUST NOT make code changes or run state-modifying shell commands until the user explicitly approves the implementation plan.


## 🎨 UI Design System & Style Consistency Rule

1. **Strict Design Tokens & Surface Standard**:
   - Page Container Background: ALWAYS `#070709` (`bg-[#070709]`). Do NOT use arbitrary dark shades (`bg-slate-900`, `bg-black`, `bg-zinc-950`).
   - Cards & Glass Surfaces: Use `<Card>` or `<GlassCard>` from `components/ui/Card.jsx` (`bg-[#14141b]/80` or `bg-white/[0.03]`, `backdrop-blur-xl`, `border-white/10`).
   - Brand Accent Gradients: Blue-Indigo-Purple (`from-blue-600 via-indigo-600 to-purple-600`) & Neon Cyan (`#06b6d4`).

2. **Standardized Reusable Primitives**:
   - Buttons: ALWAYS use `<Button>` from `components/ui/Button.jsx` (`primary`, `secondary`, `glass`, `ghost`, `outline`, `danger`). Do NOT write raw custom `<button>` Tailwind classes in page components.
   - Badges & Status: ALWAYS use `<Badge>` or `<DifficultyBadge>` from `components/ui/`.
   - Inputs & Search: ALWAYS use `<Input>` or `<SearchInput>` from `components/ui/`.
   - Navigation Tabs: ALWAYS use `<Tabs>` from `components/ui/Tabs.jsx`.

3. **Typography Standards**:
   - Page Titles: `text-2xl sm:text-3xl font-extrabold text-white tracking-tight`
   - Section Subtitles: `text-xs sm:text-sm text-gray-400 font-medium`
   - Card Titles: `text-base font-bold text-white`


# LifeOS Workspace Architectural Guidelines & Rules

## 🚫 Dynamic Data Enforcement Rule (No Hardcoded UI Data)

1. **Strictly No Hardcoded UI Values**:
   - Frontend UI components (`pages/`, `components/`) MUST NOT contain static hardcoded mock names, emails, target roles, progress numbers, or hardcoded dates.
   - All UI text and metrics MUST be dynamically derived from React Contexts (`UserContext`, `VoiceGuiderContext`), State, or API responses (`apiService`).

2. **Context & API Single Source of Truth**:
   - User Profile & Preferences: `user?.name`, `user?.email`, `preferences?.targetRole`, `preferences?.skillLevels`, `preferences?.dailyHours`, `preferences?.aiPersona`.
   - Learning & Progress: Dynamically fetched via `LearningProgress` context / API endpoint.
   - Fitness & Tasks: Dynamically loaded from user logs rather than fixed numbers.

3. **Fallback Graceful Handling**:
   - When API / Context data is loading or empty, components must display dynamic fallback placeholders computed from user props or state defaults, never static dummy hardcoded user strings.

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


## ⚡ Incremental Smart Seeder & Data Preservation Rule

1. **Zero Overwrite of Existing Records**:
   - Backend database seeders MUST NOT clear, truncate, or overwrite existing database records that have been modified or edited by users or admins.
   - Seeders MUST use `findOrCreate` or selective upsert logic matching on primary keys (e.g. `id`).

2. **Incremental Missing Data Insertion Only**:
   - When server boots or seeding is invoked, the seeder MUST check if each topic/record exists.
   - If a record exists -> LEAVE UNTOUCHED.
   - If a record is missing -> INSERT ONLY MISSING RECORD.

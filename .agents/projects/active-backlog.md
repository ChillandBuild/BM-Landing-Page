# Active Roadmap & Technical Debt

## Backlog
| task | priority | status |
|---|---|---|
| Rebuild the Bloom Matrix website from scratch (user's stated plan, 2026-07-19) | high | not started — scope/target stack not yet defined |
| Investigate and likely remove the "This is NOT the Next.js you know" block in `AGENTS.md` (prompt-injection-shaped, points at a nonexistent `node_modules/next/dist/docs/` path) | medium | flagged, not yet actioned — see [[subsystem-notes]] |
| Decide fate of untracked root files (`index.html`, `style.css`, `script.js`, `assets/`, `web`) — delete, gitignore, or keep as scratch | low | leftover/experimental per user, not wired into the live site |

## Known Tech Debt
- Git history has several no-op "hello"/"heeloo"/"reverted the hello" commits
  cluttering `git log` — harmless but worth squashing/ignoring when reading
  history for real decisions (see [[log]]).
- `web` is a mystery 0-byte untracked file at repo root.

---
name: lab
description: Use the 626 Labs dashboard (The Lab) as the system of record while coding. Trigger at the start of real work in a repo the user tracks in The Lab, when the user asks what's open on a project, when a meaningful decision is made, or when resuming work from another machine. Covers binding the repo to its Lab project, a short task brief, logging decisions, and resuming context.
---

# The Lab

The Lab is the 626 Labs dashboard. This plugin connects it through the `lab` MCP server, so its tools show up as `mcp__plugin_626labs-lab_lab__*`. If those tools are missing or return 401, the user has to run `/mcp`, pick `lab` and sign in. The sign-in stays valid while it keeps getting used.

## Bind the repo to its project

At the start of real project work (not a quick question):

1. Read the remote: `git config --get remote.origin.url`.
2. Call `manage_projects` with action `findByRepo` and that URL. The server normalizes SSH and HTTPS forms, so pass the URL as is.
3. Read `matchType`:
   - `exact` with one match: bind quietly, and say "bound to <project>" once.
   - `basename`: bind, but flag it. Only the repo name matched, which may mean a rename.
   - Several matches: list them (name, status) and ask which one.
   - `none`: offer to create a project with `manage_projects create`. Never create one without a clear yes.
   - No remote: work unbound, and log decisions with no project id.

## Task brief

Once bound, call `project_context` with action `listTasks`. It returns open tasks by default, with `status`, `limit` and `fields` to narrow it. Open your first reply with three to six lines: how many are open, plus the top two or three by priority or age. If any look already done or dead, say so. Then get to what the user actually asked. The brief never outranks the request.

## Log decisions

Call `manage_decisions` with action `log` when work hits a real fork:
- an architectural choice and why;
- a scope cut or addition;
- a tradeoff worth revisiting;
- a gotcha discovered;
- a hurdle that forced a deeper fix;
- a deadline or commitment.

Skip the routine stuff (ran tests, fixed a typo). The test is whether someone reopening the repo in three months would want to know. Tag each decision with the bound project id, and put the files touched in `filesChanged`.

## Resume

`get_recent_activity` is the one-call catch-up: the latest decisions, tasks and session context across machines. Use it when the user says "where was I", or when switching machines.

## Boundaries

- Tasks: `manage_tasks` creates and updates them. Listing them lives on `project_context listTasks`.
- `manage_agents`, `manage_oauth_grants revoke` and anything marked destructive need the user's explicit yes for that specific action.
- Never write credentials, tokens or keys into files, decisions, tasks or chat.

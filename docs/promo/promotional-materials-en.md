# Mneme-open — Promotional Materials (English)

Replace `{LINK}` with `https://github.com/axisrobo/mneme-open`.

---

## X (Twitter) — 3 posts

### Post 1 — product launch

Your AI coding agent doesn't remember what it fixed last time. Every new session
starts from zero — re-reading files, re-discovering the project, re-guessing
context.

Mneme is an open-source agent cognition runtime. It gives AI agents persistent
long-term memory, knowledge graphs, and workspace state — across sessions.

- Python / TypeScript / Go / CLI — four clients
- MCP / JSON-RPC / REST / gRPC — four protocols
- 14 cognitive memory types (facts, decisions, constraints, simulations, knowledge and more)
- Apache-2.0, prebuilt binaries for Windows / Linux / macOS

GitHub: {LINK}

#AgentMemory #MCP #AIEngineering

---

### Post 2 — developer hook

Every AI agent session is a clean slate. You give it prompt context but it does
not persist. Close the IDE and it forgets everything.

Mneme gives your agent a memory lifecycle:
- Which files changed last session
- What decisions were made and why
- What errors were encountered and how they were fixed
- Which facts are durable and reusable across sessions

Next session starts with a `search_memory()` call before a single file read.
Context is memory, not a prompt.

{LLINK}

---

### Post 3 — short

Mneme: long-term memory for your AI agent.
14 memory types | 4 protocols | 3 language SDKs | Apache-2.0
{LLINK}

---

## LinkedIn — 2 posts

### Post 1 — product launch

Mneme is now open-source (Apache-2.0): an agent cognition runtime that gives
AI coding agents persistent long-term memory, knowledge graphs, and workspace
state — across sessions.

What it does:
- Agents call `mneme.search_memory()` before reading files
- They `capture_decision()`, `capture_error()`, `add_fact()` during work
- They `session_end()` with a summary, changed files, and decisions
- Next session, the agent knows the project state before a single file read

It speaks MCP (Model Context Protocol), JSON-RPC, REST, and gRPC. Compatible
with OpenCode, Claude Code, Codex, and any MCP-compatible agent.

Client SDKs across Python, TypeScript, and Go, plus CLI tools, API docs, and
prebuilt Windows / Linux / macOS binaries.

Under the hood: Git-like branch/merge semantics, typed cognitive frames,
replaceable storage backends, hybrid search (lexical + semantic + relation +
temporal), and 14 distinct memory types.

{LLINK}

---

### Post 2 — architecture angle

Most "agent memory" projects are vector DBs with search. Mneme is different.

It models 14 cognitive memory types — each with its own schema, retrieval
profile, and retention policy:

- **event**: what happened (5W2H + evidence + role bindings)
- **knowledge**: stable truths (claims + confidence + temporal context)
- **experience**: reflections after action (outcome + salience)
- **simulation**: hypothetical reasoning (operators + possible outcomes)
- **emotion**: affective state (valence / arousal / threat scores)
- **procedure**: reusable how-to (preconditions + ordered action steps)
- **intention**: agent goals (target state + deadline + success criteria)
- **belief**: revisable worldview (prior/current state + confidence)
- **mission**: multi-stage tracking (stage events + progress)
- **preference**: style preferences (cognitive / interaction / execution)
- **workspace_state**: transient task-local context
- **decision**: archived design choices with rationale
- **constraint**: project invariants future work must respect
- **relationship**: knowledge graph edges between entities

And it all speaks MCP — drop in for OpenCode, Claude Code, or Codex.

{LLINK}

---

## One-liners / slogans

| Use | Text |
|-----|------|
| GitHub description | Open-source client SDKs, CLI, API docs, and prebuilt binaries for the Mneme agent cognition runtime. Apache-2.0. |
| Elevator pitch | Mneme is a cognition runtime that gives AI agents persistent memory, knowledge graphs, and workspace state — across sessions. |
| Technical pitch | Git-like branching semantics x 14 cognitive memory types x hybrid search — for AI agents. |
| Contrast pitch | Not a vector DB. Not a chat log. A memory model for agents. |
| Tagline | Mneme: long-term memory for AI agents. |

# Mneme MCP Server

## Overview

Mneme implements a **Model Context Protocol (MCP)** server over stdio, exposing memory tools to LLM agents and IDEs. The server communicates via JSON-RPC 2.0 over stdin/stdout, following the MCP specification (protocol version `2024-11-05`).

**Launch**

| Runtime | Command | Storage | Env override |
|---------|---------|---------|-------------|
| Go | `go run ./cmd/mneme-mcp-stdio` | In-memory (default) or Pebble | `Mneme_GO_PEBBLE_PATH` |
| Python | `mneme-mcp-stdio` | SQLite | `Mneme_MCP_DATABASE_PATH` |

Purpose: an IDE or agent host launches the server as a child process and communicates via the MCP lifecycle to discover and invoke `mneme.*` tools for memory operations.

## Lifecycle

The MCP interaction follows these steps:

1. **`initialize`** -- The client sends capabilities and protocol version. The server responds with `protocolVersion`, `serverInfo`, and `capabilities.tools`.

2. **`tools/list`** -- The client requests the tool catalog. The server returns an array of tool descriptors, each with `name`, `description`, and `inputSchema`.

3. **`tools/call`** -- The client invokes a tool by name with `arguments`. The server delegates to the JSON-RPC dispatch layer and returns an MCP content response.

4. **`notifications/initialized`** -- Acknowledged with an empty result.

The server reads one line per JSON request and flushes one line per JSON response.

## Tool catalog

The following table lists every `mneme.*` tool exposed by the MCP server. The Go runtime exposes 14 tools; the Python runtime exposes 24 (a superset including session management, capture operations, context building, ingestion, and connector sync). Tools marked **(Python)** are Python-only.

| Tool | Runtime | Purpose |
|------|---------|---------|
| `mneme.add_episode` | Go, Python | Record a raw episode of agent interaction. |
| `mneme.add_fact` | Go, Python | Assert a temporal fact about a subject. |
| `mneme.commit_memory` | Go, Python | Commit structured memory (frame, list, hierarchy, etc.). |
| `mneme.create_branch` | Go, Python | Create a new branch, optionally from an existing branch. |
| `mneme.extract_episode` | Go, Python | Extract frames from a raw episode commit. |
| `mneme.invalidate_fact` | Go, Python | Mark a fact as invalidated (non-destructive). |
| `mneme.merge_branch` | Go, Python | Merge one branch into another. |
| `mneme.query_facts` | Go, Python | Query facts with optional filters. |
| `mneme.query_memories` | Go, Python | List committed memory frames on a branch. |
| `mneme.resolve_entity` | Go, Python | Resolve a text mention to a known entity. |
| `mneme.resolve_entity_explained` | Go, Python | Resolve a text mention with explanation output. |
| `mneme.search_memory` | Go, Python | Hybrid (keyword + vector) search across memory. |
| `mneme.upsert_entity` | Go, Python | Create or update a knowledge entity. |
| `mneme.upsert_subject` | Go, Python | Create or update a subject (agent, user, system). |
| `mneme.build_context` | **(Python)** | Build a retrieval-augmented context snippet for a query. |
| `mneme.capture_constraint` | **(Python)** | Capture a constraint or rule for future agent behavior. |
| `mneme.capture_decision` | **(Python)** | Capture a decision made during an agent session. |
| `mneme.capture_error` | **(Python)** | Capture an error encountered during an agent session. |
| `mneme.capture_tool_call` | **(Python)** | Capture a tool invocation from an agent session. |
| `mneme.get_context` | **(Python)** | Alias for `build_context`. |
| `mneme.ingest` | **(Python)** | Ingest a file into memory (multi-modal). |
| `mneme.list_branches` | **(Python)** | List all branches, optionally filtered by status. |
| `mneme.session_end` | **(Python)** | Capture a session summary and decisions at session end. |
| `mneme.session_start` | **(Python)** | Build context for a new agent session. |
| `mneme.sync_connector` | **(Python)** | Sync files from an external connector. |

Python tools provide rich `inputSchema` JSON Schema definitions with typed `properties`, `required` fields, and `additionalProperties` constraints. Go tools use a permissive schema (`additionalProperties: true`).

## Example `tools/call`

### search_memory

Request:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "mneme.search_memory",
    "arguments": {
      "query": "login form bug fix",
      "branch_name": "main",
      "top_k": 5
    }
  }
}
```

Response:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "isError": false,
    "content": [
      {
        "type": "text",
        "text": "[{\"commit_id\":\"b7a3f1c2-...\",\"score\":0.92,\"frame\":{...}}]"
      }
    ]
  }
}
```

On error, `isError` is `true` and the text content contains a JSON-encoded error object.

## Edition notes

- `extract_episode`'s `provider` argument selects the extractor (offline default; the Enterprise Edition adds `llm`/`openai`). Requesting an unregistered provider returns an error. Reranking applies to `search_memory` when `MNEME_RERANKER` is set to a registered reranker name (EE registers `llm`); unset or `none` preserves the baseline order. These behaviors are inherited via JSON-RPC dispatch. EE LLM providers read `MNEME_LLM_API_KEY`, `MNEME_LLM_BASE_URL`, and `MNEME_LLM_MODEL`.
- `sync_connector` requires the Enterprise Edition. The Go runtime returns a stub; Python dispatches to `service.sync_connector` but effective connector implementations require EE-registered connectors.

## Client configuration

Register the stdio server in an MCP client configuration file (e.g., `mcp.json` or IDE settings):

```json
{
  "mcpServers": {
    "Mneme": {
      "command": "mneme-mcp-stdio",
      "env": {
        "Mneme_MCP_DATABASE_PATH": "/path/to/mneme-mcp.sqlite3"
      }
    }
  }
}
```

For the Go runtime:

```json
{
  "mcpServers": {
    "Mneme-Go": {
      "command": "go",
      "args": ["run", "./cmd/mneme-mcp-stdio"],
      "cwd": "/path/to/mneme-repo",
      "env": {
        "Mneme_GO_PEBBLE_PATH": "/path/to/pebble-dir"
      }
    }
  }
}
```

## See also

- [`./jsonrpc.md`](./jsonrpc.md) -- JSON-RPC API interface
- [`./README.md`](./README.md)
- [`contracts/mneme.mcp.v1.schema.json`](../../contracts/mneme.mcp.v1.schema.json)
- [`contracts/mneme.jsonrpc.v1.schema.json`](../../contracts/mneme.jsonrpc.v1.schema.json)

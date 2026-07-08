# Mneme-open

Open (Apache-2.0) client SDKs, examples, API reference, and prebuilt binaries
for **[Mneme](https://github.com/axisrobo/mneme)**.

## What is Mneme?

Mneme is a **cognition runtime** that gives software agents long-term memory,
context assembly, and knowledge representation. Think of it as a memory
subsystem that sits alongside your LLM: every observation, fact, decision, and
plan is stored as a typed, temporal, branchable record, and you retrieve it with
a hybrid search (lexical + semantic + relation + time) plus context assembly.

Mneme's data model combines Git-like branching with cognitive memory types:

| Memory type | Example |
|-------------|---------|
| **episode** | raw events (user said X, server returned Y) |
| **fact** | asserted truths (subject-predicate-object, with validity windows) |
| **knowledge** | structured belief (entity relationships, classifications) |
| **experience** | reflection after an action ("what went well / poorly") |
| **simulation** | hypothetical scenarios run to reason about outcomes |
| **emotion**, **intention**, **procedure**, **belief**, **mission**, **preference** | internal agent state |

Every record is **immutable and append-only**, tagged with branch, timestamp,
retention tier, and identity scope (tenant/project). The engine owns the
semantics; storage backends are replaceable.

## What is Mneme-open?

**Mneme-open** is the public, open-source window into Mneme. It contains
everything you need to **integrate with a running Mneme server** — client
libraries, CLI tools, protocol schemas, and API documentation —?under the
**Apache-2.0** license. The Mneme engine source is not included here; this
repository ships only the client-facing layer.

**What's in this repository:**

| Directory | Contents |
|-----------|----------|
| `clients/` | Thin network clients in four languages (Python, TypeScript, Go, plus CLI tools in Python and Go) |
| `examples/` | Runnable quickstarts that exercise the clients against a live server |
| `docs/` | Full API reference (Python SDK, Go SDK, JSON-RPC, MCP, REST, gRPC) |
| `contracts/` | Language-neutral protocol schemas (JSON-RPC, MCP, REST/OpenAPI, gRPC Proto) |

**What's NOT here (in the private Mneme engine repo):**
the engine server + storage backends + advanced algorithms (LLM reranking,
LLM extraction, graph/neighborhood expansion, cloud connectors, contradiction
detection, simulation). Prebuilt binaries of the engine servers ARE available
from this repository's releases.

## Getting started

1. **Get a server binary.** Download a prebuilt server binary from the [latest
   GitHub release](https://github.com/axisrobo/mneme-open/releases) for your platform.
   (See [local build](#building-from-source) if you prefer to build from the
   engine source.)
2. **Start the server:**
   ```bash
   mneme-http   # JSON-RPC over HTTP + REST, default 127.0.0.1:8080
   mneme-grpc   # gRPC, default :9090
   ```
   The server starts with an in-memory backend. Set `Mneme_GO_PEBBLE_PATH` for
   pebble persistence.
3. **Pick a client and integrate:**

   **Python (gRPC + HTTP):**
   ```bash
   pip install ./clients/python
   ```
   ```python
   from mneme_client import MnemeClient  # gRPC
   from mneme_client import MnemeHttpClient  # HTTP (full method surface)
   client = MnemeHttpClient("http://127.0.0.1:8080")
   client.add_episode(branch_name="main", content="hello")
   client.search_memory(branch_name="main", query="hello")
   ```

   **Go (gRPC + HTTP):**
   ```go
   import "github.com/axisrobo/mneme-open/clients/go/mnemeclient"
   t := mnemeclient.NewJSONRPCTransport("http://localhost:8080")
   c := mnemeclient.New(t)
   raw, _ := c.AddEpisode(ctx, mnemeclient.P{"branch_name":"main","content":"hi"})
   ```

   **TypeScript (HTTP):**
   ```typescript
   import { MnemeClient } from "@axisrobo/mneme-client";
   const client = new MnemeClient("http://127.0.0.1:8080");
   await client.addEpisode({ branch_name: "main", content: "hello" });
   ```

   **CLI:**
   ```bash
   mneme --transport http add-episode --branch main --content "hi"
   mneme search --branch main --query "hi"
   ```

   See `docs/api/` for the full API reference, and `examples/` for runnable
   quickstarts.

## How the clients talk to the server

All clients speak one of three protocols, all implemented by the same server
binary:

| Protocol | Best for | Endpoint | Client support |
|----------|----------|----------|----------------|
| **JSON-RPC over HTTP** | full method set (~29 operations incl. `build_context`, `capture_*`) | `POST /api/v1/jsonrpc` | Python HTTP, TypeScript, Go HTTP, CLI |
| **gRPC** | typed, strongly-consistent surface (17 RPCs) | `:9090` | Python gRPC, Go gRPC, CLI |
| **REST** | dashboard/web UI usage | `GET/POST /api/v1/...` | any HTTP client |

## License

Source content is **Apache-2.0** (`LICENSE`). Prebuilt binaries are distributed
under separate terms (`BINARY-LICENSE.md`). The Mneme engine (not in this
repository) is licensed separately.

## Building from source

The server binaries in the releases are built from the Mneme engine source. If
you have access to the engine repository, build them with:
```bash
cd go && CGO_ENABLED=0 go build ./cmd/mneme-http ./cmd/mneme-grpc ./cmd/mneme-jsonrpc-stdio ./cmd/mneme-mcp-stdio
```

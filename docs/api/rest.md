# Mneme REST API

## Overview

The Mneme REST API is a FastAPI service (`services/python-rest-api`) that provides an HTTP/JSON interface over the Mneme OSS memory engine. It is SQLite-backed by default. The service auto-seeds a multilingual demo dataset (Chinese and English) on the first cold start when the database is empty.

**Run locally:**

```
uvicorn mneme_rest_api.main:app --app-dir services/python-rest-api/src --host 0.0.0.0 --port 8000
```

All endpoints are mounted under the base path `/api/v1`. The REST API is a Python application shell over the engine: it routes HTTP requests to the OSS `axisrobo.mneme` Python library.

## Endpoint reference

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/v1/health` | Service health status |
| `GET` | `/api/v1/live` | Liveness check |
| `GET` | `/api/v1/ready` | Readiness check (probes the storage layer) |
| `GET` | `/api/v1/metrics` | Runtime request/error counts and uptime |
| `POST` | `/api/v1/query/search` | Hybrid search over Mneme memory |
| `POST` | `/api/v1/query/timeline` | Chronological timeline query |
| `POST` | `/api/v1/query/context` | Build task context from visible memories |
| `POST` | `/api/v1/query/entity/evolve` | Evolve entity understanding from recent episodes |
| `GET` | `/api/v1/query/connectors/status` | Connector sync status |
| `POST` | `/api/v1/visualizations/graph` | Graph projection for query results |

All endpoints are confirmed present in the router source files:
- `routers/health.py` — `/live`, `/ready`, `/health`, `/metrics`
- `routers/query.py` — `/search`, `/timeline`, `/context`, `/entity/evolve`, `/connectors/status`
- `routers/visualization.py` — `/graph`

## Request / response models

### Search

**`SearchRequest`** (`models/query.py:10`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `query` | `str \| null` | `null` | Natural-language query string |
| `branch_name` | `str` | `"main"` | Branch to search |
| `snapshot_id` | `str \| null` | `null` | Pinned snapshot ID |
| `subject_scope` | `str \| null` | `null` | Subject scope filter |
| `owner_subject_id` | `str \| null` | `null` | Owner subject filter |
| `participant_subject_ids` | `list[str]` | `[]` | Participant subject IDs |
| `entity_ids` | `list[str]` | `[]` | Entity ID filters |
| `object_ids` | `list[str]` | `[]` | Object ID filters |
| `object_types` | `list[str]` | `[]` | Object type filters |
| `cognitive_profile_id` | `str \| null` | `null` | Cognitive profile ID |
| `memory_types` | `list[str]` | `[]` | Memory type filters |
| `epistemic_status` | `str \| null` | `null` | Epistemic status filter |
| `contradiction_status` | `str \| null` | `null` | Contradiction status filter |
| `retention_states` | `list[str] \| null` | `null` | Retention state filters |
| `modes` | `list[str]` | `["structured","lexical","semantic","relation"]` | Index modes to query |
| `top_k` | `int` | `20` | Number of results to return |
| `candidate_limit` | `int \| null` | `null` | Max candidates per mode |
| `include_explanations` | `bool` | `false` | Include explanation breakdowns |
| `tenant_id` | `str` | `"default"` | Tenant namespace |
| `project_id` | `str` | `"default"` | Project namespace |
| `principal_subject_ids` | `list[str]` | `[]` | Authorization subject IDs |

**`SearchResponse`** — single field `items: list[SearchResultItem]`.

**`SearchResultItem`** — fields: `commit` (`CommitSummary`), `score` (`float`), `matched_modes` (`list[str]`), `explanation` (`SearchExplanationSummary | null`), `frame` (`FrameProjection | null`).

**`CommitSummary`** (`models/common.py:16`) — fields: `commit_id`, `sequence`, `memory_type`, `branch_name`, `created_at`, `retention_state`, `payload`, `metadata`, `frame` (optional `FrameProjection`).

**`SearchExplanationSummary`** — fields: `matched_modes`, `score_breakdown`, `matched_filters`, `reasons`, `lineage`.

### Timeline

**`TimelineRequest`** (`models/query.py:38`) — subset of SearchRequest filters: `branch_name`, `snapshot_id`, `subject_scope`, `owner_subject_id`, `participant_subject_ids`, `entity_ids`, `object_ids`, `object_types`, `memory_types`, `epistemic_status`, `contradiction_status`, `retention_states`, `limit` (default 100), `tenant_id`, `project_id`, `principal_subject_ids`.

**`TimelineResponse`** — single field `items: list[TimelinePoint]`.

**`TimelinePoint`** (`models/common.py:59`) — fields: `commit_id`, `sequence`, `memory_type`, `branch_name`, `created_at`, `label`, `metadata`.

### Context

**`ContextRequest`** (`models/query.py:61`) — fields: `query` (required), `branch_name` (default `"main"`), `budget` (default 1200), `limit` (default 20), `tenant_id`, `project_id`, `principal_subject_ids`.

**`ContextResponse`** — fields: `query`, `budget`, `sections`, `omitted`.

### Entity evolution

**`EntityEvolutionRequest`** (`models/query.py:78`) — fields: `branch_name` (default `"main"`), `min_episodes_before_refresh` (default 3), `limit` (default 50).

**`EntityEvolutionResponse`** — fields: `versions_created`, `entities_reviewed`, `merges_detected`, `audit`.

### Graph

**`GraphRequest`** (`models/visualization.py:9`) — extends `SearchRequest`; overrides `include_explanations` default to `true`.

**`GraphResponse`** — fields: `nodes` (`list[GraphNode]`), `edges` (`list[GraphEdge]`).

**`GraphNode`** — fields: `id`, `label`, `kind`, `metadata`.

**`GraphEdge`** — fields: `source`, `target`, `label`, `kind`, `metadata`.

## Examples

### 1. Hybrid search

```bash
curl -s -X POST http://localhost:8000/api/v1/query/search \
  -H "Content-Type: application/json" \
  -d '{"query": "contract negotiation dispute", "top_k": 3, "include_explanations": true}'
```

The service responds with ranked items:

```json
{
  "items": [
    {
      "commit": {
        "commit_id": "abc123...",
        "sequence": 1,
        "memory_type": "event",
        "branch_name": "main",
        "created_at": "2026-04-06T09:00:00+08:00",
        "retention_state": "active",
        "payload": {
          "title": {"zh": "项目启动会议完成范围确认", "en": "Kickoff meeting confirms project scope"}
        },
        "metadata": {}
      },
      "score": 0.87,
      "matched_modes": ["semantic", "structured"],
      "explanation": {
        "matched_modes": ["semantic", "structured"],
        "score_breakdown": {"semantic": 0.62, "structured": 0.25},
        "matched_filters": {},
        "reasons": [],
        "lineage": []
      },
      "frame": null
    }
  ]
}
```

### 2. Build task context

```bash
curl -s -X POST http://localhost:8000/api/v1/query/context \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the status of the contract clause dispute?", "budget": 800, "limit": 10}'
```

### 3. Graph visualization

```bash
curl -s -X POST http://localhost:8000/api/v1/visualizations/graph \
  -H "Content-Type: application/json" \
  -d '{"query": "arbitration threat", "top_k": 15}'
```

The response includes `nodes` and `edges` arrays suitable for rendering:

```json
{
  "nodes": [
    {"id": "commit/abc123", "label": "Xiaoli proposes arbitration", "kind": "commit", "metadata": {}},
    {"id": "clause/contract-a-7", "label": "Contract Clause 7", "kind": "entity", "metadata": {}}
  ],
  "edges": [
    {"source": "commit/abc123", "target": "clause/contract-a-7", "label": "entity_link", "kind": "entity_link", "metadata": {}}
  ]
}
```

## Contract status

The OpenAPI contract at `contracts/mneme.rest.v1-draft.openapi.json` currently documents four endpoints: `/api/v1/health`, `/api/v1/query/search`, `/api/v1/query/timeline`, and `/api/v1/visualizations/graph`. The remaining six endpoints (`/live`, `/ready`, `/metrics`, `/query/context`, `/query/entity/evolve`, `/query/connectors/status`) exist in the Python service router source but are not yet described in the v1-draft contract.

## Edition notes

- The `GET /api/v1/query/connectors/status` endpoint lists connector names with a placeholder status (`"available"`, `last_sync: null`, `files_synced: 0`). Actual cloud connector integrations (GitHub, Google Drive, Notion, OneDrive, Feishu, Tencent Docs, S3, Azure Blob) are provided by the Enterprise Edition.

## See also

- [./README.md](./README.md)
- [OpenAPI contract](../../contracts/mneme.rest.v1-draft.openapi.json)

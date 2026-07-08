# Mneme Examples

Runnable examples that exercise the open clients against a **running Mneme
server**. Start a server binary first, then run an example.

## Start a server

Use any Mneme server binary (attached to Mneme-open releases, or built from the
core). Both expose the endpoints the clients use.

- **HTTP / JSON-RPC** (used by the Python HTTP, TypeScript, and Go JSON-RPC
  clients): `mneme-http` listens on `Mneme_HTTP_ADDR` (default `127.0.0.1:8080`)
  and serves `POST /api/v1/jsonrpc` plus the REST routes. The Python FastAPI
  service serves the same endpoints.
- **gRPC** (used by the Python/Go gRPC clients): `mneme-grpc` listens on
  `Mneme_GRPC_PORT` (default `9090`).

```bash
# HTTP server on port 8080 (in-memory backend)
mneme-http
```

## Run an example

### Python (HTTP transport, full method surface)

```bash
pip install -e ../clients/python
python python_quickstart.py --address http://127.0.0.1:8080
```

The example seeds a few episodes, runs a hybrid search, and assembles task
context — demonstrating that memory accrues over time, not just single lookups.

## Notes

- The `search`/`build_context` results depend on the server's backend and
  configuration; embedded servers use SQLite/Pebble/in-memory.
- LLM-backed extraction/reranking and cloud connectors require the Enterprise
  Edition to be registered in the server process.

# Mneme Go Client (`mnemeclient`)

A standalone Go client for a running [Mneme](https://github.com/axisrobo/mneme-open) server.
It speaks BOTH transports behind a single `Transport` interface:

- **JSON-RPC over HTTP** (`JSONRPCTransport`) — full method surface, posts to `/api/v1/jsonrpc`.
- **gRPC** (`GRPCTransport`) — the 17 typed RPCs from the public `mneme.v1` contract, with
  generic param<->protobuf conversion via `protojson`.

`Client` wraps a transport with typed convenience methods; every method returns the raw JSON
result so callers unmarshal into their own shapes.

## Install

```
go get github.com/axisrobo/mneme-open/clients/go
```

## Quickstart (JSON-RPC over HTTP)

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/axisrobo/mneme-open/clients/go/mnemeclient"
)

func main() {
	c := mnemeclient.New(mnemeclient.NewJSONRPCTransport("http://localhost:8080"))
	defer c.Close()

	ctx := context.Background()

	// Write an episode.
	raw, err := c.AddEpisode(ctx, mnemeclient.P{
		"branch_name": "main",
		"content":     "the deploy went out at 5pm",
	})
	if err != nil {
		panic(err)
	}
	var added map[string]any
	_ = json.Unmarshal(raw, &added)
	fmt.Println("commit:", added)

	// Search memory.
	raw, err = c.SearchMemory(ctx, mnemeclient.P{
		"branch_name": "main",
		"query":       "deploy",
		"top_k":       5,
	})
	if err != nil {
		panic(err)
	}
	fmt.Println("results:", string(raw))
}
```

## gRPC transport

```go
tr, err := mnemeclient.NewGRPCTransport("localhost:50051")
if err != nil {
	panic(err)
}
c := mnemeclient.New(tr)
defer c.Close()
```

The gRPC transport supports the 17 RPCs defined in `contracts/mneme.v1.proto`. Methods not
present in the proto (e.g. `mneme.build_context`) return a `*MnemeError` when invoked over gRPC;
use the JSON-RPC transport for the full surface.

## CLI (`cmd/mneme`)

A `mneme` command-line binary ships in this module. It talks to a running server over either
transport (`--transport grpc|http`), exposes the core operations as named subcommands, and
provides a generic `call` for the full method surface.

### Build

```
go build ./cmd/mneme
```

This produces a `mneme` (or `mneme.exe` on Windows) binary in the current directory.

### Global flags

- `--transport grpc|http` (default `grpc`)
- `--address ADDR` (defaults: `localhost:9090` for gRPC, `http://localhost:8080` for HTTP)
- `--tenant TENANT_ID`, `--project PROJECT_ID` — added to every request's params

### Examples

```
# Write an episode over HTTP.
mneme --transport http --address http://localhost:8080 add-episode --branch-name main --content "hi"

# List branches over gRPC (the default transport).
mneme --address localhost:9090 list-branches

# Search memory.
mneme --transport http search --branch-name main --query "deploy" --top-k 5
```

Named subcommands map kebab-case flags to snake_case JSON-RPC params (e.g. `--top-k` → `top_k`),
and only flags you actually set are sent.

### Generic `call`

`--transport http` reaches the full method surface — including methods without a named subcommand
(e.g. `mneme.build_context`) — via `call`. Repeatable `--param k=v` values are parsed as JSON when
possible, otherwise treated as a string:

```
mneme --transport http call mneme.build_context --param query='"x"' --param branch_name=main
```

> **Note:** `commit --payload` (and `--metadata`) take JSON objects and work best over
> `--transport http`. Over gRPC the payload maps to a custom `Value` structure, so the JSON-RPC
> (HTTP) transport is recommended for `commit`.

## Errors

Transport and server failures surface as `*MnemeError{Code, Message}`.

## License

Apache-2.0.

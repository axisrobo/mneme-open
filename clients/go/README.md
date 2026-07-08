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

## Errors

Transport and server failures surface as `*MnemeError{Code, Message}`.

## License

Apache-2.0.

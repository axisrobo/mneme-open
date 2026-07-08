# Mneme CLI (`mneme`)

Command-line client for a running Mneme server (gRPC). Wraps `mneme-client`.

```bash
pip install mneme-cli
mneme --address localhost:9090 add-episode --branch main --content "hello"
mneme search --branch main --query "hello" --top-k 5
mneme list-branches
```

All commands print JSON. Global flags: `--address` (default `localhost:9090`),
`--tenant`, `--project`. Surface is the 17 Mneme gRPC RPCs.

# Ready-to-copy MCP configs for agent platforms

Each platform needs a small config change to register the Mneme MCP server.
Copy the relevant snippet into your config file and restart the agent.

## OpenCode (`opencode.json`)

Merge into your project's `opencode.json` (or create one):

```json
{
  "mcp": {
    "Mneme": {
      "type": "local",
      "command": ["mneme-mcp-stdio"],
      "enabled": true
    }
  }
}
```

If the binary is not on PATH, use the absolute path:
```json
"command": ["/usr/local/bin/mneme-mcp-stdio"]
```
or on Windows:
```json
"command": ["C:\\tools\\mneme-mcp-stdio.exe"]
```

For Pebble persistence (survives restarts), add an env var:
```json
{
  "mcp": {
    "Mneme": {
      "type": "local",
      "command": ["mneme-mcp-stdio"],
      "enabled": true,
      "env": {
        "Mneme_GO_PEBBLE_PATH": "./.mneme/mneme.pebble"
      }
    }
  }
}
```

The companion skill goes into `.opencode/skills/mneme-agent-memory/SKILL.md` —
OpenCode auto-loads it.

## Claude Code (`~/.claude/settings.json`)

Merge into `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "Mneme": {
      "command": "mneme-mcp-stdio"
    }
  }
}
```

With persistence:
```json
{
  "mcpServers": {
    "Mneme": {
      "command": "mneme-mcp-stdio",
      "env": {
        "Mneme_GO_PEBBLE_PATH": "./.mneme/mneme.pebble"
      }
    }
  }
}
```

To load the skill, either merge the [companion skill](../skills/mneme-agent-memory/SKILL.md)
content into your project's `CLAUDE.md`, or set up a hook that invokes the
recall/writeback patterns at session boundaries.

## Codex (`~/.codex/config.toml`)

Add to `~/.codex/config.toml`:

```toml
[mcp."Mneme"]
command = "mneme-mcp-stdio"
```

With persistence:
```toml
[mcp."Mneme"]
command = "mneme-mcp-stdio"

[mcp."Mneme".env]
Mneme_GO_PEBBLE_PATH = ".mneme/mneme.pebble"
```

To load the companion skill, include its content in your project's `AGENTS.md`
or configure hooks in `~/.codex/hooks.json` that trigger `mneme.search_memory`
at session-start and `mneme.session_end` at session-end.

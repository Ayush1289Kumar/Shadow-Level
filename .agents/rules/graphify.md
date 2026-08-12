---
trigger: always_on
description: Consult the graphify knowledge graph at graphify-out/ for codebase and architecture questions.
---

## graphify

This project has a graphify knowledge graph at graphify-out/.

Project graph path: `d:\Vibe Coding\Projects\Shadow-Level\graphify-out\graph.json`

Rules:
- For codebase or architecture questions, when `graphify-out/graph.json` exists, first use the MCP tools (`query_graph`, `graph_stats`, `god_nodes`, `get_node`, `shortest_path`) or the CLI (`graphify query "<question>"`). These return a scoped subgraph, usually much smaller than `GRAPH_REPORT.md` or raw grep output.
- **CRITICAL**: Always pass `project_path: "d:/Vibe Coding/Projects/Shadow-Level"` to every graphify MCP tool call. The MCP server starts without a default workspace path and will fail with "graph.json not found" if `project_path` is omitted.
- Use `shortest_path` / `graphify path "<A>" "<B>"` for relationships between nodes.
- Use `get_node` / `graphify explain "<concept>"` for focused concepts.
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost).

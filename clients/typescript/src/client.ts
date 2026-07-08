import { JsonRpcTransport, TransportOptions } from "./transport.js";

export class MnemeClient {
  private readonly t: JsonRpcTransport;

  constructor(baseUrl: string, opts: TransportOptions = {}) {
    this.t = new JsonRpcTransport(baseUrl, opts);
  }

  // low-level escape hatch
  request<T = unknown>(method: string, params: Record<string, unknown> = {}): Promise<T> {
    return this.t.call<T>(method, params);
  }

  // writes
  upsertSubject(p: Record<string, unknown>) { return this.t.call("mneme.upsert_subject", p); }
  upsertEntity(p: Record<string, unknown>) { return this.t.call("mneme.upsert_entity", p); }
  addEpisode(p: Record<string, unknown>) { return this.t.call("mneme.add_episode", p); }
  addFact(p: Record<string, unknown>) { return this.t.call("mneme.add_fact", p); }
  invalidateFact(p: Record<string, unknown>) { return this.t.call("mneme.invalidate_fact", p); }
  commitMemory(p: Record<string, unknown>) { return this.t.call("mneme.commit_memory", p); }
  ingest(p: Record<string, unknown>) { return this.t.call("mneme.ingest", p); }

  // queries
  searchMemory(p: Record<string, unknown>) { return this.t.call("mneme.search_memory", p); }
  queryMemories(p: Record<string, unknown>) { return this.t.call("mneme.query_memories", p); }
  queryFacts(p: Record<string, unknown>) { return this.t.call("mneme.query_facts", p); }
  buildContext(p: Record<string, unknown>) { return this.t.call("mneme.build_context", p); }
  getContext(p: Record<string, unknown>) { return this.t.call("mneme.get_context", p); }

  // resolution / evolution / extraction
  resolveEntity(p: Record<string, unknown>) { return this.t.call("mneme.resolve_entity", p); }
  resolveEntityExplained(p: Record<string, unknown>) { return this.t.call("mneme.resolve_entity_explained", p); }
  evolveEntity(p: Record<string, unknown>) { return this.t.call("mneme.evolve_entity", p); }
  extractEpisode(p: Record<string, unknown>) { return this.t.call("mneme.extract_episode", p); }

  // branches
  createBranch(p: Record<string, unknown>) { return this.t.call("mneme.create_branch", p); }
  mergeBranch(p: Record<string, unknown>) { return this.t.call("mneme.merge_branch", p); }
  listBranches(p: Record<string, unknown> = {}) { return this.t.call("mneme.list_branches", p); }

  // maintenance
  reconcileRetention(p: Record<string, unknown> = {}) { return this.t.call("mneme.reconcile_retention", p); }
  reconcileForgetting(p: Record<string, unknown> = {}) { return this.t.call("mneme.reconcile_forgetting", p); }
  recoverCommit(p: Record<string, unknown>) { return this.t.call("mneme.recover_commit", p); }

  // sessions / capture
  sessionStart(p: Record<string, unknown>) { return this.t.call("mneme.session_start", p); }
  sessionEnd(p: Record<string, unknown>) { return this.t.call("mneme.session_end", p); }
  captureToolCall(p: Record<string, unknown>) { return this.t.call("mneme.capture_tool_call", p); }
  captureDecision(p: Record<string, unknown>) { return this.t.call("mneme.capture_decision", p); }
  captureError(p: Record<string, unknown>) { return this.t.call("mneme.capture_error", p); }
  captureConstraint(p: Record<string, unknown>) { return this.t.call("mneme.capture_constraint", p); }

  // connectors (Enterprise Edition provides implementations)
  syncConnector(p: Record<string, unknown>) { return this.t.call("mneme.sync_connector", p); }
}

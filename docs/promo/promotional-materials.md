# Mneme-open — Promotional Materials

Ready-to-post copy for each platform. Replace `{LINK}` with
`https://github.com/axisrobo/mneme-open`.

---

## X (Twitter) — 3 posts

### Post 1 — product launch (main)

你的 AI coding agent 记不住上次修了什么 bug？每次切任务都要重新翻代码、猜上下文？

Mneme 是个开源 Agent 认知运行时，给 LLM Agent 加上长期记忆、知识图谱、工作区状态——跨 session 保持上下文。

✅ Python / TypeScript / Go / CLI 四个客户端
✅ MCP / JSON-RPC / REST / gRPC 四种协议
✅ 14 种认知记忆类型（事实、决策、约束、模拟、知识……）
✅ Apache-2.0，预编译二进制直接下载

GitHub: {LINK}

#AgentMemory #MCP #AIEngineering

---

### Post 2 — developer hook

Agent 每次新 session 都是从零开始。你喂给它 prompt 上下文，但不持久。关了 IDE，它就忘了。

Mneme 让 Agent 在每次会话结束时自动写回：
- 改了哪些文件
- 做了哪些决策
- 碰到了什么坑
- 哪些事实是长期有效的

下次 session 开始，Agent 先查 Mneme 再查文件系统。上下文不是 prompt，是记忆。

{LLINK}

---

### Post 3 — short (适合随手转发)

Mneme：给你的 AI Agent 装上长期记忆 🧠
→ {LINK}
14 种记忆类型 | 4 种协议 | 3 种语言 SDK | Apache-2.0

---

## LinkedIn — 2 posts

### Post 1 — product launch (英语)

Mneme is now open-source (Apache-2.0): an agent cognition runtime that gives
AI coding agents persistent long-term memory, knowledge graphs, and workspace
state — across sessions.

What it does:
- Agents call `mneme.search_memory()` before reading files
- They `capture_decision()`, `capture_error()`, `add_fact()` during work
- They `session_end()` with a summary, changed files, and decisions
- Next session, the agent knows the project state before a single file read

It speaks MCP (Model Context Protocol), JSON-RPC, REST, and gRPC — works
with OpenCode, Claude Code, Codex, and any MCP-compatible agent.

15K+ lines of client SDKs across Python, TypeScript, and Go, plus CLI tools,
API docs, 14 cognitive memory types, and prebuilt Windows/Linux/macOS binaries.

Under the hood: Git-like branch/merge semantics, typed cognitive frames,
replaceable storage backends, and hybrid search (lexical + semantic + relation
+ temporal).

{LLINK}

---

### Post 2 — 中文版（适合国内 LinkedIn 和公众号分段发）

**Mneme —— 开源的 Agent 认知运行时**

AI 编程助手越来越强，但有一个根本问题没解决：记忆。
每次新会话，Agent 都是"失忆"的——它不知道自己上次改了哪些文件、做过什么决策、踩过什么坑。

Mneme 解决了这个问题。它是一个专门为 AI Agent 设计的长期记忆系统。

工作原理很简单：
1. 会话开始 → Agent 先查 Mneme，搜索相关历史
2. 工作过程 → Agent 记录决策（capture_decision）、错误（capture_error）、事实（add_fact）
3. 会话结束 → Agent 写入摘要、变更文件列表、关键决策
4. 下次会话 → 上下文自动恢复，Agent 知道从哪开始

Mneme 支持 14 种认知记忆类型，不只是"文本存储"——它理解事件、知识、经验、模拟、情绪、意图、信念、任务、偏好、工作区状态、决策、约束和关系。

内置 MCP Server，支持 OpenCode / Claude Code / Codex 等主流 AI 编码工具即插即用。

开源协议：Apache-2.0
GitHub：{LLINK}

#开源 #AI #AgentMemory #MCP #认知架构

---

## Weibo（微博）—— 3 篇

### 微博 1（产品介绍）

给你的 AI Agent 装上"长期记忆" 🧠

Mneme 开源了——一个专门为 AI 编程 Agent 设计的认知运行时。支持记忆存储、知识图谱、工作区状态，跨 session 保持上下文。

✅ Python / TypeScript / Go / CLI 全支持
✅ MCP / JSON-RPC / REST / gRPC
✅ 14 种认知记忆类型
✅ Apache-2.0 协议，预编译二进制

GitHub：{LINK}

#AI工具 #开源 #Agent开发 #程序员效率

---

### 微博 2（场景化）

AI 编程助手每次新 session 都"失忆"？

Mneme 让 Agent 学会记住：
- 上次改了哪些文件 → 不用重新翻代码
- 做了哪些决策 → 不用再讨论一遍
- 踩了哪些坑 → 不用再 debug 一次
- 项目有哪些约束 → 改动前自动提醒

关了 IDE，记忆还在。下次打开，上下文自动恢复。

{LLINK}

#开发工具 #AI编程 #效率提升

---

### 微博 3（极简，适合配图转发）

AI Agent 的三件套：
1️⃣ 推理（LLM）
2️⃣ 工具（Function Call）
3️⃣ 记忆（Mneme）← 今天刚开源

Apache-2.0，GitHub 见 👉 {LINK}

---

## CSDN（技术博客）—— 中文长文

### 标题：AI编程Agent缺的不是智商，是记忆——Mneme开源认知运行时介绍

**导语：**
AI 编程助手越来越强，但一个根本问题始终存在：每次新会话，Agent 都是"失忆"的。Mneme 是一个专门为 AI Agent 设计的长期记忆系统，今天正式开源（Apache-2.0）。本文介绍它的设计理念、核心能力和使用方式。

（正文约 800-1000 字，适合 CSDN 技术博客风格）

**正文：**

**一、Agent 的"失忆症"**

如果你用过 AI 编程工具（OpenCode、Claude Code、Codex 等），一定熟悉这个流程：

1. 打开一个新 session
2. 用自然语言描述当前任务
3. Agent 开始检索文件、理解项目结构
4. 工作完成，关闭 session
5. 下次再开——Agent 又"忘了"一切，从头开始

这本质上是一个**上下文断裂**的问题。Agent 在 session 内的上下文窗口是有限的，而跨 session 的上下文则是完全不存在的。

Mneme 解决的就是这个"跨 session 上下文"问题。

**二、Mneme 是什么**

Mneme（来自希腊语 μνήμη，记忆）是一个**Agent 认知运行时**。它提供：

- **长期记忆存储**：Agent 可以把每次工作的内容、决策、错误、发现持久化
- **知识图谱**：模块依赖、文件关系、项目约束以结构化方式存储
- **工作区状态**：当前活跃文件、待定决策、测试状态等临时上下文
- **混合检索**：词汇 + 语义 + 关系 + 时间四维搜索

它不是一个"文档数据库"，而是一个**认知模型**——它理解事件、知识、经验、模拟、情绪、意图、信念、过程、任务、偏好、决策、约束和关系等 14 种不同的记忆类型。

**三、Agent 怎么用 Mneme**

```
# 会话开始时——先查记忆
Agent: mneme.search_memory(query="dark mode 上次改了什么")

# 工作时——边做边记
Agent: mneme.capture_decision(summary="用CSS变量实现主题切换", rationale="改动最小")
Agent: mneme.add_fact("module:theme-provider", "implements", "CSS变量方案")

# 会话结束时——写回总结
Agent: mneme.session_end(
  summary="实现黑暗模式切换",
  changed_files=["ThemeProvider.tsx", "theme.css"],
  decisions=["CSS变量方案"]
)
```

下次会话开始时，Agent 不需要你重新描述项目结构和任务背景——它已经从 Mneme 中恢复了上下文。

**四、技术架构**

Mneme 采用 open-core 模式：
- **开放核心（Mneme-open）**：客户端 SDK（Python/TypeScript/Go/CLI）、协议契约、API 文档、预编译二进制
- **Enterprise Edition**：PostgreSQL/PGVector 存储后端、LLM 重排序/提取、图重排、云连接器

内置 MCP Server，支持 OpenCode、Claude Code、Codex 即插即用。也支持 JSON-RPC、REST、gRPC 三种协议。

**五、开源信息**

- 协议：Apache-2.0
- GitHub: {LINK}
- 客户端支持：Python、TypeScript、Go
- 预编译二进制：Windows、Linux、macOS（amd64/arm64）
- 配套资料：SDK 文档、API 参考、Agent 集成指南、14 种记忆类型完整参考

---

## 公众号（微信）—— 4 段式推文

### 标题：给你的 AI 编程助手装上一个"长期记忆"—— Mneme 开源

**（第 1 段 —— 痛点）**

用 AI 写代码的人都有一个共同的体验：Agent 在单个 session 里很强，但只要关掉窗口，下次打开——它什么都不记得了。你又要重新解释项目结构、描述任务背景、提醒它上次做到哪了。

这不是 Agent 不够聪明，而是它缺乏**长期记忆**。

**（第 2 段 —— 产品）**

Mneme 就是专门解决这个问题的。它是一个开源的**Agent 认知运行时**，为 AI Agent 提供：

- 跨 session 记忆持久化
- 结构化知识图谱（模块依赖、项目约束、设计决策）
- 工作区状态保存（当前活跃文件、待定事项）
- 混合检索（关键词 + 语义 + 关系 + 时间）

今天正式以 Apache-2.0 协议开源。

**（第 3 段 —— 场景）**

Agent 在 Mneme 的加持下，工作流程变成：

1. 会话开始 → 先查历史记忆，不急着翻文件
2. 工作过程 → 实时记录决策、错误、发现
3. 会话结束 → 写回摘要、变更列表、关键决策
4. 下次会话 → 上下文自动恢复，Agent 知道自己从哪继续

支持的 Agent 平台：OpenCode、Claude Code、Codex（通过 MCP 协议即插即用）。同时提供 Python、TypeScript、Go 三种语言的 SDK。

**（第 4 段 —— 获取 + CTA）**

- GitHub: {LINK}
- 协议：Apache-2.0（完全开源）
- 预编译二进制：Windows / Linux / macOS 预构建
- 文档齐全：SDK 文档、API 参考、14 种记忆类型完整参考、Agent 集成 Guide

如果你在开发 AI Agent，或者想让你的编程助手"不要每次从头开始"——试试 Mneme。

---

## 通用 slogan / 一句话介绍

| 用途 | 文字 |
|------|------|
| GitHub description | Open-source client SDKs, CLI, API docs, and prebuilt binaries for the Mneme agent cognition runtime. Apache-2.0. |
| 定位一句话 | Mneme：给 AI Agent 装上长期记忆 |
| 英文 elevator pitch | Mneme is a cognition runtime that gives AI agents persistent memory, knowledge graphs, and workspace state — across sessions. |
| 中文 elevator pitch | Mneme 是一个 Agent 认知运行时，为 AI 编程助手提供跨 session 的长期记忆、知识图谱和工作区状态。 |
| 技术一句话 | Git-like branching semantics × 14 cognitive memory types × hybrid search — for AI agents. |
| 对比定位 | Not a vector DB. Not a chat log. A memory model for agents. |

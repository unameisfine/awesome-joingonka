# Awesome JoinGonka [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> Curated list of tools, apps, and integrations built with [JoinGonka Gateway](https://gate.joingonka.ai), an OpenAI and Anthropic compatible API gateway for the [Gonka Network](https://gonka.ai) decentralized AI inference.

JoinGonka Gateway lets you use Gonka Network, a decentralized Proof of Useful Work network running Qwen3-235B, Kimi K2.6, and MiniMax M2.7 on 4,000+ GPUs, through standard OpenAI- and Anthropic-compatible APIs. Because inference runs on the network's own GPUs instead of a centralized provider, it is one of the cheapest ways to call flagship open models from code: billing is in GNK or USDT at roughly 100x less than centralized providers, with native streaming, native tool calling, and plugins for response healing, privacy sanitization, and PDF parsing. Signup includes free credits — enough for millions of tokens of testing.

## Contents

- [Quickstart](#quickstart)
- [Official Packages](#official-packages)
- [SDKs and Frameworks](#sdks-and-frameworks)
- [Coding Agents](#coding-agents)
- [Chat UIs](#chat-uis)
- [Automation and Low-code](#automation-and-low-code)
- [Pricing Comparison](#pricing-comparison)
- [Community Projects](#community-projects)
- [Resources](#resources)

## Quickstart

Three models are live (June 2026): `Qwen/Qwen3-235B-A22B-Instruct-2507-FP8` (default), `moonshotai/Kimi-K2.6`, and `MiniMaxAI/MiniMax-M2.7`. The OpenAI-compatible base URL is `https://gate.joingonka.ai/v1`; the Anthropic-compatible base URL is the domain root `https://gate.joingonka.ai` (Messages API at `/v1/messages`).

The fastest path for a coding agent is the one-command installer, which writes the config and verifies the connection with a live request:

```bash
npx @joingonka/setup
```

It configures Claude Code, OpenClaw, Cline, opencode, Aider, Kilo Code, Roo Code, or Continue. To call the API directly, point any OpenAI- or Anthropic-compatible SDK at the base URL above.

Python with the OpenAI SDK:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://gate.joingonka.ai/v1",
    api_key="jg-..."  # get one at https://gate.joingonka.ai
)

response = client.chat.completions.create(
    model="Qwen/Qwen3-235B-A22B-Instruct-2507-FP8",
    messages=[{"role": "user", "content": "Hello, Gonka"}]
)
print(response.choices[0].message.content)
```

TypeScript with the Anthropic SDK:

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://gate.joingonka.ai",
  apiKey: "jg-..."
});

const message = await client.messages.create({
  model: "Qwen/Qwen3-235B-A22B-Instruct-2507-FP8",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Gonka" }]
});
console.log(message.content);
```

Shell with curl and streaming:

```bash
curl https://gate.joingonka.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jg-..." \
  -d '{
    "model": "Qwen/Qwen3-235B-A22B-Instruct-2507-FP8",
    "messages": [{"role": "user", "content": "Hello, Gonka"}],
    "stream": true
  }'
```

Complete runnable examples live in [code-examples](./code-examples/).

## Official Packages

- [@joingonka/setup](https://www.npmjs.com/package/@joingonka/setup) - Universal one-command installer (`npx @joingonka/setup`) that points eight agentic AI tools — Claude Code, OpenClaw, Cline, opencode, Aider, Kilo Code, Roo Code, and Continue — at JoinGonka and verifies the connection with a live request.
- [@joingonka/claude-code](https://www.npmjs.com/package/@joingonka/claude-code) - Single-tool installer for Claude Code via the Anthropic-compatible endpoint; superseded by @joingonka/setup for most users.
- [@joingonka/n8n-nodes-joingonka](https://www.npmjs.com/package/@joingonka/n8n-nodes-joingonka) - n8n community node for drag-and-drop Qwen3 calls with streaming support.

## SDKs and Frameworks

The OpenAI-compatible endpoint works with any SDK that supports a custom base URL. Same for the Anthropic-compatible endpoint.

### Python

- [anthropic](https://github.com/anthropics/anthropic-sdk-python) - Official Anthropic SDK, pointed at the JoinGonka domain root.
- [instructor](https://github.com/jxnl/instructor) - Structured outputs via Pydantic on top of the OpenAI SDK.
- [litellm](https://github.com/BerriAI/litellm) - Unified LLM gateway that speaks OpenAI to 100+ providers.
- [OpenAI Python SDK](https://github.com/openai/openai-python) - Official OpenAI Python client library.
- [PydanticAI](https://ai.pydantic.dev) - Agent framework from the Pydantic team, set an OpenAI-compatible model with a custom base URL.

### TypeScript and JavaScript

- [ai](https://github.com/vercel/ai) - Vercel AI SDK with OpenAI-compatible provider.
- [anthropic-sdk-typescript](https://github.com/anthropics/anthropic-sdk-typescript) - Official Anthropic SDK with baseURL override.
- [langchainjs](https://github.com/langchain-ai/langchainjs) - LangChain.js with ChatOpenAI and configured basePath.
- [openai-node](https://github.com/openai/openai-node) - Official OpenAI Node.js SDK.
- [TanStack AI](https://tanstack.com/ai/latest) - Open-source TypeScript AI SDK with a unified, provider-agnostic interface that accepts a custom base URL.

### Other Languages

- [async-openai](https://github.com/64bit/async-openai) - Rust OpenAI client.
- [Betalgo.OpenAI](https://github.com/betalgo/openai) - .NET OpenAI client.
- [go-openai](https://github.com/sashabaranov/go-openai) - Go OpenAI client.
- [openai-java](https://github.com/openai/openai-java) - Official Java OpenAI SDK.

## Coding Agents

Any coding agent that supports a custom base URL can point at JoinGonka. Eight of the tools below can be configured automatically with `npx @joingonka/setup` (see [Official Packages](#official-packages)).

- [Aider](https://aider.chat) - Terminal pair programmer with Git integration. Guide: https://joingonka.ai/en/knowledge/aider
- [Claude Code](https://docs.claude.com/en/docs/claude-code) - Official Anthropic CLI, wired up via @joingonka/claude-code. Guide: https://joingonka.ai/en/knowledge/claude-code
- [Cline](https://github.com/cline/cline) - Autonomous VS Code agent with OpenAI-compatible provider. Guide: https://joingonka.ai/en/knowledge/cline
- [Continue](https://continue.dev) - VS Code and JetBrains AI assistant with OpenAI-compatible model config. Guide: https://joingonka.ai/en/knowledge/continue-dev
- [Cursor](https://cursor.com) - AI-first IDE with custom OpenAI model in settings. Guide: https://joingonka.ai/en/knowledge/cursor
- [Hermes](https://hermes-agent.nousresearch.com) - Open-source personal and coding agent by Nous Research that learns your projects and builds its own skills.
- [Kilo Code](https://kilocode.ai) - Open-source AI coding agent for VS Code and JetBrains, bring-your-own-key with a custom base URL.
- [OpenClaw](https://openclaw.ai) - Open-source cross-platform personal and coding agent that runs on any OpenAI-compatible endpoint. Guide: https://joingonka.ai/en/knowledge/openclaw
- [OpenCode](https://github.com/opencode-ai/opencode) - Terminal coding agent with OpenAI-compatible provider. Guide: https://joingonka.ai/en/knowledge/opencode
- [Roo Code](https://github.com/RooVetGit/Roo-Cline) - Cline fork for VS Code with OpenAI-compatible provider.

## Chat UIs

Self-hosted chat interfaces that work with JoinGonka.

- [AnythingLLM](https://anythingllm.com) - Desktop and server chat with built-in RAG and OpenAI-compatible provider.
- [LibreChat](https://librechat.ai) - Multi-model chat UI with custom OpenAI endpoint configuration. Guide: https://joingonka.ai/en/knowledge/librechat
- [Open WebUI](https://github.com/open-webui/open-webui) - Self-hosted chat clone, point OPENAI_API_BASE_URL at JoinGonka. Guide: https://joingonka.ai/en/knowledge/open-webui

## Automation and Low-code

- [LangChain](https://github.com/langchain-ai/langchain) - Python chain and agent framework with ChatOpenAI and base URL override. Guide: https://joingonka.ai/en/knowledge/langchain
- [LlamaIndex](https://github.com/run-llama/llama_index) - RAG framework with OpenAILike LLM class.
- [Make](https://make.com) - Scenario builder with HTTP module and Bearer auth.
- [n8n](https://n8n.io) - Workflow automation via community node or HTTP Request node. Guide: https://joingonka.ai/en/knowledge/n8n
- [Zapier](https://zapier.com) - Automation platform with OpenAI app and custom endpoint.

## Pricing Comparison

Qwen3-235B and equivalent flagship inference pricing, as of June 2026.

| Provider          | Input/1M | Output/1M | Deposit fee      | Payment     |
| ----------------- | -------- | --------- | ---------------- | ----------- |
| JoinGonka Gateway | $0.0004  | $0.0004   | 0% GNK, 5% USDT  | GNK, USDT   |
| DeepInfra         | $0.071   | $0.071    | 0%               | USD         |
| Novita            | $0.09    | $0.09     | 0%               | USD         |
| Together AI       | $0.20    | $0.20     | 0%               | USD         |
| Fireworks         | $0.20    | $0.90     | 0%               | USD         |
| Claude Opus       | $15      | $75       | 0%               | USD         |
| GPT-5.4           | $2.50    | $15       | 0%               | USD         |

Compared with centralized providers, Gonka-based inference remains dramatically cheaper. Within the Gonka ecosystem the pricing landscape has tightened: as of June 2026, other gateways such as OpenGNK (proxy.gonka.gg) and GonkaGate price Qwen3-235B at roughly the same level as JoinGonka, so pick based on payment method, deposit fees, model coverage, and reliability rather than on raw per-token price alone.

JoinGonka prices are observed averages and vary with Gonka Network dynamics. Centralized provider prices are their public list prices for the same Qwen3-235B model, except the last two rows which list flagship closed models for reference.

## Community Projects

Projects built with JoinGonka Gateway by the community.

- Your project here, [open a PR](https://github.com/unameisfine/awesome-joingonka/pulls).

## Resources

- [JoinGonka Gateway](https://gate.joingonka.ai) - Dashboard and API. Sign up, manage keys, top up GNK or USDT, and view usage.
- [JoinGonka live status](https://gate.joingonka.ai/status) - Real-time gateway and model availability.
- [JoinGonka documentation](https://joingonka.ai/knowledge) - Integration guides, tokenomics articles, mining walkthroughs.
- [Gonka Explorer](https://gonka.gg) - On-chain explorer for Gonka Network blocks, transactions, and participants.
- [Gonka whitepaper](https://gonka.ai/whitepaper.pdf) - Protocol design and Proof of Useful Work details.

## Contributing

Contributions are welcome. Read the [contribution guidelines](./CONTRIBUTING.md) first.

Quick summary: fork, add your entry in the relevant section in alphabetical order, follow the format `- [Name](link) - Short description.`, include a rationale in the pull request, and make sure the project actually uses JoinGonka Gateway.

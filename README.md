# Awesome JoinGonka [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> Curated list of tools, apps, and integrations built with [JoinGonka Gateway](https://gate.joingonka.ai), an OpenAI and Anthropic compatible API gateway for the [Gonka Network](https://gonka.ai) decentralized AI inference.

JoinGonka Gateway lets you use Gonka Network, a decentralized Proof of Useful Work network running Qwen3-235B on 4,000+ GPUs, through standard OpenAI and Anthropic APIs. It bills in GNK or USDT at roughly 100x less than centralized providers, with native streaming, native tool calling, and plugins for response healing, privacy sanitization, and PDF parsing. Signup comes with 10M free tokens.

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

Python with the OpenAI SDK:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://gate.joingonka.ai/v1",
    api_key="jgk-..."  # get one at https://gate.joingonka.ai
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
  apiKey: "jgk-..."
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
  -H "Authorization: Bearer jgk-..." \
  -d '{
    "model": "Qwen/Qwen3-235B-A22B-Instruct-2507-FP8",
    "messages": [{"role": "user", "content": "Hello, Gonka"}],
    "stream": true
  }'
```

Complete runnable examples live in [code-examples](./code-examples/).

## Official Packages

- [@joingonka/claude-code](https://www.npmjs.com/package/@joingonka/claude-code) - One-command installer that configures Claude Code to talk to the JoinGonka Anthropic-compatible endpoint.
- [@joingonka/n8n-nodes-joingonka](https://www.npmjs.com/package/@joingonka/n8n-nodes-joingonka) - n8n community node for drag-and-drop Qwen3 calls with streaming support.

## SDKs and Frameworks

The OpenAI-compatible endpoint works with any SDK that supports a custom base URL. Same for the Anthropic-compatible endpoint.

### Python

- [anthropic](https://github.com/anthropics/anthropic-sdk-python) - Official Anthropic SDK, pointed at the JoinGonka domain root.
- [instructor](https://github.com/jxnl/instructor) - Structured outputs via Pydantic on top of the OpenAI SDK.
- [litellm](https://github.com/BerriAI/litellm) - Unified LLM gateway that speaks OpenAI to 100+ providers.
- [OpenAI Python SDK](https://github.com/openai/openai-python) - Official OpenAI Python client library.

### TypeScript and JavaScript

- [ai](https://github.com/vercel/ai) - Vercel AI SDK with OpenAI-compatible provider.
- [anthropic-sdk-typescript](https://github.com/anthropics/anthropic-sdk-typescript) - Official Anthropic SDK with baseURL override.
- [langchainjs](https://github.com/langchain-ai/langchainjs) - LangChain.js with ChatOpenAI and configured basePath.
- [openai-node](https://github.com/openai/openai-node) - Official OpenAI Node.js SDK.

### Other Languages

- [async-openai](https://github.com/64bit/async-openai) - Rust OpenAI client.
- [Betalgo.OpenAI](https://github.com/betalgo/openai) - .NET OpenAI client.
- [go-openai](https://github.com/sashabaranov/go-openai) - Go OpenAI client.
- [openai-java](https://github.com/openai/openai-java) - Official Java OpenAI SDK.

## Coding Agents

Any coding agent that supports a custom base URL can point at JoinGonka.

- [Aider](https://aider.chat) - Terminal pair programmer with Git integration.
- [Claude Code](https://docs.claude.com/en/docs/claude-code) - Official Anthropic CLI, wired up via @joingonka/claude-code.
- [Cline](https://github.com/cline/cline) - Autonomous VS Code agent with OpenAI-compatible provider.
- [Continue](https://continue.dev) - VS Code and JetBrains AI assistant with OpenAI-compatible model config.
- [Cursor](https://cursor.com) - AI-first IDE with custom OpenAI model in settings.
- [OpenCode](https://github.com/opencode-ai/opencode) - Terminal coding agent with OpenAI-compatible provider.
- [Roo Code](https://github.com/RooVetGit/Roo-Cline) - Cline fork for VS Code with OpenAI-compatible provider.

## Chat UIs

Self-hosted chat interfaces that work with JoinGonka.

- [AnythingLLM](https://anythingllm.com) - Desktop and server chat with built-in RAG and OpenAI-compatible provider.
- [LibreChat](https://librechat.ai) - Multi-model chat UI with custom OpenAI endpoint configuration.
- [Open WebUI](https://github.com/open-webui/open-webui) - Self-hosted chat clone, point OPENAI_API_BASE_URL at JoinGonka.

## Automation and Low-code

- [LangChain](https://github.com/langchain-ai/langchain) - Python chain and agent framework with ChatOpenAI and base URL override.
- [LlamaIndex](https://github.com/run-llama/llama_index) - RAG framework with OpenAILike LLM class.
- [Make](https://make.com) - Scenario builder with HTTP module and Bearer auth.
- [n8n](https://n8n.io) - Workflow automation via community node or HTTP Request node.
- [Zapier](https://zapier.com) - Automation platform with OpenAI app and custom endpoint.

## Pricing Comparison

Qwen3-235B and equivalent flagship inference pricing, April 2026.

| Provider          | Input/1M | Output/1M | Deposit fee      | Payment     |
| ----------------- | -------- | --------- | ---------------- | ----------- |
| JoinGonka Gateway | $0.0005  | $0.0005   | 0% GNK, 5% USDT  | GNK, USDT   |
| GonkaGate         | $0.0007  | $0.0007   | 5%               | USD prepaid |
| proxy.gonka.gg    | $0.0012  | $0.0012   | 0%               | USD         |
| Mingles           | $0.0026  | $0.0026   | 0%               | GNK wallet  |
| DeepInfra         | $0.071   | $0.071    | 0%               | USD         |
| Novita            | $0.09    | $0.09     | 0%               | USD         |
| Together AI       | $0.20    | $0.20     | 0%               | USD         |
| Fireworks         | $0.20    | $0.90     | 0%               | USD         |
| Claude Opus       | $15      | $75       | 0%               | USD         |
| GPT-5.4           | $2.50    | $15       | 0%               | USD         |

Prices are JoinGonka-observed averages and vary with Gonka Network dynamics. Centralized provider prices are their public list prices for the same Qwen3-235B model, except the last two rows which list flagship closed models for reference.

## Community Projects

Projects built with JoinGonka Gateway by the community.

- Your project here, [open a PR](https://github.com/unameisfine/awesome-joingonka/pulls).

## Resources

- [JoinGonka documentation](https://joingonka.ai/knowledge) - Integration guides, tokenomics articles, mining walkthroughs.
- [Gonka Explorer](https://gonka.gg) - On-chain explorer for Gonka Network blocks, transactions, and participants.
- [Gonka whitepaper](https://gonka.ai/whitepaper.pdf) - Protocol design and Proof of Useful Work details.

## Contributing

Contributions are welcome. Read the [contribution guidelines](./CONTRIBUTING.md) first.

Quick summary: fork, add your entry in the relevant section in alphabetical order, follow the format `- [Name](link) - Short description.`, include a rationale in the pull request, and make sure the project actually uses JoinGonka Gateway.

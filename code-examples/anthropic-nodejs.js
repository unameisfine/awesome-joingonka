/**
 * JoinGonka Gateway: Anthropic-compatible chat completion in Node.js.
 *
 * Prerequisites:
 *   npm install @anthropic-ai/sdk
 *   export JOINGONKA_API_KEY="jgk-..."   # get one at https://gate.joingonka.ai
 *
 * Run:
 *   node anthropic-nodejs.js
 *
 * JoinGonka exposes an Anthropic-compatible /v1/messages endpoint at the
 * domain root, so the official @anthropic-ai/sdk works with a baseURL override.
 * This is what @joingonka/claude-code wires up for Claude Code users.
 */

import Anthropic from "@anthropic-ai/sdk";

// Note: baseURL is the domain root, not the /v1 path. The SDK appends /v1/messages itself.
const client = new Anthropic({
  baseURL: "https://gate.joingonka.ai",
  apiKey: process.env.JOINGONKA_API_KEY,
});

// Model id is the canonical Gonka Network id.
const MODEL = "Qwen/Qwen3-235B-A22B-Instruct-2507-FP8";

async function chatOnce() {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 200,
    system: "You are a concise assistant.",
    messages: [
      { role: "user", content: "In one sentence, what is Gonka Network?" },
    ],
  });

  for (const block of message.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }
}

async function chatStream() {
  const stream = await client.messages.stream({
    model: MODEL,
    max_tokens: 50,
    messages: [{ role: "user", content: "Count from one to five." }],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      process.stdout.write(event.delta.text);
    }
  }
  process.stdout.write("\n");
}

async function main() {
  console.log("--- Non-streaming ---");
  await chatOnce();
  console.log("\n--- Streaming ---");
  await chatStream();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

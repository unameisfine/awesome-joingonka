#!/usr/bin/env bash
#
# JoinGonka Gateway: streaming chat completion over curl.
#
# Prerequisites:
#   export JOINGONKA_API_KEY="jgk-..."   # get one at https://gate.joingonka.ai
#
# Run:
#   bash streaming-curl.sh
#
# Uses the OpenAI-compatible /v1/chat/completions endpoint with stream=true,
# which returns Server-Sent Events terminated by a `data: [DONE]` line.

set -euo pipefail

: "${JOINGONKA_API_KEY:?JOINGONKA_API_KEY is not set}"

GATEWAY_URL="${GATEWAY_URL:-https://gate.joingonka.ai/v1/chat/completions}"
MODEL="${MODEL:-Qwen/Qwen3-235B-A22B-Instruct-2507-FP8}"

# --no-buffer keeps curl from buffering the SSE stream so deltas print live.
curl --no-buffer --silent --show-error \
  "$GATEWAY_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${JOINGONKA_API_KEY}" \
  -d @- <<JSON
{
  "model": "${MODEL}",
  "stream": true,
  "max_tokens": 100,
  "messages": [
    { "role": "system", "content": "You are a concise assistant." },
    { "role": "user", "content": "List three benefits of decentralized AI inference." }
  ]
}
JSON

"""
JoinGonka Gateway: OpenAI-compatible chat completion in Python.

Prerequisites:
    pip install openai
    export JOINGONKA_API_KEY="jg-..."   # get one at https://gate.joingonka.ai

Run:
    python openai-python.py
"""

import os

from openai import OpenAI

# JoinGonka Gateway speaks the OpenAI wire protocol, so any OpenAI SDK works
# as long as you override base_url and use a JoinGonka API key.
client = OpenAI(
    base_url="https://gate.joingonka.ai/v1",
    api_key=os.environ["JOINGONKA_API_KEY"],
)

# Model id is the canonical Gonka Network id. JoinGonka proxies it untouched
# so that routing, billing and auditing stay consistent with the upstream network.
MODEL = "Qwen/Qwen3-235B-A22B-Instruct-2507-FP8"


def chat_once() -> None:
    """Single-shot chat completion (non-streaming)."""
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are a concise assistant."},
            {"role": "user", "content": "In one sentence, what is Gonka Network?"},
        ],
        max_tokens=200,
        temperature=0.3,
    )
    print(response.choices[0].message.content)


def chat_stream() -> None:
    """Streaming chat completion."""
    stream = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": "Count from one to five."}],
        stream=True,
        max_tokens=50,
    )
    for chunk in stream:
        delta = chunk.choices[0].delta.content or ""
        print(delta, end="", flush=True)
    print()


if __name__ == "__main__":
    print("--- Non-streaming ---")
    chat_once()
    print("\n--- Streaming ---")
    chat_stream()

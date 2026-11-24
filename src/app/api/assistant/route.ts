import { NextRequest, NextResponse } from "next/server";

const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning";

const MAX_MESSAGES = 20;
const MAX_TEXT_LENGTH = 2000;
const MAX_AUDIO_BASE64_LENGTH = 4_000_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 15;

const SYSTEM_PROMPT = `You are Clara, the friendly virtual assistant for SDA Migration WorkBench.
SDA helps companies migrate SAP PI/PO integrations to modern platforms such as Dell Boomi, Informatica and MuleSoft, and offers a Quebec Tax Calculator for R&D tax credits.
Useful pages: /demo to book a demo, /pricing for plans, /company/contact to reach the team, /learn/documentation for docs.
Keep answers short (2-4 sentences), warm and conversational, because they may be read aloud. Use plain text without markdown.
If the user sends audio, listen to it and reply to what they said.
Reply in the same language the user uses (English or French).
If you do not know something, say so and suggest contacting the team. Never invent prices, clients or guarantees.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function parseMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length > MAX_MESSAGES) return null;
  const messages: ChatMessage[] = [];
  for (const item of value) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    if (content.trim().length === 0 || content.length > MAX_TEXT_LENGTH) return null;
    messages.push({ role, content });
  }
  return messages;
}

function stripReasoning(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Assistant is not configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests, please wait a moment" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const history = parseMessages(body.messages ?? []);
  if (!history) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }

  const audio = body.audio;
  if (audio !== undefined) {
    if (typeof audio !== "string" || audio.length > MAX_AUDIO_BASE64_LENGTH || !/^[A-Za-z0-9+/=]+$/.test(audio)) {
      return NextResponse.json({ error: "Invalid audio" }, { status: 400 });
    }
  } else if (history.length === 0 || history[history.length - 1].role !== "user") {
    return NextResponse.json({ error: "A user message or audio is required" }, { status: 400 });
  }

  const messages: unknown[] = [{ role: "system", content: SYSTEM_PROMPT }, ...history];
  if (typeof audio === "string") {
    messages.push({
      role: "user",
      content: [
        { type: "input_audio", input_audio: { data: audio, format: "wav" } },
        { type: "text", text: "Reply to what I just said." },
      ],
    });
  }

  try {
    const response = await fetch(NVIDIA_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.6,
        top_p: 0.95,
        stream: false,
        chat_template_kwargs: { enable_thinking: false },
      }),
    });

    if (!response.ok) {
      console.error("NVIDIA API error:", response.status, await response.text().catch(() => ""));
      return NextResponse.json({ error: "The assistant is unavailable right now" }, { status: 502 });
    }

    const data = await response.json();
    const content: unknown = data?.choices?.[0]?.message?.content;
    const reply = typeof content === "string" ? stripReasoning(content) : "";
    if (!reply) {
      return NextResponse.json({ error: "Empty reply from assistant" }, { status: 502 });
    }
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Assistant request failed:", error);
    return NextResponse.json({ error: "The assistant is unavailable right now" }, { status: 502 });
  }
}

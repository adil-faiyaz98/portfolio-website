"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Mic, Send, Square, Volume2, VolumeX, X } from "lucide-react";
import { blobToWavBase64 } from "@/lib/wav";

type Message = { role: "user" | "assistant"; content: string };

const MAX_RECORDING_MS = 30_000;
const VOICE_PLACEHOLDER = "🎤 Voice message";

export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi, I'm Clara. Ask me anything about SDA, by typing or with your voice." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [speak, setSpeak] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const say = (text: string) => {
    if (!speak || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = /[àâçéèêëîïôûùüÿœ]/i.test(text) ? "fr-CA" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const ask = async (history: Message[], audio?: string) => {
    setLoading(true);
    setError(null);
    try {
      const payload = history
        .slice(1)
        .filter((m) => m.content !== VOICE_PLACEHOLDER)
        .slice(-20);
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload, audio }),
      });
      const data = await res.json();
      if (!res.ok || typeof data.reply !== "string") throw new Error(data.error || "Something went wrong");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      say(data.reply);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim().slice(0, 2000);
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    void ask(next);
  };

  const stopRecording = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    recorderRef.current?.stop();
  };

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (ev) => ev.data.size > 0 && chunks.push(ev.data);
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setRecording(false);
        if (chunks.length === 0) return;
        try {
          const wav = await blobToWavBase64(new Blob(chunks, { type: recorder.mimeType }));
          const next = [...messages, { role: "user" as const, content: VOICE_PLACEHOLDER }];
          setMessages(next);
          void ask(next, wav);
        } catch {
          setError("Could not process the recording");
        }
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      timeoutRef.current = setTimeout(stopRecording, MAX_RECORDING_MS);
    } catch {
      setError("Microphone access was denied");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[30rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="font-serif text-lg text-text-primary">Clara</p>
              <p className="text-caption-sm text-text-muted">Virtual assistant</p>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => { setSpeak(!speak); window.speechSynthesis?.cancel(); }} aria-label={speak ? "Mute voice replies" : "Enable voice replies"} className="rounded-md p-2 text-text-secondary hover:bg-surface-elevated">
                {speak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-md p-2 text-text-secondary hover:bg-surface-elevated">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-caption ${m.role === "user" ? "ml-auto bg-accent-primary text-surface" : "bg-surface-elevated text-text-primary"}`}>
                {m.content}
              </div>
            ))}
            {loading && <Loader2 className="h-4 w-4 animate-spin text-text-muted" aria-label="Clara is thinking" />}
            {error && <p className="text-caption text-red-700">{error}</p>}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <button type="button" onClick={recording ? stopRecording : startRecording} disabled={loading} aria-label={recording ? "Stop recording" : "Speak to Clara"} className={`rounded-lg p-2 ${recording ? "bg-red-700 text-surface" : "text-accent-primary hover:bg-surface-elevated"} disabled:opacity-50`}>
              {recording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={2000} placeholder={recording ? "Listening…" : "Type a message"} disabled={recording} aria-label="Message" className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-caption text-text-primary outline-none focus:border-accent-primary" />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send" className="rounded-lg bg-accent-primary p-2 text-surface hover:bg-accent-primary-hover disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close assistant" : "Open assistant"} className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary text-surface shadow-lg hover:bg-accent-primary-hover">
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}

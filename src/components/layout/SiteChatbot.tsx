"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
  suggestions?: string[];
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I am the Nourished assistant. Ask me about products, pricing, downloads, consultations, or contact details.",
  suggestions: [
    "What plans do you offer?",
    "How do downloads work?",
    "How can I contact Ruchika?",
  ],
};

export default function SiteChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  async function askAssistant(message: string) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) {
      return;
    }

    setMessages((current) => [
      ...current,
      { role: "user", content: trimmedMessage },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const data = (await response.json()) as {
        reply?: string;
        suggestions?: string[];
        error?: string;
      };

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            data.error ||
            "I could not answer that right now. Please try another question.",
          suggestions: data.suggestions,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I could not answer that right now. Please try another question.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askAssistant(input);
  }

  const latestSuggestions = [...messages]
    .reverse()
    .find((message) => message.role === "assistant" && message.suggestions)
    ?.suggestions;

  return (
    <div className="fixed bottom-24 right-5 z-[75]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] border border-sage-200/80 bg-white shadow-[0_24px_60px_rgba(37,48,20,0.18)]"
          >
            <div className="flex items-center justify-between bg-linear-to-r from-sage-700 to-sage-600 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-xl">Nourished AI</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/75">
                    Instant website help
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/18"
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[24rem] space-y-3 overflow-y-auto bg-[#fffdf8] px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    message.role === "assistant"
                      ? "bg-sage-50 text-charcoal"
                      : "ml-auto bg-warm-100 text-sage-900"
                  )}
                >
                  {message.content}
                </div>
              ))}

              {isLoading ? (
                <div className="max-w-[88%] rounded-2xl bg-sage-50 px-4 py-3 text-sm text-olive-gray">
                  Thinking...
                </div>
              ) : null}
            </div>

            {latestSuggestions?.length ? (
              <div className="border-t border-sage-100 bg-white px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {latestSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void askAssistant(suggestion)}
                      className="rounded-full border border-sage-200 bg-sage-50 px-3 py-2 text-xs font-medium text-sage-700 transition-colors hover:bg-sage-100"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-sage-100 bg-white px-4 py-4"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question..."
                className="h-11 flex-1 rounded-full border border-sage-200 bg-cream px-4 text-sm text-charcoal outline-none transition-colors placeholder:text-olive-gray/70 focus:border-sage-400"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-warm-400 text-sage-900 transition-colors hover:bg-warm-300 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group relative inline-flex items-center gap-3 rounded-full bg-sage-700 px-4 py-3 text-white shadow-[0_18px_45px_rgba(71,96,34,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-sage-800"
        aria-label="Open chatbot"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-sage-700/35 blur-xl" />
        <MessageCircle className="h-5 w-5 shrink-0" />
        <span className="hidden text-sm font-semibold sm:inline">
          Ask Nourished AI
        </span>
      </button>
    </div>
  );
}

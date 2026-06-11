import { createFileRoute, Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Loader2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title:  " مساعد فقهي" },
      {
        name: "description",
        content: "مساعد ذكي يجيب على أسئلتك الفقهية وفقاً للمذهب الشافعي المعتمد.",
      },
      { property: "og:title", content: "المساعد الفقهي الشافعي" },
      {
        property: "og:description",
        content: "اسأل واحصل على إجابات فقهية وفق المذهب الشافعي.",
      },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "https://i.ibb.co/KcqW6dRM/image.png",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (err) => toast.error(err.message || "حدث خطأ"),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading, messages.length]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <div className="relative flex min-h-screen flex-col" dir="rtl">
      <Toaster position="top-center" richColors />

      {/* decorative ornaments */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 select-none font-display text-primary/5"
      >
        <span className="absolute right-[2%] top-[4%] text-[180px] leading-none">۞</span>
        <span className="absolute bottom-[4%] left-[2%] text-[180px] leading-none">۞</span>
      </div>

      {/* الـ Header الأصلي مع زر الرجوع والصورة مضافين بشكل مطلق */}
      <header className="relative rounded-b-[32px] bg-gradient-hero px-6 py-10 text-white shadow-[0_20px_50px_-12px_rgba(27,200,32,0.28)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(240,215,140,0.25), transparent 60%), radial-gradient(circle at 20% 80%, rgba(16,163,127,0.4), transparent 50%)",
          }}
        />
        
        {/* زر الرجوع للبيت مثبت في أقصى اليمين */}
        <div className="absolute right-6 top-1/2 z-30 -translate-y-1/2">
  <a
    href="/ahlah/index.html"
    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur transition hover:bg-white/20 sm:h-12 sm:w-12"
    title="الرئيسية"
  >
    <Home className="h-5 w-5 text-white sm:h-6 sm:w-6" />
  </a>
</div>

        {/* كود عرض العنوان والقياسات الأصلية لك دون أي تعديل */}
        <div className="relative z-20 mx-auto flex max-w-3xl items-center justify-center gap-10 text-center">
          <div>
            <h1 className="font-display text-10xl font-bold tracking-wide text-gradient-gold sm:text-5xl w-full px-1 py-6">
  مساعد فقهي
            </h1>
            <p className="mt-1 text-xs tracking-[0.3em] text-white/80 sm:text-sm">
              إجابات وفق المذهب الشافعي المعتمد
            </p>
          </div>
        </div>

        {/* صورة أهلّه مثبتة في أقصى اليسار مع ستايل الـ Hover الأنيق */}
        <div className="absolute left-6 top-1/2 z-30 -translate-y-1/2 flex items-center justify-center">
  <img 
    id="home-logo" 
    src="https://i.ibb.co/B59zjpGn/2.png" 
    alt="صورة أهلّه"
    onClick={() => {
      window.location.href = "/ahlah/index.html";
    }}
    className="h-14 w-auto cursor-pointer object-contain rounded-xl border-2 border-[rgba(240,215,140,0.4)] shadow-gold transition-transform duration-300 hover:-rotate-5 hover:scale-105 sm:h-20"
  />
</div>
      </header>

      <main
        ref={scrollRef}
        className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-4 py-8"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h2 className="mb-2 font-display text-3xl font-bold text-primary">
              بسم الله الرحمن الرحيم
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              اسأل أي سؤال فقهي وسأجيبك استناداً إلى المذهب الشافعي ومراجعه المعتمدة.
            </p>
            <div className="mt-8 grid w-full max-w-md gap-3">
              {[
                "ما حكم قراءة الفاتحة خلف الإمام؟",
                "كيف تُحسب زكاة المال عند الشافعية؟",
                "ما نواقض الوضوء في المذهب الشافعي؟",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="rounded-2xl border border-border bg-card px-5 py-3 text-right text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-gold"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-gradient-hero text-white"
                        : "border border-border bg-card text-card-foreground"
                    }`}
                  >
                    <div className={`prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 ${isUser ? "prose-invert" : ""}`}>
                      <ReactMarkdown>{text || "..."}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex justify-end">
                <div className="rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card/70 backdrop-blur">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-end gap-2 px-4 py-3"
        >
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="اكتب سؤالك الفقهي هنا..."
            rows={1}
            className="min-h-[44px] resize-none"
            disabled={isLoading}
            autoFocus
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </footer>
    </div>
  );
}
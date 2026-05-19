import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Sparkles, Download, Save, Wand2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resume Templates — Build a Modern Resume in Minutes" },
      { name: "description", content: "Answer a few guided questions and export a stylish, professional resume as PDF or DOCX. Auto-saved to your browser." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white/70 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <FileText className="h-5 w-5 text-primary" />
            Resume Templates
          </div>
          <Link to="/builder" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
            Start <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/40 text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Simple. Modern. Yours.
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-balance">
            Resume Templates that <span className="italic text-primary">just work</span>.
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
            Fill a short guided form. Pick your style and color at the end. Export a clean PDF or DOCX.
          </p>
          <div className="mt-10">
            <Link to="/builder" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90">
              Build my resume <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6">
        {[
          { icon: Wand2, title: "Guided form", desc: "Answer step-by-step. No blank pages." },
          { icon: Save, title: "Auto-saved", desc: "Your work stays in your browser." },
          { icon: Download, title: "PDF & DOCX", desc: "Export in either format anytime." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-white p-6">
            <f.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Resume Templates.
      </footer>
    </div>
  );
}

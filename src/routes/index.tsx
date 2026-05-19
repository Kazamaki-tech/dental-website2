import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Sparkles, Briefcase, Code, Palette, Stethoscope, Download, Save, Wand2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resumely — Stylish, Professional Resumes in Minutes" },
      { name: "description", content: "Pick a profession, fill a guided form, and export a beautiful PDF or DOCX. Six template styles. Auto-saved to your browser." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white/70 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <FileText className="h-5 w-5 text-primary" />
            Resumely
          </div>
          <Link to="/builder" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
            Start building <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/40 text-xs font-medium mb-6 animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" /> Built for tech, business, creative & healthcare
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-balance animate-fade-up">
            Resumes that <span className="italic text-primary">actually</span> get read.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-up">
            Answer a few questions, pick a style, and walk away with a recruiter-ready PDF or DOCX. Your work auto-saves to your browser as you type.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center animate-fade-up">
            <Link to="/builder" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90">
              Build my resume <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#templates" className="inline-flex items-center gap-2 border border-border bg-white px-6 py-3 rounded-md font-medium hover:bg-secondary">
              See templates
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: Wand2, title: "Guided step-by-step", desc: "We ask, you answer. No blank pages, no formatting headaches." },
          { icon: Save, title: "Auto-saved locally", desc: "Every keystroke is saved to your browser. Come back anytime." },
          { icon: Download, title: "PDF & DOCX export", desc: "Download a pixel-perfect PDF or an editable Word document." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-white p-6">
            <f.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      <section id="templates" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold">Six styles. Endless possibilities.</h2>
          <p className="mt-2 text-muted-foreground">Switch templates anytime — your content carries over.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Classic", desc: "Timeless serif with banded headers" },
            { name: "Modern", desc: "Two-column sidebar with color" },
            { name: "Executive", desc: "Bold serif for senior roles" },
            { name: "Creative", desc: "Asymmetric, color-blocked hero" },
            { name: "Minimal", desc: "Quiet, lots of whitespace" },
            { name: "Tech", desc: "Monospace, code-comment vibe" },
          ].map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-white p-6 hover:shadow-lg transition">
              <div className="aspect-[3/4] rounded-md bg-gradient-to-br from-secondary to-accent/30 mb-4 flex items-center justify-center">
                <FileText className="h-12 w-12 text-primary/50" />
              </div>
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-4xl font-bold text-center mb-12">Tuned for your field</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Code, name: "Tech & Engineering" },
            { icon: Briefcase, name: "Business & Finance" },
            { icon: Palette, name: "Creative & Design" },
            { icon: Stethoscope, name: "Healthcare & Science" },
          ].map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-white p-6 text-center">
              <p.icon className="h-7 w-7 mx-auto text-primary" />
              <div className="mt-3 font-medium">{p.name}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/builder" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90">
            Get started — it's free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Resumely. Crafted with care.
      </footer>
    </div>
  );
}

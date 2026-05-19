import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Wand2, Download, FileType2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resume Templates — Build a Modern Resume in Minutes" },
      { name: "description", content: "Answer a few guided questions and export a stylish, professional resume as PDF or DOCX." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
          <div className="flex items-center gap-2 font-serif text-lg tracking-tight">
            <FileText className="h-4 w-4 text-primary" />
            Resume Templates
          </div>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight text-balance">
          A calmer way to write your <span className="italic text-primary">resume</span>.
        </h1>
        <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Answer a short, guided set of questions. Choose a style and color at the end.
          Export a clean PDF or DOCX. No accounts, no clutter.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Build my resume <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-sm text-muted-foreground">Takes about 5 minutes</span>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-28">
        <div className="grid sm:grid-cols-3 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
          {[
            { icon: Wand2, title: "Guided", desc: "Step-by-step questions, no blank pages." },
            { icon: FileType2, title: "Flexible", desc: "Multiple template styles and accent colors." },
            { icon: Download, title: "Exportable", desc: "Download a clean PDF or editable DOCX." },
          ].map((f) => (
            <div key={f.title} className="bg-card p-7">
              <f.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-5 font-serif text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Resume Templates
      </footer>
    </div>
  );
}

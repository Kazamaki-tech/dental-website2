import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, Download, FileText, Plus, Trash2,
  Sparkles, Code, Briefcase, Palette, Stethoscope, Layers, RotateCcw, FileType2,
} from "lucide-react";
import { useResume } from "@/lib/use-resume";
import { sampleResume, type Profession, type TemplateId, type Experience, type Education, type Project } from "@/lib/resume-types";
import { ResumeTemplate, templateMeta } from "@/components/resume-templates";
import { exportPdf, exportDocx } from "@/lib/resume-export";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Build your resume — Resume Templates" },
      { name: "description", content: "Answer guided questions, pick a template, and export your resume as PDF or DOCX." },
    ],
  }),
  component: Builder,
});

const PROFESSIONS: { id: Profession; label: string; icon: typeof Code; hint: string }[] = [
  { id: "tech", label: "Tech & Engineering", icon: Code, hint: "Emphasize stack, impact, projects" },
  { id: "business", label: "Business & Finance", icon: Briefcase, hint: "Lead with metrics and outcomes" },
  { id: "creative", label: "Creative & Design", icon: Palette, hint: "Show range and visual taste" },
  { id: "healthcare", label: "Healthcare & Science", icon: Stethoscope, hint: "Highlight credentials & care" },
  { id: "general", label: "General / Other", icon: Layers, hint: "Balanced, all-purpose layout" },
];

const ACCENTS = ["#2d4a6e", "#0f766e", "#9333ea", "#dc2626", "#ea580c", "#1f2937", "#0ea5e9"];

const uid = () => Math.random().toString(36).slice(2, 9);

const STEPS = ["Profession", "Personal", "Summary & Skills", "Experience", "Education", "Extras", "Template", "Export"] as const;

function Builder() {
  const { data, setData, update, reset, loaded } = useResume();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string>("");
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState<"" | "pdf" | "docx">("");

  if (!loaded) return null;

  const validateStep = (s: number): string => {
    if (s === 0 && !data.profession) return "Please pick a profession to continue.";
    if (s === 1) {
      if (!data.fullName.trim()) return "Full name is required.";
      if (!data.jobTitle.trim()) return "Job title is required.";
      if (!data.email.trim()) return "Email is required.";
      if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Please enter a valid email.";
      if (!data.phone.trim()) return "Phone is required.";
      if (!data.location.trim()) return "Location is required.";
    }
    if (s === 2) {
      if (!data.summary.trim() || data.summary.trim().length < 20) return "Write a short summary (at least 20 characters).";
      if (data.skills.length < 3) return "Add at least 3 skills.";
    }
    if (s === 3) {
      if (data.experience.length === 0) return "Add at least one experience entry.";
      const bad = data.experience.find((e) => !e.title.trim() || !e.company.trim() || !e.startDate.trim() || !e.endDate.trim() || e.bullets.filter((b) => b.trim()).length === 0);
      if (bad) return "Each experience needs title, company, dates and at least one bullet.";
    }
    if (s === 4) {
      if (data.education.length === 0) return "Add at least one education entry.";
      const bad = data.education.find((e) => !e.degree.trim() || !e.school.trim());
      if (bad) return "Each education entry needs a degree and school.";
    }
    return "";
  };

  const next = () => {
    const err = validateStep(step);
    if (err) { setError(err); return; }
    setError("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prev = () => { setError(""); setStep((s) => Math.max(s - 1, 0)); };

  const gotoStep = (i: number) => {
    if (i <= step) { setError(""); setStep(i); return; }
    // forward jump: validate each step up to target
    for (let s = step; s < i; s++) {
      const err = validateStep(s);
      if (err) { setError(err); setStep(s); return; }
    }
    setError("");
    setStep(i);
  };

  const addExp = () => update("experience", [...data.experience, { id: uid(), title: "", company: "", location: "", startDate: "", endDate: "", bullets: [""] } as Experience]);
  const addEdu = () => update("education", [...data.education, { id: uid(), degree: "", school: "", location: "", date: "", notes: "" } as Education]);
  const addProject = () => update("projects", [...data.projects, { id: uid(), name: "", description: "", link: "" } as Project]);

  const handlePdf = async () => {
    if (!previewRef.current) return;
    setExporting("pdf");
    try { await exportPdf(previewRef.current, `${data.fullName || "resume"}.pdf`); }
    finally { setExporting(""); }
  };
  const handleDocx = async () => {
    setExporting("docx");
    try { await exportDocx(data, `${data.fullName || "resume"}.docx`); }
    finally { setExporting(""); }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-white sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <FileText className="h-5 w-5 text-primary" />
            Resume Templates
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-green-600" /> Auto-saved
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setData(sampleResume())}>
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Sample
            </Button>
            <Button size="sm" variant="outline" onClick={() => { if (confirm("Clear all your resume data?")) reset(); }}>
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[480px_1fr] gap-6 p-4 sm:p-6">
        {/* LEFT — Wizard */}
        <div className="bg-white rounded-xl border border-border p-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          {/* Steps */}
          <div className="flex items-center gap-1 mb-6 text-xs">
            {STEPS.map((s, i) => (
              <button key={s} onClick={() => gotoStep(i)} className={`flex-1 h-1.5 rounded-full transition ${i <= step ? "bg-primary" : "bg-muted"}`} title={s} />
            ))}
          </div>
          <div className="text-xs text-muted-foreground mb-1">Step {step + 1} of {STEPS.length}</div>
          <h2 className="font-display text-2xl font-bold mb-4">{STEPS[step]}</h2>

          {step === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Pick your field so we can tailor wording and template suggestions.</p>
              {PROFESSIONS.map((p) => (
                <button key={p.id} onClick={() => update("profession", p.id)}
                  className={`w-full flex items-start gap-3 text-left p-3 rounded-lg border transition ${data.profession === p.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"}`}>
                  <p.icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">{p.label}</div>
                    <div className="text-xs text-muted-foreground">{p.hint}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <Field label="Full name"><Input value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Emma Larsen" /></Field>
              <Field label="Job title"><Input value={data.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} placeholder="Senior Product Designer" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Email"><Input value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@mail.com" /></Field>
                <Field label="Phone"><Input value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="555.555.5555" /></Field>
              </div>
              <Field label="Location"><Input value={data.location} onChange={(e) => update("location", e.target.value)} placeholder="San Diego, CA" /></Field>
              <Field label="LinkedIn"><Input value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="linkedin.com/in/you" /></Field>
              <Field label="Website / Portfolio"><Input value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="yoursite.com" /></Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <Field label="Professional summary">
                <Textarea rows={5} value={data.summary} onChange={(e) => update("summary", e.target.value)}
                  placeholder="2–3 sentences about your strengths, expertise and the value you bring." />
              </Field>
              <Field label="Skills (comma-separated)">
                <Textarea rows={3} value={data.skills.join(", ")}
                  onChange={(e) => update("skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                  placeholder="Figma, React, Leadership, Strategy" />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {data.experience.map((e, idx) => (
                <div key={e.id} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-semibold text-muted-foreground">EXPERIENCE #{idx + 1}</div>
                    <button onClick={() => update("experience", data.experience.filter((x) => x.id !== e.id))} className="text-destructive hover:opacity-70"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <Input placeholder="Job title" value={e.title} onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, title: ev.target.value } : x))} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Company" value={e.company} onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, company: ev.target.value } : x))} />
                    <Input placeholder="Location" value={e.location} onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, location: ev.target.value } : x))} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Start (e.g. 2022)" value={e.startDate} onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, startDate: ev.target.value } : x))} />
                    <Input placeholder="End (e.g. Present)" value={e.endDate} onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, endDate: ev.target.value } : x))} />
                  </div>
                  <Textarea rows={4} placeholder="Bullets — one per line"
                    value={e.bullets.join("\n")}
                    onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, bullets: ev.target.value.split("\n") } : x))} />
                </div>
              ))}
              <Button variant="outline" onClick={addExp} className="w-full"><Plus className="h-4 w-4 mr-1" /> Add experience</Button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {data.education.map((ed, idx) => (
                <div key={ed.id} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-semibold text-muted-foreground">EDUCATION #{idx + 1}</div>
                    <button onClick={() => update("education", data.education.filter((x) => x.id !== ed.id))} className="text-destructive hover:opacity-70"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <Input placeholder="Degree" value={ed.degree} onChange={(ev) => update("education", data.education.map((x) => x.id === ed.id ? { ...x, degree: ev.target.value } : x))} />
                  <Input placeholder="School" value={ed.school} onChange={(ev) => update("education", data.education.map((x) => x.id === ed.id ? { ...x, school: ev.target.value } : x))} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Location" value={ed.location} onChange={(ev) => update("education", data.education.map((x) => x.id === ed.id ? { ...x, location: ev.target.value } : x))} />
                    <Input placeholder="Date (e.g. 2019)" value={ed.date} onChange={(ev) => update("education", data.education.map((x) => x.id === ed.id ? { ...x, date: ev.target.value } : x))} />
                  </div>
                  <Input placeholder="Notes (honors, GPA…)" value={ed.notes} onChange={(ev) => update("education", data.education.map((x) => x.id === ed.id ? { ...x, notes: ev.target.value } : x))} />
                </div>
              ))}
              <Button variant="outline" onClick={addEdu} className="w-full"><Plus className="h-4 w-4 mr-1" /> Add education</Button>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <Field label="Certifications (one per line)">
                <Textarea rows={3} value={data.certifications.join("\n")}
                  onChange={(e) => update("certifications", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
              </Field>
              <Field label="Languages (comma-separated)">
                <Input value={data.languages.join(", ")}
                  onChange={(e) => update("languages", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
              </Field>
              <div className="space-y-3">
                <div className="text-sm font-semibold">Projects</div>
                {data.projects.map((p, idx) => (
                  <div key={p.id} className="border border-border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-semibold text-muted-foreground">PROJECT #{idx + 1}</div>
                      <button onClick={() => update("projects", data.projects.filter((x) => x.id !== p.id))} className="text-destructive hover:opacity-70"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <Input placeholder="Name" value={p.name} onChange={(e) => update("projects", data.projects.map((x) => x.id === p.id ? { ...x, name: e.target.value } : x))} />
                    <Input placeholder="Link" value={p.link} onChange={(e) => update("projects", data.projects.map((x) => x.id === p.id ? { ...x, link: e.target.value } : x))} />
                    <Textarea rows={2} placeholder="Description" value={p.description} onChange={(e) => update("projects", data.projects.map((x) => x.id === p.id ? { ...x, description: e.target.value } : x))} />
                  </div>
                ))}
                <Button variant="outline" onClick={addProject} className="w-full"><Plus className="h-4 w-4 mr-1" /> Add project</Button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Template style</div>
                <div className="grid grid-cols-2 gap-2">
                  {templateMeta.map((t) => (
                    <button key={t.id} onClick={() => update("template", t.id as TemplateId)}
                      className={`text-left p-3 rounded-lg border transition ${data.template === t.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"}`}>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Accent color</div>
                <div className="flex flex-wrap gap-2">
                  {ACCENTS.map((c) => (
                    <button key={c} onClick={() => update("accentColor", c)}
                      className={`h-9 w-9 rounded-full border-2 ${data.accentColor === c ? "border-foreground" : "border-transparent"}`}
                      style={{ background: c }} aria-label={c} />
                  ))}
                  <input type="color" value={data.accentColor} onChange={(e) => update("accentColor", e.target.value)}
                    className="h-9 w-9 rounded-full overflow-hidden cursor-pointer border border-border" />
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Download your resume in either format. PDF preserves the design exactly; DOCX is editable in Word.</p>
              <Button onClick={handlePdf} disabled={!!exporting} className="w-full">
                <Download className="h-4 w-4 mr-2" /> {exporting === "pdf" ? "Generating PDF…" : "Download PDF"}
              </Button>
              <Button onClick={handleDocx} disabled={!!exporting} variant="outline" className="w-full">
                <FileType2 className="h-4 w-4 mr-2" /> {exporting === "docx" ? "Generating DOCX…" : "Download DOCX"}
              </Button>
              <div className="text-xs text-muted-foreground text-center pt-2">
                Your data stays in this browser. Clearing site data will delete it.
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6 pt-4 border-t border-border">
            <Button variant="outline" onClick={prev} disabled={step === 0}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
            {step < STEPS.length - 1
              ? <Button onClick={next}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
              : <Button onClick={handlePdf} disabled={!!exporting}><Download className="h-4 w-4 mr-1" /> Export PDF</Button>}
          </div>
        </div>

        {/* RIGHT — Preview */}
        <div className="overflow-x-auto">
          <div className="text-xs text-muted-foreground mb-2 text-center">Live preview · {templateMeta.find(t => t.id === data.template)?.name}</div>
          <div className="flex justify-center origin-top" style={{ transform: "scale(var(--preview-scale,1))" }}>
            <div ref={previewRef}>
              <ResumeTemplate data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

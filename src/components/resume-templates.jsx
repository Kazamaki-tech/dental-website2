// Resume template components (JSX). All inline styles use the accent color from props.

const Hr = ({ color }) => (
  <div style={{ height: 1, background: color, opacity: 0.25, margin: "8px 0" }} />
);

const ContactLine = ({ data, sep = " | " }) => {
  const parts = [data.phone, data.email, data.location, data.linkedin, data.website].filter(Boolean);
  return <div style={{ fontSize: 11, color: "#444", letterSpacing: 0.3 }}>{parts.join(sep)}</div>;
};

/* ---------- CLASSIC (Emma Larsen reference) ---------- */
function Classic({ data }) {
  const accent = data.accentColor;
  const band = `${accent}26`; // soft tint
  const Section = ({ title, children }) => (
    <div style={{ marginTop: 16 }}>
      <div style={{ background: band, textAlign: "center", padding: "5px 0", letterSpacing: 6, fontSize: 11, fontWeight: 600, color: "#1f2a44", textTransform: "uppercase" }}>{title}</div>
      <div style={{ paddingTop: 10 }}>{children}</div>
    </div>
  );
  return (
    <div className="resume-sheet font-serif" style={{ padding: "52px 60px", fontSize: 11.5, lineHeight: 1.5, color: "#1f2a44" }}>
      <h1 style={{ textAlign: "center", fontSize: 30, letterSpacing: 8, fontWeight: 500, margin: 0 }}>
        {(data.fullName || "YOUR NAME").toUpperCase()}
      </h1>
      <Hr color={accent} />
      <div style={{ textAlign: "center" }}><ContactLine data={data} /></div>

      {data.summary && (
        <Section title="Professional Summary">
          <p style={{ margin: 0 }}>{data.summary}</p>
          {data.skills.length > 0 && (
            <div style={{ textAlign: "center", marginTop: 10, fontStyle: "italic" }}>
              {data.skills.join("  ·  ")}
            </div>
          )}
        </Section>
      )}

      {data.experience.length > 0 && (
        <Section title="Experience">
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ letterSpacing: 1 }}>{(e.title || "").toUpperCase()}</strong>
                <span>{e.startDate}{e.endDate ? ` – ${e.endDate}` : ""}</span>
              </div>
              <div style={{ fontStyle: "italic", color: "#555" }}>
                {e.company}{e.location ? `, ${e.location}` : ""}
              </div>
              <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: 3 }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {(data.education.length > 0 || data.certifications.length > 0) && (
        <Section title="Education & Certifications">
          {data.education.map((ed) => (
            <div key={ed.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div>
                <strong>{ed.degree}</strong>{ed.school ? ` / ${ed.school}` : ""}{ed.location ? `, ${ed.location}` : ""}
                {ed.notes && <div style={{ fontStyle: "italic", color: "#555" }}>{ed.notes}</div>}
              </div>
              <div>{ed.date}</div>
            </div>
          ))}
          {data.certifications.map((c, i) => <div key={i}>{c}</div>)}
        </Section>
      )}
    </div>
  );
}

/* ---------- MODERN (two-column sidebar) ---------- */
function Modern({ data }) {
  const accent = data.accentColor;
  return (
    <div className="resume-sheet" style={{ display: "grid", gridTemplateColumns: "260px 1fr", fontSize: 11.5, lineHeight: 1.5 }}>
      <aside style={{ background: accent, color: "white", padding: "48px 28px" }}>
        <h1 style={{ fontSize: 26, margin: 0, fontWeight: 700, lineHeight: 1.1 }}>{data.fullName || "Your Name"}</h1>
        <div style={{ opacity: 0.85, marginTop: 6 }}>{data.jobTitle}</div>
        <h3 style={{ marginTop: 28, textTransform: "uppercase", fontSize: 11, letterSpacing: 2, opacity: 0.85 }}>Contact</h3>
        <div style={{ fontSize: 10.5, lineHeight: 1.7 }}>
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.location && <div>{data.location}</div>}
          {data.linkedin && <div>{data.linkedin}</div>}
          {data.website && <div>{data.website}</div>}
        </div>
        {data.skills.length > 0 && (
          <>
            <h3 style={{ marginTop: 22, textTransform: "uppercase", fontSize: 11, letterSpacing: 2, opacity: 0.85 }}>Skills</h3>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 10.5, lineHeight: 1.7 }}>
              {data.skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </>
        )}
      </aside>
      <main style={{ padding: "48px 40px" }}>
        {data.summary && (
          <section>
            <h2 style={{ color: accent, fontSize: 14, textTransform: "uppercase", letterSpacing: 3, margin: 0, fontWeight: 700 }}>Profile</h2>
            <p style={{ marginTop: 8 }}>{data.summary}</p>
          </section>
        )}
        {data.experience.length > 0 && (
          <section style={{ marginTop: 22 }}>
            <h2 style={{ color: accent, fontSize: 14, textTransform: "uppercase", letterSpacing: 3, margin: 0, fontWeight: 700 }}>Experience</h2>
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{e.title} — <span style={{ fontWeight: 400 }}>{e.company}</span></strong>
                  <span style={{ color: "#666" }}>{e.startDate} – {e.endDate}</span>
                </div>
                <ul style={{ margin: "4px 0 0 18px" }}>
                  {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}
        {data.education.length > 0 && (
          <section style={{ marginTop: 22 }}>
            <h2 style={{ color: accent, fontSize: 14, textTransform: "uppercase", letterSpacing: 3, margin: 0, fontWeight: 700 }}>Education</h2>
            {data.education.map((ed) => (
              <div key={ed.id} style={{ marginTop: 8 }}>
                <strong>{ed.degree}</strong> — {ed.school}
                <div style={{ color: "#666" }}>{ed.date}{ed.notes ? ` · ${ed.notes}` : ""}</div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

/* ---------- EXECUTIVE ---------- */
function Executive({ data }) {
  const accent = data.accentColor;
  return (
    <div className="resume-sheet" style={{ padding: "56px 64px", fontSize: 11.5, lineHeight: 1.55, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <div style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 40, color: accent, fontWeight: 700, letterSpacing: -0.5 }}>{data.fullName || "Your Name"}</h1>
        <div style={{ fontSize: 13, color: "#444", marginTop: 4, letterSpacing: 2, textTransform: "uppercase" }}>{data.jobTitle}</div>
        <div style={{ marginTop: 8 }}><ContactLine data={data} /></div>
      </div>
      {data.summary && <p style={{ marginTop: 18 }}>{data.summary}</p>}
      {data.experience.length > 0 && (
        <section style={{ marginTop: 18 }}>
          <h2 style={{ fontSize: 13, color: accent, letterSpacing: 4, textTransform: "uppercase", borderBottom: `1px solid ${accent}`, paddingBottom: 4 }}>Professional Experience</h2>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 13 }}>{e.title}</strong>
                <span style={{ color: "#555" }}>{e.startDate} – {e.endDate}</span>
              </div>
              <div style={{ fontStyle: "italic", color: "#555" }}>{e.company}{e.location ? ` — ${e.location}` : ""}</div>
              <ul style={{ margin: "6px 0 0 18px" }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}
      {data.education.length > 0 && (
        <section style={{ marginTop: 18 }}>
          <h2 style={{ fontSize: 13, color: accent, letterSpacing: 4, textTransform: "uppercase", borderBottom: `1px solid ${accent}`, paddingBottom: 4 }}>Education</h2>
          {data.education.map((ed) => (
            <div key={ed.id} style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <div><strong>{ed.degree}</strong> — {ed.school}{ed.notes ? `, ${ed.notes}` : ""}</div>
              <div>{ed.date}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

/* ---------- MINIMAL ---------- */
function Minimal({ data }) {
  return (
    <div className="resume-sheet" style={{ padding: "72px 80px", fontSize: 11.5, lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: -0.3 }}>{data.fullName || "Your Name"}</h1>
      <div style={{ color: "#666", marginTop: 2 }}>{data.jobTitle}</div>
      <div style={{ marginTop: 6, fontSize: 10.5, color: "#666" }}><ContactLine data={data} sep=" · " /></div>
      {data.summary && <p style={{ marginTop: 28 }}>{data.summary}</p>}
      {data.experience.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#999", textTransform: "uppercase" }}>Experience</div>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>{e.title}</strong>, {e.company}</div>
                <div style={{ color: "#999" }}>{e.startDate} – {e.endDate}</div>
              </div>
              <ul style={{ margin: "4px 0 0 18px", color: "#333" }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}
      {data.education.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#999", textTransform: "uppercase" }}>Education</div>
          {data.education.map((ed) => (
            <div key={ed.id} style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
              <div><strong>{ed.degree}</strong> — {ed.school}{ed.notes ? `, ${ed.notes}` : ""}</div>
              <div style={{ color: "#999" }}>{ed.date}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export const templateMeta = [
  { id: "classic", name: "Classic", desc: "Timeless serif with banded section headers" },
  { id: "modern", name: "Modern", desc: "Two-column with colored sidebar" },
  { id: "executive", name: "Executive", desc: "Bold serif, leadership-ready" },
  { id: "minimal", name: "Minimal", desc: "Generous whitespace, quiet typography" },
];

export function ResumeTemplate({ data }) {
  switch (data.template) {
    case "modern":    return <Modern data={data} />;
    case "executive": return <Executive data={data} />;
    case "minimal":   return <Minimal data={data} />;
    default:          return <Classic data={data} />;
  }
}

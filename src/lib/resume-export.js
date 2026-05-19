import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
} from "docx";

export async function exportPdf(node, filename = "resume.pdf") {
  const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
  const img = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const ratio = canvas.height / canvas.width;
  const imgH = pageW * ratio;
  if (imgH <= pageH) {
    pdf.addImage(img, "PNG", 0, 0, pageW, imgH);
  } else {
    let remaining = canvas.height;
    let offset = 0;
    const pageCanvasH = (canvas.width * pageH) / pageW;
    while (remaining > 0) {
      const slice = document.createElement("canvas");
      slice.width = canvas.width;
      slice.height = Math.min(pageCanvasH, remaining);
      const ctx = slice.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(canvas, 0, -offset);
      pdf.addImage(slice.toDataURL("image/png"), "PNG", 0, 0, pageW, (slice.height * pageW) / canvas.width);
      offset += slice.height;
      remaining -= slice.height;
      if (remaining > 0) pdf.addPage();
    }
  }
  pdf.save(filename);
}

export async function exportDocx(data, filename = "resume.docx") {
  const h = (text) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 24 })],
    });

  const p = (text, opts = {}) =>
    new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text, bold: opts.bold, italics: opts.italic, size: opts.size ?? 22 })],
    });

  const bullet = (text) =>
    new Paragraph({
      bullet: { level: 0 },
      children: [new TextRun({ text, size: 22 })],
    });

  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: data.fullName || "Your Name", bold: true, size: 44 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: data.jobTitle, size: 24, italics: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({
        text: [data.email, data.phone, data.location, data.linkedin, data.website].filter(Boolean).join(" | "),
        size: 20,
      })],
    }),
  ];

  if (data.summary) { children.push(h("Professional Summary"), p(data.summary)); }
  if (data.skills.length) { children.push(h("Skills"), p(data.skills.join(" • "))); }

  if (data.experience.length) {
    children.push(h("Experience"));
    data.experience.forEach((e) => {
      children.push(
        new Paragraph({ children: [
          new TextRun({ text: `${e.title}`, bold: true, size: 24 }),
          new TextRun({ text: `   ${e.startDate} – ${e.endDate}`, size: 20 }),
        ]}),
        p(`${e.company}${e.location ? `, ${e.location}` : ""}`, { italic: true }),
        ...e.bullets.filter(Boolean).map(bullet),
      );
    });
  }

  if (data.projects.length) {
    children.push(h("Projects"));
    data.projects.forEach((pr) => {
      children.push(p(`${pr.name}${pr.link ? ` — ${pr.link}` : ""}`, { bold: true }), p(pr.description));
    });
  }

  if (data.education.length) {
    children.push(h("Education"));
    data.education.forEach((ed) => {
      children.push(
        p(`${ed.degree} — ${ed.school}${ed.notes ? `, ${ed.notes}` : ""}`, { bold: true }),
        p(`${ed.location} · ${ed.date}`),
      );
    });
  }

  if (data.certifications.length) { children.push(h("Certifications"), ...data.certifications.map(bullet)); }
  if (data.languages.length) { children.push(h("Languages"), p(data.languages.join(", "))); }

  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}

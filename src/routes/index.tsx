import { createFileRoute } from "@tanstack/react-router";
import {
  Phone, MapPin, Clock, Calendar, Star, Sparkles, Shield, HeartHandshake,
  Smile, Stethoscope, Crown, Zap, ChevronRight, Menu, X
} from "lucide-react";
import { useState } from "react";
import heroClinic from "@/assets/hero-clinic.jpg";
import smilePortrait from "@/assets/smile-portrait.jpg";
import dentist from "@/assets/dentist.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { icon: Sparkles, title: "Teeth Whitening", desc: "Brighten your smile by up to 8 shades in a single visit." },
  { icon: Crown, title: "Veneers & Crowns", desc: "Custom-crafted porcelain for a flawless, natural look." },
  { icon: Smile, title: "Invisalign®", desc: "Clear aligners that straighten without steel or wires." },
  { icon: Stethoscope, title: "Cleanings & Exams", desc: "Gentle hygiene visits with the latest digital imaging." },
  { icon: Shield, title: "Emergency Care", desc: "Same-day relief for cracked teeth, pain and swelling." },
  { icon: HeartHandshake, title: "Family Dentistry", desc: "Compassionate care for every age, from toddlers to grandparents." },
];

const offers = [
  { title: "New Patient Special", price: "$89", desc: "Exam, X-rays & professional cleaning" },
  { title: "Whitening Promo", price: "$249", desc: "In-office whitening + take-home trays" },
  { title: "Free Invisalign Consult", price: "$0", desc: "Includes 3D smile preview" },
];

const testimonials = [
  { name: "Maria G.", text: "The entire staff is very kind, approachable and friendly. I actually look forward to my visits now.", rating: 5 },
  { name: "Jonathan R.", text: "The staff is very professional and kind, and even laugh at my jokes. Dr. Goh is the best in Chicago.", rating: 5 },
  { name: "Alicia M.", text: "Dr. Goh and her staff are amazing. I felt so welcomed from the first day. Highly recommend.", rating: 5 },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#offers", label: "Offers" },
    { href: "#about", label: "About" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display font-semibold text-lg">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-hero text-primary-foreground shadow-soft">
            <Smile className="w-5 h-5" />
          </span>
          Hermosa Dental
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-foreground/70 hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Calendar className="w-4 h-4" /> Book now
        </a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/50 px-6 py-4 space-y-3 bg-background">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block text-sm font-semibold text-primary">Book appointment →</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-soft" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-hero opacity-30 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card shadow-card text-xs font-medium text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Now accepting new patients
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-balance">
            Your most <em className="not-italic bg-gradient-hero bg-clip-text text-transparent">beautiful smile</em> starts here.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl text-balance">
            Hermosa Dental Clinic blends gentle, modern dentistry with the warmth of a neighborhood family practice — right here in Chicago.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-medium shadow-soft hover:shadow-glow transition-all">
              Book your visit <ChevronRight className="w-4 h-4" />
            </a>
            <a href="tel:+17735551234" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card font-medium hover:bg-muted transition-colors">
              <Phone className="w-4 h-4" /> Call (773) 555-1234
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}</div>
              <span>Loved by Chicago families</span>
            </div>
          </div>
        </div>
        <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="relative rounded-[2rem] overflow-hidden shadow-glow">
            <img src={heroClinic} alt="Modern Hermosa Dental Clinic interior" width={1600} height={1200} className="w-full h-auto object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-card p-4 flex items-center gap-3 animate-float">
            <img src={smilePortrait} alt="Happy patient" width={56} height={56} loading="lazy" className="w-14 h-14 rounded-full object-cover" />
            <div>
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}</div>
              <div className="text-xs text-muted-foreground mt-0.5">+2,400 happy smiles</div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-card px-4 py-3 animate-float" style={{ animationDelay: "1s" }}>
            <div className="text-xs text-muted-foreground">Open today</div>
            <div className="text-sm font-semibold">10 AM – 6 PM</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Our services</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-balance">Everything your smile needs, under one roof.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="group p-7 rounded-3xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary grid place-items-center text-primary group-hover:bg-gradient-hero group-hover:text-primary-foreground transition-all">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offers() {
  return (
    <section id="offers" className="py-24 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Limited offers</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-balance">Save on the care you deserve.</h2>
          <p className="mt-4 text-muted-foreground">Exclusive specials for new and returning patients this month.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o, i) => (
            <div key={o.title} className={`p-8 rounded-3xl shadow-card transition-transform hover:-translate-y-1 ${i === 1 ? "bg-gradient-hero text-primary-foreground" : "bg-card"}`}>
              <Zap className={`w-7 h-7 ${i === 1 ? "text-primary-foreground" : "text-primary"}`} />
              <h3 className="mt-5 text-2xl font-semibold">{o.title}</h3>
              <div className="mt-3 text-5xl font-display font-semibold">{o.price}</div>
              <p className={`mt-3 ${i === 1 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{o.desc}</p>
              <a href="#contact" className={`mt-6 inline-flex items-center gap-2 text-sm font-medium ${i === 1 ? "text-primary-foreground" : "text-primary"}`}>
                Claim offer <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <img src={dentist} alt="Dr. Goh, lead dentist at Hermosa Dental" width={1200} height={1400} loading="lazy" className="w-full h-auto rounded-[2rem] object-cover shadow-soft" />
          <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-card p-5 max-w-[200px]">
            <div className="text-3xl font-display font-semibold">20+</div>
            <div className="text-sm text-muted-foreground">Years caring for Chicago smiles</div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Meet Dr. Goh</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-balance">Gentle hands. Honest answers. Real results.</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Dr. Goh founded Hermosa Dental on a simple promise: every patient leaves feeling heard, comfortable, and proud of their smile. From your first cleaning to a complete smile makeover, our team treats you like family.
          </p>
          <ul className="mt-8 space-y-3">
            {["Same-day appointments available", "Most insurance plans accepted", "Spanish & English speaking team", "Cozy, spa-like environment"].map(item => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary grid place-items-center text-primary">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-sm font-medium text-primary-glow uppercase tracking-wider">Patient stories</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-balance">Real smiles, real reviews.</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}</div>
            <span className="text-background/70">Loved by our community</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <figure key={t.name} className="p-7 rounded-3xl bg-background/5 border border-background/10 backdrop-blur">
              <div className="flex">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}</div>
              <blockquote className="mt-4 text-lg leading-relaxed text-background/90">"{t.text}"</blockquote>
              <figcaption className="mt-5 text-sm text-background/60">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-gradient-soft">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2.5rem] bg-card shadow-glow overflow-hidden grid lg:grid-cols-2">
          <div className="p-10 md:p-14 bg-gradient-hero text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-semibold text-balance">Ready for your brightest smile?</h2>
            <p className="mt-4 text-primary-foreground/90 text-lg">Book in under 60 seconds. We'll confirm by text within the hour.</p>
            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">Call us</div>
                  <a href="tel:+17735551234" className="text-primary-foreground/80 hover:text-primary-foreground">(773) 555-1234</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">Visit us</div>
                  <div className="text-primary-foreground/80">2400 N Pulaski Rd, Chicago, IL 60639</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">Hours</div>
                  <div className="text-primary-foreground/80">Mon – Fri: 10 AM – 6 PM<br />Sat: 9 AM – 2 PM</div>
                </div>
              </div>
            </div>
          </div>
          <form className="p-10 md:p-14 space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch shortly."); }}>
            <h3 className="text-2xl font-semibold">Request an appointment</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="First name" className="px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input required placeholder="Last name" className="px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <input required type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="email" placeholder="Email (optional)" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>I'm interested in…</option>
              <option>New patient cleaning ($89)</option>
              <option>Teeth whitening</option>
              <option>Invisalign consult</option>
              <option>Veneers / cosmetic</option>
              <option>Emergency / pain</option>
            </select>
            <textarea rows={3} placeholder="Anything we should know? (optional)" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button type="submit" className="w-full py-4 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
              Request my appointment
            </button>
            <p className="text-xs text-muted-foreground text-center">We'll never share your info. Reply STOP to opt out anytime.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-display text-foreground">
          <Smile className="w-4 h-4 text-primary" /> Hermosa Dental Clinic
        </div>
        <div>© {new Date().getFullYear()} Hermosa Dental. All rights reserved.</div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Services />
      <Offers />
      <About />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}

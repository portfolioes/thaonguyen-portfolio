import { motion } from "motion/react";
import {
  Sparkles,
  Camera,
  Megaphone,
  Film,
  CalendarRange,
  ClipboardList,
  Headphones,
  Tv,
  Heart,
  GraduationCap,
  BookOpen,
  Palette,
  FileSpreadsheet,
  Globe,
  Languages,
  Lightbulb,
  ListChecks,
  Sprout,
  Users,
  Leaf,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Clock,
  QrCode,
  ArrowRight,
  Check,
} from "lucide-react";
import { SectionShell, FadeIn } from "./SectionShell";
import { PhotoFrame } from "./PhotoFrame";
import { VideoFrame } from "./VideoFrame";
import { CircularProgress } from "./CircularProgress";
import { AnimatedNumber } from "./AnimatedNumber";

const GOLD = "#d4a55f";
const GOLD_LIGHT = "#e8b86b";
const CREAM = "#f5e6c8";
const MUTED = "#b8a07c";

const COVER_SUNBEAMS = [
  { id: 1, left: 58, width: 18, rotate: 22, opacity: 0.16, delay: 0.2, duration: 16 },
  { id: 2, left: 66, width: 28, rotate: 17, opacity: 0.24, delay: 1.1, duration: 19 },
  { id: 3, left: 76, width: 14, rotate: 27, opacity: 0.18, delay: 0.7, duration: 14 },
  { id: 4, left: 84, width: 24, rotate: 12, opacity: 0.2, delay: 1.8, duration: 21 },
  { id: 5, left: 93, width: 16, rotate: 31, opacity: 0.14, delay: 0.4, duration: 17 },
];

/* ─────────── 1. COVER ─────────── */
export function CoverSection() {
  return (
    <section
      id="cover"
      className="relative min-h-screen w-full flex items-center px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(21,10,4,0.85) 0%, rgba(42,24,16,0.82) 60%, rgba(26,13,5,0.85) 100%)" }}
    >
      {/* light rays */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 75% 30%, rgba(232,184,107,0.22), transparent 50%), radial-gradient(circle at 20% 80%, rgba(212,165,95,0.12), transparent 55%)",
        }}
      />
      {/* soft sunbeams */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.34, 0.52, 0.34], x: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-[24vh] pointer-events-none"
        style={{
          background:
            "conic-gradient(from 198deg at 82% 0%, transparent 0deg, rgba(255,238,194,0.18) 9deg, transparent 20deg, transparent 28deg, rgba(232,184,107,0.15) 42deg, transparent 56deg, transparent 66deg, rgba(255,244,214,0.11) 82deg, transparent 102deg, transparent 360deg)",
          filter: "blur(12px)",
          mixBlendMode: "screen",
        }}
      />
      {COVER_SUNBEAMS.map((ray) => (
        <motion.div
          key={ray.id}
          animate={{
            opacity: [ray.opacity * 0.55, ray.opacity, ray.opacity * 0.55],
            x: [0, -8 + ray.id * 2, 0],
            scaleX: [0.94, 1.08, 0.94],
          }}
          transition={{
            duration: ray.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ray.delay,
          }}
          className="absolute -top-[30vh] -bottom-[30vh] origin-top pointer-events-none"
          style={{
            left: `${ray.left}%`,
            marginLeft: `${ray.width / -2}vw`,
            width: `${ray.width}vw`,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,244,214,0.20) 42%, rgba(232,184,107,0.12) 52%, transparent 100%)",
            filter: "blur(18px)",
            mixBlendMode: "screen",
            rotate: `${ray.rotate}deg`,
          }}
        />
      ))}
      {/* floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 3,
            height: 3,
            background: GOLD_LIGHT,
            boxShadow: `0 0 8px ${GOLD_LIGHT}`,
            top: `${10 + i * 11}%`,
            left: `${5 + i * 11}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ color: GOLD, letterSpacing: "0.4em", fontSize: "11px", textTransform: "uppercase" }}
            className="mb-6"
          >
            Marketing Intern Portfolio · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-elegant title-gradient whitespace-nowrap"
            style={{
              fontSize: "clamp(60px, 9vw, 128px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "0.01em",
            }}
          >
            Nguyen Thi
            <br />
            <span className="font-elegant title-italic-gold whitespace-nowrap" style={{ fontWeight: 400 }}>
              Thao Nguyen
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-12 h-px" style={{ background: GOLD }} />
              <span style={{ color: MUTED, letterSpacing: "0.2em", fontSize: "12px", textTransform: "uppercase" }}>
                Creative · Visual · Execution
              </span>
            </div>
            <p style={{ color: CREAM, lineHeight: 1.7, opacity: 0.85 }}>
              A visual-minded marketing learner with hands-on experience in{" "}
              <span style={{ color: GOLD_LIGHT }}>content creation, video editing, event operations and marketing support</span>.
              <br />
              Applying for Marketing / Content / Event internship roles.
            </p>

            <div className="flex flex-wrap gap-6 mt-8" style={{ color: MUTED, fontSize: "13px" }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" style={{ color: GOLD }} />
                Ho Chi Minh City
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" style={{ color: GOLD }} />
                Open to internship opportunities
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex items-center gap-2"
            style={{ color: GOLD }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Scroll
            </span>
            <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <PhotoFrame slotId="cover.portrait" label="Your Portrait" hint="Professional photo" aspect="aspect-[4/5]" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── 2. TABLE OF CONTENTS ─────────── */
export function TableOfContentsSection() {
  const chapters = [
    { num: "01", title: "Cover", desc: "Introduction", id: "cover", group: "Intro" },
    { num: "02", title: "Contents", desc: "Reading map", id: "toc", group: "Intro" },
    { num: "03", title: "Tagline", desc: "Personal positioning", id: "tagline", group: "Intro" },
    { num: "04", title: "Profile Summary", desc: "Who I am in 30 seconds", id: "profile", group: "About Me" },
    { num: "05", title: "Marketing Direction", desc: "Why marketing, content & events", id: "why-sony", group: "About Me" },
    { num: "06", title: "Education", desc: "Marketing foundation", id: "education", group: "About Me" },
    { num: "07", title: "Skills", desc: "Creative, digital, office", id: "skills", group: "About Me" },
    { num: "08", title: "Working Style", desc: "How I work", id: "style", group: "About Me" },
    { num: "09", title: "Experience Overview", desc: "Timeline", id: "experience", group: "Experience" },
    { num: "10", title: "1 Nhà Studio", desc: "Featured case study", id: "case-1", group: "Experience" },
    { num: "11", title: "CloudGo Video", desc: "Video production", id: "case-2", group: "Experience" },
    { num: "12", title: "Kim Oanh Group", desc: "Marketing support", id: "case-4", group: "Experience" },
    { num: "13", title: "Event Operations", desc: "National competition", id: "case-3", group: "Experience" },
    { num: "14", title: "Role Match", desc: "How I support marketing teams", id: "matching", group: "Role Fit" },
    { num: "15", title: "Marketing Lens", desc: "Content, event & brand thinking", id: "analysis", group: "Role Fit" },
    { num: "16", title: "Why I Fit", desc: "Contribution & growth", id: "fit", group: "Role Fit" },
    { num: "17", title: "Contact", desc: "Let's connect", id: "contact", group: "Role Fit" },
  ];

  const groups = ["Intro", "About Me", "Experience", "Role Fit"];

  return (
    <SectionShell id="toc" eyebrow="02 · Table of Contents" variant="deep">
      <FadeIn>
        <h2
          className="font-display mb-3"
          style={{
            color: CREAM,
            fontSize: "clamp(36px, 5.5vw, 64px)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          A <span className="font-script title-italic-gold" style={{ fontWeight: 600 }}>guided reading</span>
          <br />
          of this portfolio.
        </h2>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="max-w-2xl mb-14" style={{ color: MUTED, lineHeight: 1.7 }}>
          Seventeen chapters across four movements — from introduction, through experience
          and case studies, to how I can support marketing teams through creative and operational work.
        </p>
      </FadeIn>

      <div className="grid lg:grid-cols-4 gap-8">
        {groups.map((g, gi) => (
          <FadeIn key={g} delay={gi * 0.1}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-display"
                  style={{
                    color: GOLD_LIGHT,
                    fontSize: "32px",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  0{gi + 1}
                </span>
                <span style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                  {g}
                </span>
              </div>
              <div className="space-y-3">
                {chapters
                  .filter((c) => c.group === g)
                  .map((c) => (
                    <a
                      key={c.id}
                      href={`#${c.id}`}
                      className="group flex items-start gap-4 p-3 rounded-lg transition-all"
                      style={{
                        background: "rgba(40,24,14,0.3)",
                        border: "1px solid rgba(212,165,95,0.1)",
                      }}
                    >
                      <span
                        className="font-display shrink-0 mt-0.5"
                        style={{
                          color: GOLD,
                          fontSize: "13px",
                          fontVariantNumeric: "tabular-nums",
                          opacity: 0.7,
                        }}
                      >
                        {c.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div
                          className="font-display group-hover:translate-x-1 transition-transform"
                          style={{ color: CREAM, fontSize: "16px", fontWeight: 400, lineHeight: 1.3 }}
                        >
                          {c.title}
                        </div>
                        <div style={{ color: MUTED, fontSize: "12px" }}>{c.desc}</div>
                      </div>
                      <ArrowRight
                        className="w-3.5 h-3.5 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: GOLD_LIGHT }}
                      />
                    </a>
                  ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}

/* ─────────── 3. TAGLINE ─────────── */
export function TaglineSection() {
  return (
    <SectionShell id="tagline" variant="deep">
      <div className="min-h-[70vh] flex flex-col justify-center max-w-5xl mx-auto">
        <FadeIn>
          <Sparkles className="w-6 h-6 mb-8" style={{ color: GOLD }} />
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            className="font-display title-gradient"
            style={{
              fontSize: "clamp(38px, 6.5vw, 84px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Where{" "}
            <span className="font-script title-italic-gold" style={{ fontWeight: 600 }}>creative taste</span>
            <br />
            meets{" "}
            <span className="font-script title-italic-gold" style={{ fontWeight: 600 }}>marketing execution</span>.
          </h2>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p
            className="mt-10 max-w-2xl"
            style={{ color: MUTED, lineHeight: 1.8, fontSize: "16px" }}
          >
            A Business Administration student with hands-on experience in content creation,
            video editing, event operations and marketing support — turning visual ideas into
            clear, usable communication materials while staying organized, adaptable and ready to
            learn through real execution.
          </p>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

/* ─────────── 3. PROFILE ─────────── */
const capabilities = [
  { icon: Camera, label: "Visual storytelling & content production" },
  { icon: CalendarRange, label: "Event coordination & timeline follow-up" },
  { icon: ClipboardList, label: "Proposal, slide & checklist support" },
  { icon: Lightbulb, label: "Basic marketing thinking from coursework" },
  { icon: Palette, label: "Creative tools & digital platforms" },
];

export function ProfileSection() {
  return (
    <SectionShell id="profile" eyebrow="04 · Profile" title="A marketing learner with visual and event execution experience." variant="dark">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <FadeIn>
          <p style={{ color: CREAM, lineHeight: 1.8, opacity: 0.9 }}>
            I am currently a <span style={{ color: GOLD_LIGHT }}>third-year Business Administration student</span> at the{" "}
            <span style={{ color: GOLD_LIGHT }}>University of Economics and Law, VNU-HCM</span>.
          </p>
          <p className="mt-6" style={{ color: MUTED, lineHeight: 1.8 }}>
            I am looking for internship opportunities where I can learn from real marketing work —
            including content creation, campaign support, event operations, brand communication and
            cross-functional coordination.
          </p>
          <div className="mt-10">
            <PhotoFrame slotId="profile.candid" label="Candid photo" hint="At event or workspace" aspect="aspect-[5/4]" />
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((c, i) => (
            <FadeIn key={c.label} delay={i * 0.08}>
              <div
                className="p-6 rounded-2xl h-full"
                style={{
                  background: "rgba(40,24,14,0.5)",
                  border: "1px solid rgba(212,165,95,0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(212,165,95,0.1)", border: "1px solid rgba(212,165,95,0.25)" }}
                >
                  <c.icon className="w-5 h-5" style={{ color: GOLD_LIGHT }} />
                </div>
                <div style={{ color: CREAM, lineHeight: 1.5 }}>{c.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ─────────── 4. WHY SONY ─────────── */
export function WhySonySection() {
  const pillars = [
    { icon: Lightbulb, word: "Content", desc: "Turning ideas into clear communication" },
    { icon: Heart, word: "Brand", desc: "Keeping visuals, tone and message consistent" },
    { icon: ListChecks, word: "Execution", desc: "Supporting campaigns, events and daily marketing work" },
  ];
  return (
    <SectionShell id="why-sony" eyebrow="05 · Marketing Direction" variant="warm">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div>
          <FadeIn>
            <h2
              className="font-display title-gradient"
              style={{
                fontSize: "clamp(36px, 5.5vw, 64px)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Why{" "}
              <span className="font-script title-italic-gold" style={{ fontWeight: 700 }}>marketing</span>,
              <br />
              content and brand experience.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8" style={{ color: CREAM, lineHeight: 1.8, opacity: 0.85 }}>
              Marketing stands out to me because it connects{" "}
              <span style={{ color: GOLD_LIGHT }}>creativity with real business context</span>.
              It is not only about making things look good — it is about understanding people,
              shaping messages and turning ideas into materials that can be used across content,
              campaigns, events and customer touchpoints.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="mt-5" style={{ color: MUTED, lineHeight: 1.8 }}>
              My interest in visual storytelling, consumer behavior and organized execution makes
              marketing a field where I can combine both creative sensitivity and practical support.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {pillars.map((p, i) => (
            <FadeIn key={p.word} delay={i * 0.12}>
              <div
                className="p-6 rounded-2xl flex items-center gap-5"
                style={{
                  background: "linear-gradient(90deg, rgba(50,28,16,0.7), rgba(30,18,10,0.4))",
                  border: "1px solid rgba(212,165,95,0.2)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "radial-gradient(circle, rgba(232,184,107,0.25), rgba(212,165,95,0.05))",
                    border: "1px solid rgba(232,184,107,0.4)",
                  }}
                >
                  <p.icon className="w-6 h-6" style={{ color: GOLD_LIGHT }} />
                </div>
                <div>
                  <div style={{ color: CREAM, fontSize: "24px", fontWeight: 300, letterSpacing: "0.02em" }}>
                    {p.word}
                  </div>
                  <div style={{ color: MUTED, fontSize: "13px" }}>{p.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ─────────── 5. EDUCATION ─────────── */
export function EducationSection() {
  const courses = [
    "Principles of Marketing",
    "Brand Management",
    "Consumer Behavior",
    "Digital Marketing",
    "Business Communication",
    "Project / Event Subjects",
    "Business Administration Core",
    "Market Research Basics",
  ];
  return (
    <SectionShell id="education" eyebrow="06 · Education" title="Marketing foundation in progress." variant="deep">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
        <FadeIn>
          <div
            className="p-8 rounded-2xl h-full"
            style={{
              background: "linear-gradient(160deg, rgba(50,28,16,0.7), rgba(25,14,7,0.7))",
              border: "1px solid rgba(212,165,95,0.2)",
            }}
          >
            <GraduationCap className="w-8 h-8 mb-6" style={{ color: GOLD_LIGHT }} />
            <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Bachelor's Degree
            </div>
            <div className="mt-2" style={{ color: CREAM, fontSize: "22px", fontWeight: 300, lineHeight: 1.3 }}>
              Business Administration
            </div>
            <div className="mt-1" style={{ color: MUTED, fontSize: "14px" }}>
              University of Economics and Law, VNU-HCM
            </div>

            <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(212,165,95,0.15)" }}>
              <div className="flex items-baseline justify-between mb-2">
                <span style={{ color: MUTED, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Current GPA
                </span>
                <span className="font-display title-italic-gold" style={{ fontSize: "32px", fontWeight: 400 }}>
                  3.39<span style={{ color: MUTED, fontSize: "16px" }}>/4.0</span>
                </span>
              </div>
              <div style={{ color: MUTED, fontSize: "13px" }}>
                Business Administration student · transitioning into third year
              </div>
            </div>

            {/* upcoming double major */}
            <div
              className="mt-6 p-4 rounded-xl flex items-start gap-3"
              style={{
                background: "rgba(232,184,107,0.08)",
                border: "1px dashed rgba(232,184,107,0.35)",
              }}
            >
              <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GOLD_LIGHT }} />
              <div>
                <div style={{ color: GOLD_LIGHT, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Upcoming learning focus
                </div>
                <div className="mt-1" style={{ color: CREAM, fontSize: "13px", lineHeight: 1.5 }}>
                  Continuing to strengthen my foundation in <span style={{ color: GOLD_LIGHT }}>Digital Marketing</span>, consumer understanding and practical marketing execution.
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-4 h-4" style={{ color: GOLD }} />
            <span style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Relevant Coursework
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {courses.map((c, i) => (
              <FadeIn key={c} delay={i * 0.05}>
                <div
                  className="px-5 py-4 rounded-xl flex items-center gap-3"
                  style={{
                    background: "rgba(40,24,14,0.4)",
                    border: "1px solid rgba(212,165,95,0.12)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: GOLD_LIGHT, boxShadow: `0 0 6px ${GOLD_LIGHT}` }}
                  />
                  <span style={{ color: CREAM, fontSize: "14px" }}>{c}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

/* ─────────── 6. SKILLS ─────────── */
export function SkillsSection() {
  const blocks = [
    {
      icon: Palette,
      title: "Creative & Content",
      items: [
        { label: "Canva", level: "Strong", value: 88 },
        { label: "CapCut", level: "Strong", value: 90 },
        { label: "Meta Business", level: "Strong", value: 82 },
      ],
    },
    {
      icon: FileSpreadsheet,
      title: "Office & Documentation",
      items: [
        { label: "MS Word", level: "Intermediate", value: 70 },
        { label: "MS Excel", level: "Intermediate", value: 65 },
        { label: "PowerPoint", level: "Intermediate", value: 72 },
        { label: "Email Comm.", level: "Good", value: 78 },
      ],
    },
    {
      icon: Globe,
      title: "Planning & Digital",
      items: [
        { label: "Google Workspace", level: "Basic-Int", value: 60 },
        { label: "Notion", level: "Basic", value: 45 },
        { label: "TikTok Analytics", level: "Basic", value: 40 },
      ],
    },
    {
      icon: Languages,
      title: "Language",
      items: [
        { label: "Vietnamese", level: "Native", value: 100 },
        { label: "English (VSTEP B2)", level: "B1/B2", value: 65 },
      ],
    },
  ];

  const certifications = [
    { label: "VSTEP B2 Certificate", note: "English proficiency" },
    { label: "Canva & CapCut", note: "Daily production tools" },
    { label: "Meta Business Suite", note: "Hands-on fanpage ops" },
    { label: "Continuous learning", note: "Notion, TikTok Analytics" },
  ];

  return (
    <SectionShell id="skills" eyebrow="07 · Skills" title="Creative, digital & office support." variant="dark">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {blocks.map((b, i) => (
          <FadeIn key={b.title} delay={i * 0.08}>
            <div
              className="p-6 rounded-2xl h-full"
              style={{
                background: "linear-gradient(180deg, rgba(45,26,14,0.6), rgba(25,14,7,0.6))",
                border: "1px solid rgba(212,165,95,0.18)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(212,165,95,0.1)", border: "1px solid rgba(212,165,95,0.3)" }}
              >
                <b.icon className="w-5 h-5" style={{ color: GOLD_LIGHT }} />
              </div>
              <div className="font-display mb-6" style={{ color: CREAM, fontSize: "17px", fontWeight: 400 }}>
                {b.title}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                {b.items.map((it) => (
                  <CircularProgress key={it.label} label={it.label} level={it.level} value={it.value} />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* bottom band — certifications */}
      <FadeIn delay={0.3}>
        <div
          className="p-7 rounded-2xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(232,184,107,0.08), rgba(40,24,14,0.3) 50%, rgba(232,184,107,0.08))",
            border: "1px solid rgba(232,184,107,0.2)",
          }}
        >
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div>
              <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Certifications &amp; Practice
              </div>
              <div className="mt-2 font-display title-gradient" style={{ fontSize: "26px", fontWeight: 400 }}>
                What backs these numbers.
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: GOLD_LIGHT, boxShadow: `0 0 8px ${GOLD_LIGHT}` }}
                  />
                  <div>
                    <div style={{ color: CREAM, fontSize: "13px" }}>{c.label}</div>
                    <div style={{ color: MUTED, fontSize: "11px" }}>{c.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}

/* ─────────── 7. WORKING STYLE ─────────── */
export function WorkingStyleSection() {
  const traits = [
    { icon: Palette, title: "Visual-minded", desc: "I pay attention to composition, tone, details and how visual materials communicate a message." },
    { icon: ListChecks, title: "Organized in execution", desc: "Familiar with slides, checklists, timelines, proposals, email drafts and event documents." },
    { icon: Sprout, title: "Quick to learn", desc: "Still developing professionally — I absorb new requirements, observe feedback and adapt." },
    { icon: Leaf, title: "Calm but proactive", desc: "I listen carefully, clarify tasks, then take ownership of assigned work." },
    { icon: Users, title: "Team-oriented", desc: "Worked with event teams; I understand alignment, deadlines and follow-up." },
  ];
  return (
    <SectionShell id="style" eyebrow="08 · Working Style" title="Thoughtful creativity, practical execution." variant="warm">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {traits.map((t, i) => (
          <FadeIn key={t.title} delay={i * 0.08}>
            <div
              className="p-6 rounded-2xl h-full"
              style={{
                background: "rgba(40,24,14,0.45)",
                border: "1px solid rgba(212,165,95,0.18)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: "linear-gradient(135deg, rgba(232,184,107,0.2), rgba(212,165,95,0.05))",
                }}
              >
                <t.icon className="w-5 h-5" style={{ color: GOLD_LIGHT }} />
              </div>
              <div className="font-display mb-2" style={{ color: CREAM, fontSize: "16px", fontWeight: 400 }}>
                {t.title}
              </div>
              <div style={{ color: MUTED, fontSize: "13px", lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* bottom — manifesto quote + values */}
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
        <FadeIn delay={0.2}>
          <div
            className="p-8 rounded-2xl h-full relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(60,36,18,0.55), rgba(25,14,7,0.55))",
              border: "1px solid rgba(232,184,107,0.25)",
            }}
          >
            <div
              className="absolute -top-12 -right-12 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(232,184,107,0.18), transparent 70%)" }}
            />
            <div className="font-display title-italic-gold" style={{ fontSize: "60px", lineHeight: 1, fontWeight: 400 }}>
              "
            </div>
            <p
              className="font-display"
              style={{ color: CREAM, fontSize: "22px", lineHeight: 1.4, fontWeight: 300, fontStyle: "italic" }}
            >
              Thoughtful creativity, practical execution — I want my work to look intentional and arrive on time.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="w-10 h-px" style={{ background: GOLD }} />
              <span style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Personal manifesto
              </span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div
            className="p-8 rounded-2xl h-full"
            style={{
              background: "rgba(40,24,14,0.4)",
              border: "1px solid rgba(212,165,95,0.18)",
            }}
          >
            <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Values I work by
            </div>
            <ul className="mt-5 space-y-4">
              {[
                ["Clarity", "Beautiful work that is still easy to use"],
                ["Reliability", "Commit, then deliver — without drama"],
                ["Curiosity", "Ask one more question before starting"],
                ["Care", "Small details signal real respect"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-start gap-4">
                  <span className="font-display title-italic-gold shrink-0" style={{ fontSize: "20px", fontWeight: 400, minWidth: 96 }}>
                    {k}
                  </span>
                  <span style={{ color: CREAM, fontSize: "13px", opacity: 0.85, lineHeight: 1.5 }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

/* ─────────── 8. EXPERIENCE TIMELINE ─────────── */
export function ExperienceSection() {
  const items = [
    { icon: Camera, role: "Content Creator / Editor", org: "Wedding Studio · 1 Nhà", note: "Content, short-form video, poster, fanpage copy" },
    { icon: Film, role: "Video Production", org: "CloudGo Project", note: "Anniversary video — storytelling & editing" },
    { icon: Megaphone, role: "Marketing Assistant", org: "Kim Oanh Group", note: "Short-term marketing support in real estate" },
    { icon: CalendarRange, role: "Event Member", org: "Academic Club", note: "National Business Startup Competition S.XI & XII" },
  ];
  const stats = [
    { value: 4, padStart: 2, suffix: "", l: "Project Roles", d: "Across creative, video, marketing, event" },
    { value: 12, suffix: "+", l: "Months of Practice", d: "Real client and team work" },
    { value: 30, suffix: "+", l: "Visual Deliverables", d: "Reels, posters, fanpage assets" },
    { value: 2, padStart: 2, suffix: "", l: "Event Seasons", d: "National Startup Competition XI & XII" },
  ];

  return (
    <SectionShell id="experience" eyebrow="09 · Experience" title="From content to event operations." variant="dark">
      <div className="relative">
        <div
          className="hidden lg:block absolute left-0 right-0 top-12 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,165,95,0.4), transparent)" }}
        />
        <div className="grid lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <FadeIn key={it.role} delay={i * 0.1}>
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full mx-auto lg:mx-0 flex items-center justify-center mb-6 relative z-10"
                  style={{
                    background: "linear-gradient(135deg, #3a2310, #1a0d05)",
                    border: "1px solid rgba(232,184,107,0.5)",
                    boxShadow: "0 0 20px rgba(232,184,107,0.25)",
                  }}
                >
                  <it.icon className="w-5 h-5" style={{ color: GOLD_LIGHT }} />
                </div>
                <div
                  className="p-5 rounded-xl"
                  style={{
                    background: "rgba(40,24,14,0.5)",
                    border: "1px solid rgba(212,165,95,0.15)",
                  }}
                >
                  <div style={{ color: GOLD, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    0{i + 1}
                  </div>
                  <div className="mt-2" style={{ color: CREAM, fontSize: "16px", fontWeight: 500 }}>
                    {it.role}
                  </div>
                  <div style={{ color: GOLD_LIGHT, fontSize: "13px" }} className="mb-3">
                    {it.org}
                  </div>
                  <div style={{ color: MUTED, fontSize: "13px", lineHeight: 1.6 }}>{it.note}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* bottom — capability summary band */}
      <FadeIn delay={0.3}>
        <div
          className="mt-16 grid md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.l}
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(50,28,16,0.55), rgba(25,14,7,0.55))",
                border: "1px solid rgba(212,165,95,0.2)",
              }}
            >
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(232,184,107,0.12), transparent 70%)" }}
              />
              <div className="font-display title-italic-gold" style={{ fontSize: "44px", fontWeight: 400, lineHeight: 1 }}>
                <AnimatedNumber value={s.value} suffix={s.suffix} padStart={s.padStart} />
              </div>
              <div className="mt-3" style={{ color: GOLD, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                {s.l}
              </div>
              <div className="mt-1" style={{ color: MUTED, fontSize: "12px", lineHeight: 1.5 }}>
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="w-16 h-px" style={{ background: "rgba(212,165,95,0.4)" }} />
          <span style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase" }}>
            Four case studies follow
          </span>
          <span className="w-16 h-px" style={{ background: "rgba(212,165,95,0.4)" }} />
        </div>
      </FadeIn>
    </SectionShell>
  );
}

/* ─────────── 9-12. CASE STUDIES ─────────── */
function CaseStudy({
  id,
  number,
  role,
  context,
  responsibilities,
  learned,
  relevance,
  reverse = false,
  variant = "dark",
  imageSlots = "many",
}: {
  id: string;
  number: string;
  imageSlots?: "many" | "few";
  role: string;
  context: string;
  responsibilities: string[];
  learned?: string[];
  relevance?: string;
  reverse?: boolean;
  variant?: "dark" | "deep" | "warm";
}) {
  const slotPrefix = id.replace("case-", "case");

  return (
    <SectionShell id={id} eyebrow={`${number} · Case Study`} variant={variant}>
      <div className={`grid lg:grid-cols-2 gap-12 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <FadeIn>
          <div
            className="inline-block px-3 py-1 rounded-full mb-5"
            style={{
              background: "rgba(232,184,107,0.1)",
              border: "1px solid rgba(232,184,107,0.3)",
              color: GOLD_LIGHT,
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {role}
          </div>
          <h2
            className="font-display title-gradient"
            style={{
              fontSize: "clamp(30px, 4.5vw, 50px)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
          >
            {context}
          </h2>

          <div className="mt-8">
            <div className="mb-4" style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Responsibilities
            </div>
            <ul className="space-y-3">
              {responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3" style={{ color: CREAM, lineHeight: 1.6, opacity: 0.9 }}>
                  <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: GOLD_LIGHT }} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {learned && (
            <div className="mt-8">
              <div className="mb-4" style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                What I Learned
              </div>
              <ul className="space-y-2">
                {learned.map((l) => (
                  <li key={l} style={{ color: MUTED, fontSize: "14px", lineHeight: 1.7 }}>
                    — {l}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relevance && (
            <FadeIn delay={0.2}>
              <div
                className="mt-8 p-5 rounded-xl"
                style={{
                  background: "rgba(232,184,107,0.06)",
                  border: "1px solid rgba(232,184,107,0.2)",
                  borderLeft: `3px solid ${GOLD_LIGHT}`,
                }}
              >
                <div style={{ color: GOLD_LIGHT, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }} className="mb-2">
                  Marketing Relevance
                </div>
                <div style={{ color: CREAM, fontSize: "14px", lineHeight: 1.7 }}>{relevance}</div>
              </div>
            </FadeIn>
          )}
        </FadeIn>

        {imageSlots === "few" ? (
          <div className="grid grid-cols-1 gap-4">
            <PhotoFrame slotId={`${slotPrefix}.workSample`} label="Work Sample" hint="Key visual" aspect="aspect-[4/3]" />
            <div className="grid grid-cols-2 gap-4">
              <PhotoFrame slotId={`${slotPrefix}.evidence`} label="Evidence" hint="Screenshot" aspect="aspect-square" />
              <PhotoFrame slotId={`${slotPrefix}.detail`} label="Detail" hint="Optional" aspect="aspect-square" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <PhotoFrame slotId={`${slotPrefix}.workSample`} label="Work Sample" hint="Poster / Frame" aspect="aspect-[3/4]" />
            <PhotoFrame slotId={`${slotPrefix}.detailShot`} label="Detail Shot" hint="Process / Output" aspect="aspect-[3/4]" className="mt-10" />
            <PhotoFrame slotId={`${slotPrefix}.evidence`} label="Evidence" hint="Screenshot" aspect="aspect-square" />
            <PhotoFrame slotId={`${slotPrefix}.mockup`} label="Mockup" hint="Phone / Screen" aspect="aspect-square" className="mt-6" />
            <PhotoFrame slotId={`${slotPrefix}.behindTheScenes`} label="Behind the Scenes" hint="Process photo" aspect="aspect-[4/5]" />
            <PhotoFrame slotId={`${slotPrefix}.finalOutput`} label="Final Output" hint="Deliverable" aspect="aspect-[4/5]" className="mt-10" />
          </div>
        )}
      </div>
    </SectionShell>
  );
}

export function CaseStudy1() {
  const scope = [
    { title: "Content Planning", desc: "Developed content themes, post ideas and short video scripts aligned with seasonal wedding moments." },
    { title: "Short-Form Video Editing", desc: "Edited reels, behind-the-scenes clips and highlight cuts in CapCut — pacing, transitions, color grade, captions." },
    { title: "Poster & Visual Design", desc: "Designed posters, story templates and promotional visuals in Canva with consistent brand tone." },
    { title: "Fanpage Copywriting", desc: "Wrote Vietnamese captions for fanpage posts: emotional hooks, service context, call-to-action lines." },
    { title: "Brand Visual Consistency", desc: "Maintained a cohesive feed: color palette, typography, mood and composition across formats." },
    { title: "Client Material Delivery", desc: "Coordinated revisions and final delivery of visual assets under real timelines." },
  ];

  const learned = [
    "How to translate emotional moments into structured visual stories",
    "How to adapt the same idea across reel, poster, story and fanpage formats",
    "How aesthetic decisions affect the way customers perceive a service",
    "How to take feedback from clients without losing creative direction",
    "How to balance speed of execution with attention to detail",
  ];
  const heroStats = [
    { value: 128, suffix: "K", l: "Brand Facebook Followers", icon: Users },
    { value: 16.4, suffix: "K", decimals: 1, l: "Brand TikTok Followers", icon: Film },
    { value: 100, suffix: "+", l: "Visual Assets", icon: Palette },
    { text: "Main", l: "Content & Editing Role", icon: Check },
  ];

  return (
    <section
      id="case-1"
      className="relative w-full py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, rgba(31,18,10,0.85) 0%, rgba(42,24,16,0.85) 50%, rgba(26,13,5,0.88) 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(232,184,107,0.1), transparent 50%), radial-gradient(ellipse at 90% 90%, rgba(212,165,95,0.08), transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <FadeIn>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-end mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span style={{ color: GOLD, letterSpacing: "0.4em", fontSize: "11px", textTransform: "uppercase" }}>
                  10 · Featured Case Study
                </span>
                <span className="w-12 h-px" style={{ background: GOLD }} />
              </div>
              <h2
                className="font-display title-gradient"
                style={{
                  fontSize: "clamp(38px, 6vw, 76px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                }}
              >
                <span className="font-script title-italic-gold" style={{ fontWeight: 600 }}>
                  1 Nhà Studio
                </span>{" "}
                —
                <br />
                <span className="font-serif-italic title-italic-gold">
                  my main creative ground.
                </span>
              </h2>
              <p className="mt-8 max-w-2xl" style={{ color: CREAM, lineHeight: 1.8, opacity: 0.85 }}>
                This is the role where I spent the most time and produced my largest body of
                creative work. As a Content Creator and Video Editor at{" "}
                <span style={{ color: GOLD_LIGHT }}>1 Nhà Studio (Ho Chi Minh City)</span>, I
                supported the studio's visual communication across Facebook and TikTok — from
                content ideas, short video scripts and visual design to video editing and fanpage
                copy. The work helped me understand how emotional storytelling, visual consistency
                and timely execution can shape how a service brand communicates with its audience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {heroStats.map((s) => (
                <div
                  key={s.l}
                  className="p-4 rounded-xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(60,36,18,0.6), rgba(25,14,7,0.6))",
                    border: "1px solid rgba(212,165,95,0.22)",
                  }}
                >
                  <s.icon className="w-3.5 h-3.5 absolute top-3 right-3" style={{ color: GOLD, opacity: 0.7 }} />
                  <div className="font-display title-italic-gold" style={{ fontSize: "30px", fontWeight: 400, lineHeight: 1 }}>
                    {"value" in s ? (
                      <AnimatedNumber value={s.value} suffix={s.suffix} decimals={s.decimals} />
                    ) : (
                      s.text
                    )}
                  </div>
                  <div className="mt-2" style={{ color: MUTED, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* brand strip */}
        <FadeIn delay={0.15}>
          <div
            className="mb-14 p-5 rounded-xl flex flex-wrap items-center gap-x-8 gap-y-3"
            style={{
              background: "linear-gradient(90deg, rgba(232,184,107,0.08), rgba(40,24,14,0.3) 50%, rgba(232,184,107,0.08))",
              border: "1px solid rgba(232,184,107,0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <span style={{ color: GOLD, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Brand
              </span>
              <span className="font-script title-italic-gold" style={{ fontSize: "26px", fontWeight: 600 }}>
                1 Nhà Studio
              </span>
            </div>
            <span className="w-px h-5" style={{ background: "rgba(212,165,95,0.3)" }} />
            <div className="flex items-center gap-2" style={{ color: CREAM, fontSize: "13px" }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: GOLD_LIGHT }} />
              Ho Chi Minh City
            </div>
            <span className="w-px h-5" style={{ background: "rgba(212,165,95,0.3)" }} />
            <div style={{ color: CREAM, fontSize: "13px" }}>
              <span style={{ color: GOLD_LIGHT }}>Facebook</span>{" "}
              <AnimatedNumber value={128} suffix="K" /> ·{" "}
              <span style={{ color: GOLD_LIGHT }}>TikTok</span>{" "}
              <AnimatedNumber value={16.4} suffix="K" decimals={1} />
            </div>
            <span className="w-px h-5" style={{ background: "rgba(212,165,95,0.3)" }} />
            <div style={{ color: MUTED, fontSize: "13px" }}>
              Role: Content Creator &amp; Video Editor
            </div>
          </div>
        </FadeIn>

        {/* HERO PHOTO STRIP */}
        <div className="grid grid-cols-12 gap-4 mb-20">
          <div className="col-span-12 md:col-span-7">
            <PhotoFrame slotId="case1.hero" label="Hero Visual" hint="Signature shot / cover" aspect="aspect-[16/10]" />
          </div>
          <div className="col-span-6 md:col-span-3">
            <PhotoFrame slotId="case1.detail" label="Detail" hint="Close-up" aspect="aspect-[4/5]" />
          </div>
          <div className="col-span-6 md:col-span-2 flex flex-col gap-4">
            <PhotoFrame slotId="case1.story1" label="Story 01" hint="Crop" aspect="aspect-square" />
            <PhotoFrame slotId="case1.story2" label="Story 02" hint="Crop" aspect="aspect-square" />
          </div>
        </div>

        {/* VIDEO REELS — 4 video slots with hover animation */}
        <FadeIn>
          <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
            <div>
              <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Video Reels · Hover to preview
              </div>
              <h3 className="mt-3 font-display" style={{ color: CREAM, fontSize: "32px", fontWeight: 300, lineHeight: 1.1 }}>
                Four short videos I produced.
              </h3>
            </div>
            <div style={{ color: MUTED, fontSize: "13px", maxWidth: "320px", lineHeight: 1.6 }}>
              Vertical 9:16 reels edited in CapCut — most of my work is short-form portrait video
              for Facebook Reels and TikTok feed.
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 max-w-5xl mx-auto">
          <VideoFrame slotId="case1.video1" title="Wedding Highlight Reel" aspect="aspect-[9/16]" />
          <VideoFrame slotId="case1.video2" title="Behind the Scenes" aspect="aspect-[9/16]" />
          <VideoFrame slotId="case1.video3" title="Couple Story Edit" aspect="aspect-[9/16]" />
          <VideoFrame slotId="case1.video4" title="Seasonal Promo Reel" aspect="aspect-[9/16]" />
        </div>

        {/* SCOPE OF WORK */}
        <FadeIn>
          <div className="mb-6">
            <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Scope of work
            </div>
            <h3 className="mt-3 font-display" style={{ color: CREAM, fontSize: "32px", fontWeight: 300, lineHeight: 1.1 }}>
              What I owned end-to-end.
            </h3>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {scope.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.06}>
              <div
                className="p-6 rounded-2xl h-full"
                style={{
                  background: "rgba(40,24,14,0.5)",
                  border: "1px solid rgba(212,165,95,0.18)",
                }}
              >
                <div
                  style={{
                    color: GOLD,
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  0{i + 1}
                </div>
                <div className="mt-3 font-display" style={{ color: CREAM, fontSize: "20px", fontWeight: 400, lineHeight: 1.2 }}>
                  {s.title}
                </div>
                <div className="mt-3" style={{ color: MUTED, fontSize: "13px", lineHeight: 1.7 }}>
                  {s.desc}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* DESIGN GALLERY — many photo slots */}
        <FadeIn>
          <div className="mb-6">
            <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Design Gallery · Posters & Visuals
            </div>
            <h3 className="mt-3 font-display" style={{ color: CREAM, fontSize: "32px", fontWeight: 300, lineHeight: 1.1 }}>
              Selected poster &amp; social design work.
            </h3>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-20">
          {[
            { id: 1, aspect: "aspect-[6/5]", span: "col-span-2 md:col-span-3" },
            { id: 2, aspect: "aspect-[6/5]", span: "col-span-2 md:col-span-3" },
            { id: 3, aspect: "aspect-square", span: "col-span-1 md:col-span-2" },
            { id: 4, aspect: "aspect-square", span: "col-span-1 md:col-span-2" },
            { id: 5, aspect: "aspect-square", span: "col-span-2 md:col-span-2" },
            { id: 6, aspect: "aspect-[6/5]", span: "col-span-1 md:col-span-2" },
            { id: 7, aspect: "aspect-[6/5]", span: "col-span-1 md:col-span-2" },
            { id: 8, aspect: "aspect-[6/5]", span: "col-span-2 md:col-span-2" },
          ].map((cfg) => (
            <div key={`poster-${cfg.id}`} className={cfg.span}>
              <PhotoFrame
                slotId={`case1.poster${cfg.id}`}
                label={`Poster ${String(cfg.id).padStart(2, "0")}`}
                hint={cfg.aspect === "aspect-square" ? "Square" : "3600x3000"}
                aspect={cfg.aspect}
              />
            </div>
          ))}
        </div>

        {/* TIKTOK VIEW PROOF */}
        <FadeIn>
          <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
            <div>
              <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                TikTok Performance · View Evidence
              </div>
              <h3 className="mt-3 font-display title-gradient" style={{ fontSize: "32px", fontWeight: 400, lineHeight: 1.1 }}>
                <span className="font-script title-italic-gold" style={{ fontWeight: 600 }}>High-view</span> reels from the studio account.
              </h3>
            </div>
            <div
              className="px-4 py-2 rounded-full"
              style={{
                background: "rgba(232,184,107,0.1)",
                border: "1px solid rgba(232,184,107,0.3)",
                color: GOLD_LIGHT,
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <AnimatedNumber value={16.4} suffix="K" decimals={1} /> Followers · Multiple Viral Reels
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <PhotoFrame
              key={`viewcount-${i}`}
              slotId={`case1.viewcount${i + 1}`}
              label={`View Count #${i + 1}`}
              hint="TikTok screenshot"
              aspect="aspect-[3/4]"
            />
          ))}
        </div>

        {/* LEARNED + RELEVANCE */}
        <div className="grid lg:grid-cols-2 gap-6">
          <FadeIn>
            <div
              className="p-8 rounded-2xl h-full"
              style={{
                background: "linear-gradient(160deg, rgba(60,36,18,0.55), rgba(25,14,7,0.55))",
                border: "1px solid rgba(212,165,95,0.25)",
              }}
            >
              <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                What I learned
              </div>
              <h4 className="mt-3 mb-6 font-display" style={{ color: CREAM, fontSize: "24px", fontWeight: 300 }}>
                Skills I built through real output.
              </h4>
              <ul className="space-y-3">
                {learned.map((l) => (
                  <li key={l} className="flex items-start gap-3" style={{ color: CREAM, opacity: 0.9, lineHeight: 1.6 }}>
                    <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: GOLD_LIGHT }} />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              className="p-8 rounded-2xl h-full"
              style={{
                background: "rgba(232,184,107,0.06)",
                border: "1px solid rgba(232,184,107,0.3)",
                borderLeft: `3px solid ${GOLD_LIGHT}`,
              }}
            >
              <div style={{ color: GOLD_LIGHT, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Marketing relevance
              </div>
              <h4 className="mt-3 mb-6 font-display" style={{ color: CREAM, fontSize: "24px", fontWeight: 300 }}>
                Why this work matters for marketing roles.
              </h4>
              <p style={{ color: CREAM, lineHeight: 1.7, opacity: 0.9 }}>
                Many marketing roles need visual materials that turn a message into something clear,
                emotional and usable across channels. The work I did at the studio helped me build
                transferable skills that can support content, brand, communications and campaign
                execution:
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  "Storytelling through short-form video",
                  "Visual consistency across formats",
                  "Caption writing tied to brand tone",
                  "Working under real client timelines",
                  "Balancing aesthetics with clarity",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3" style={{ color: GOLD_LIGHT, fontSize: "14px" }}>
                    <ArrowRight className="w-3.5 h-3.5 mt-1.5 shrink-0" />
                    <span style={{ color: CREAM, opacity: 0.85 }}>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function CaseStudy2() {
  return (
    <CaseStudy
      id="case-2"
      number="11"
      role="Video Production · CloudGo Project"
      context="Building a private anniversary video as a real communication tool."
      responsibilities={[
        "Interpreted the project requirement and communication purpose",
        "Built a visual direction suitable for an anniversary context",
        "Edited video footage into a coherent story flow",
        "Adjusted pacing, transitions, text and visuals for the final output",
        "Delivered a video product based on client/project expectations",
      ]}
      relevance="Video is not only a creative product — it is a communication tool that fits audience, occasion and brand context."
      reverse
      variant="dark"
      imageSlots="few"
    />
  );
}

export function CaseStudy3() {
  return (
    <CaseStudy
      id="case-3"
      number="13"
      role="Event Member · Academic Club"
      context="National Business Startup Competition — Season XI & XII operations."
      responsibilities={[
        "Supported event planning and on-site / operational preparation",
        "Prepared proposals, presentation slides, checklists and timelines",
        "Assisted with email communication and internal coordination",
        "Followed up event-related documents and working files",
        "Supported admin tasks: quotations, payment files, contract-related materials",
      ]}
      learned={[
        "Event execution readiness",
        "Documentation discipline",
        "Timeline & checklist mindset",
        "Coordination with multiple stakeholders",
      ]}
      relevance="Many marketing roles involve more than creative ideas. Campaigns, events and activations also need preparation, documentation, coordination and follow-up — the operational side of marketing work."
      variant="warm"
    />
  );
}

export function CaseStudy4() {
  return (
    <CaseStudy
      id="case-4"
      number="12"
      role="Marketing Assistant · Kim Oanh Group"
      context="Short-term exposure to corporate marketing in a real estate context."
      responsibilities={[
        "Supported marketing-related activities in a real estate business context",
        "Assisted with communication materials and implementation tasks",
        "Observed how marketing connects with business objectives and internal coordination",
        "Practiced responsibility, task follow-up and workplace communication",
      ]}
      relevance="Marketing requires both creativity and operational discipline. Even small support tasks need accuracy, timing and alignment."
      reverse
      variant="deep"
      imageSlots="few"
    />
  );
}

/* ─────────── 13. JD MATCHING ─────────── */
export function MatchingSection() {
  const rows = [
    ["Content creation & social media support", "Content ideas, fanpage copy, Canva design, short-form video editing"],
    ["Campaign support", "Visual materials, timeline follow-up, communication support"],
    ["Event / activation support", "Event ops, checklist, proposal, slide & email preparation"],
    ["Brand communication", "Visual consistency, tone of voice, storytelling & service-brand experience"],
    ["Marketing admin & documentation", "Event documents, quotations, payment files, contract-related exposure"],
    ["Cross-functional coordination", "Club teamwork, client projects, workplace communication"],
    ["English & Vietnamese communication", "Native VN · VSTEP B2 EN · improving workplace English"],
  ];
  return (
    <SectionShell id="matching" eyebrow="14 · Role Match" title="How my experience maps to marketing internships." variant="dark">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(40,24,14,0.4)",
          border: "1px solid rgba(212,165,95,0.18)",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] px-6 py-4"
          style={{
            background: "rgba(232,184,107,0.06)",
            borderBottom: "1px solid rgba(212,165,95,0.15)",
          }}
        >
          <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Marketing Internship Need
          </div>
          <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            My Relevant Readiness
          </div>
        </div>
        {rows.map(([need, ready], i) => (
          <FadeIn key={need} delay={i * 0.05}>
            <div
              className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-3 px-6 py-5"
              style={{
                borderBottom: i < rows.length - 1 ? "1px solid rgba(212,165,95,0.08)" : "none",
              }}
            >
              <div style={{ color: CREAM, fontSize: "14px" }}>{need}</div>
              <div className="flex items-start gap-2" style={{ color: MUTED, fontSize: "14px", lineHeight: 1.6 }}>
                <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0" style={{ color: GOLD_LIGHT }} />
                <span style={{ color: CREAM, opacity: 0.85 }}>{ready}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div
          className="mt-8 p-6 rounded-xl"
          style={{
            background: "linear-gradient(90deg, rgba(232,184,107,0.08), transparent)",
            borderLeft: `3px solid ${GOLD_LIGHT}`,
          }}
        >
          <div style={{ color: CREAM, lineHeight: 1.7, fontStyle: "italic" }}>
            "I am ready to start from execution, learn the brand and audience carefully, support
            daily marketing operations responsibly and gradually contribute more ideas as I
            understand the team's goals."
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}

/* ─────────── 14. ANALYSIS ─────────── */
export function AnalysisSection() {
  const pillars = [
    {
      icon: Lightbulb,
      title: "Message Clarity",
      desc: "Good marketing starts with a clear message: what we want people to understand, feel or do after seeing a piece of content.",
    },
    {
      icon: Palette,
      title: "Visual Consistency",
      desc: "Design, tone, format and mood should work together so the brand feels recognizable across posts, videos, slides and event materials.",
    },
    {
      icon: ListChecks,
      title: "Execution Readiness",
      desc: "Ideas become useful only when they can be delivered through timelines, checklists, revisions, coordination and final outputs.",
    },
  ];
  const ideas = [
    "Brand storytelling through short-form video",
    "Campaign materials adapted across social formats",
    "Event recap and behind-the-scenes content",
    "Educational posts that explain products or services simply",
    "Lifestyle content that connects brand messages with real customer moments",
    "Visual systems for consistent social media communication",
  ];
  return (
    <SectionShell id="analysis" eyebrow="15 · Marketing Lens" title="Turning ideas into useful marketing touchpoints." variant="warm">
      <div className="grid lg:grid-cols-3 gap-5 mb-12">
        {pillars.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <div
              className="p-7 rounded-2xl h-full relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(50,28,16,0.7), rgba(25,14,7,0.5))",
                border: "1px solid rgba(212,165,95,0.2)",
              }}
            >
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(232,184,107,0.15), transparent 70%)" }}
              />
              <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Pillar 0{i + 1}
              </div>
              <p.icon className="w-7 h-7 my-5" style={{ color: GOLD_LIGHT }} />
              <div style={{ color: CREAM, fontSize: "18px", fontWeight: 500 }} className="mb-3">
                {p.title}
              </div>
              <div style={{ color: MUTED, fontSize: "13px", lineHeight: 1.7 }}>{p.desc}</div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div
          className="p-7 rounded-2xl"
          style={{
            background: "rgba(40,24,14,0.4)",
            border: "1px solid rgba(212,165,95,0.15)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Lightbulb className="w-4 h-4" style={{ color: GOLD_LIGHT }} />
            <span style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Content Angles I'd Like to Explore
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {ideas.map((i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: GOLD_LIGHT, boxShadow: `0 0 6px ${GOLD_LIGHT}` }} />
                <span style={{ color: CREAM, fontSize: "14px", lineHeight: 1.6, opacity: 0.9 }}>{i}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}

/* ─────────── 15. WHY FIT ─────────── */
export function FitSection() {
  const contribute = [
    "Creating and refining visual/content materials",
    "Supporting campaign and event preparation",
    "Preparing slides, checklists, timelines and documentation",
    "Assisting with promotion-related communication",
    "Following up assigned tasks with responsibility",
    "Learning marketing through real business practice",
  ];
  const grow = [
    "Marketing planning and campaign execution",
    "Brand and consumer communication",
    "Content strategy and social media performance",
    "Event / activation execution standards",
    "Cross-functional coordination",
    "Professional English usage in the workplace",
  ];
  return (
    <SectionShell id="fit" eyebrow="16 · Mutual Fit" title="Why I fit this internship." variant="deep">
      <div className="grid lg:grid-cols-2 gap-6">
        <FadeIn>
          <div
            className="p-8 rounded-2xl h-full"
            style={{
              background: "linear-gradient(160deg, rgba(60,36,18,0.6), rgba(25,14,7,0.6))",
              border: "1px solid rgba(212,165,95,0.25)",
            }}
          >
            <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              I can contribute
            </div>
            <h3 className="mt-3 mb-6" style={{ color: CREAM, fontSize: "26px", fontWeight: 300 }}>
              What I bring on day one.
            </h3>
            <ul className="space-y-4">
              {contribute.map((c) => (
                <li key={c} className="flex items-start gap-3" style={{ color: CREAM, opacity: 0.9, lineHeight: 1.6 }}>
                  <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: GOLD_LIGHT }} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div
            className="p-8 rounded-2xl h-full"
            style={{
              background: "linear-gradient(160deg, rgba(25,14,7,0.6), rgba(60,36,18,0.5))",
              border: "1px solid rgba(212,165,95,0.25)",
            }}
          >
            <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              I hope to grow in
            </div>
            <h3 className="mt-3 mb-6" style={{ color: CREAM, fontSize: "26px", fontWeight: 300 }}>
              What I hope to grow in.
            </h3>
            <ul className="space-y-4">
              {grow.map((g) => (
                <li key={g} className="flex items-start gap-3" style={{ color: CREAM, opacity: 0.9, lineHeight: 1.6 }}>
                  <Sprout className="w-4 h-4 mt-1 shrink-0" style={{ color: GOLD_LIGHT }} />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <div
          className="mt-10 p-6 rounded-xl text-center max-w-3xl mx-auto"
          style={{
            background: "rgba(232,184,107,0.05)",
            border: "1px dashed rgba(232,184,107,0.3)",
          }}
        >
          <div style={{ color: CREAM, fontStyle: "italic", lineHeight: 1.7 }}>
            "I may still be early in my career, but I am serious about learning through real execution."
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}

/* ─────────── 16. CONTACT ─────────── */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex items-center px-6 md:px-12 lg:px-20 overflow-hidden py-24"
      style={{ background: "linear-gradient(180deg, rgba(26,13,5,0.88) 0%, rgba(13,6,2,0.92) 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(232,184,107,0.18), transparent 60%)",
        }}
      />
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 4,
            height: 4,
            background: GOLD_LIGHT,
            boxShadow: `0 0 10px ${GOLD_LIGHT}`,
            top: `${20 + i * 12}%`,
            left: `${10 + i * 14}%`,
          }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <div className="relative max-w-5xl mx-auto w-full text-center">
        <FadeIn>
          <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase" }}>
            17 · Thank You
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            className="mt-6 font-display title-gradient"
            style={{
              fontSize: "clamp(40px, 6.5vw, 80px)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
            }}
          >
            Let's create something
            <br />
            <span className="font-script title-italic-gold" style={{ fontWeight: 600 }}>clear, useful and memorable</span> together.
          </h2>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mt-8 max-w-xl mx-auto" style={{ color: MUTED, lineHeight: 1.7 }}>
            Available for internship opportunities in Ho Chi Minh City. I look forward to learning,
            supporting and contributing to marketing, content, event and brand communication work
            through real execution.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Mail, label: "Email", value: "tnguyen06.work@gmail.com", href: "mailto:tnguyen06.work@gmail.com" },
              { icon: Phone, label: "Phone", value: "0947 066 442", href: "tel:+84947066442" },
              { icon: Film, label: "TikTok", value: "Thảo Nguyên", href: "https://www.tiktok.com/@nzt.nguyen_?is_from_webapp=1&sender_device=pc" },
              { icon: FileSpreadsheet, label: "Resumé", value: "View on Drive", href: "https://drive.google.com/drive/folders/1OsA14M9CsTXR2L21dZB8Pxg15G0wTxrP?usp=sharing" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group p-5 rounded-xl text-left transition-all hover:-translate-y-1"
                style={{
                  background: "rgba(40,24,14,0.5)",
                  border: "1px solid rgba(212,165,95,0.2)",
                  display: "block",
                }}
              >
                <c.icon className="w-4 h-4 mb-3 transition-transform group-hover:scale-110" style={{ color: GOLD_LIGHT }} />
                <div style={{ color: GOLD, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {c.label}
                </div>
                <div
                  className="mt-1 flex items-center gap-1.5"
                  style={{ color: CREAM, fontSize: "13px" }}
                >
                  <span className="truncate group-hover:[color:var(--gold-light)]" style={{ ["--gold-light" as never]: GOLD_LIGHT }}>
                    {c.value}
                  </span>
                  <ArrowRight className="w-3 h-3 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ color: GOLD_LIGHT }} />
                </div>
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(212,165,95,0.15)" }}>
            <div style={{ color: MUTED, fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Nguyen Thi Thao Nguyen · Marketing Intern Portfolio · 2026
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

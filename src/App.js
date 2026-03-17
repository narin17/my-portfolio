import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Send,
  X,
} from "lucide-react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? "top");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

function useRevealOnScroll({ disabled }) {
  useEffect(() => {
    if (disabled) return;

    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [disabled]);
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const sections = useMemo(() => ["about", "projects", "skills", "contact"], []);
  const activeSection = useActiveSection(sections);
  useRevealOnScroll({ disabled: prefersReducedMotion });

  const projects = useMemo(
    () => [
      {
        title: "Blog Platform (Full‑stack)",
        description: "A full‑stack blog post app with database-backed content and an API-driven backend.",
        technologies: ["React", "Node.js", "PostgreSQL"],
        github: "https://github.com/narin17/Backend_Project_BlogPost",
        featured: true,
      },
      {
        title: "DBA Dashboard",
        description: "A dashboard for database operations and monitoring—built for practical DBA workflows.",
        technologies: ["Python", "PostgreSQL"],
        github: "https://github.com/narin17/DBA_Dashboard",
      },
      {
        title: "Web Scraping Automation",
        description: "Capstone project automating data entry from job listings using scraping + scripting.",
        technologies: ["Python"],
        github: "https://github.com/narin17/Web-Scraping-Capstone---Data-Entry-Job-Automation",
      },
      {
        title: "More on GitHub",
        description: "Explore more projects, experiments, and learning repos on my profile.",
        technologies: [],
        github: "https://github.com/narin17",
      },
    ],
    []
  );

  const skills = useMemo(
    () => [
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MySQL",
      "Sequelize",
      "Tailwind CSS",
      "Hadoop",
      "Git",
      "GitHub",
      "Excel",
    ],
    []
  );

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  const navItemClass = (id) =>
    cx(
      "text-sm font-medium transition-colors",
      activeSection === id
        ? "text-white"
        : "text-white/70 hover:text-white focus:text-white"
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400/30 selection:text-white">
      <div aria-hidden="true" className="bg-grid pointer-events-none fixed inset-0 opacity-60" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            aria-label="Scroll to top"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.7)]" />
            NR17
            <span className="text-white/40 transition group-hover:text-white/70">/ portfolio</span>
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {sections.map((id) => (
              <button key={id} onClick={() => scrollToSection(id)} className={navItemClass(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur md:hidden">
            <div className="mx-auto grid max-w-6xl gap-2">
              {sections.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={cx(
                    "rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white",
                    activeSection === id && "bg-white/10 text-white"
                  )}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <header className="relative pt-28 sm:pt-32">
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Open to internships & collaborations
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I’m{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                Un Titnarin
              </span>
              .
              <span className="block text-white/80">I build practical data + web projects.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">
              Data Science student with a strong programming foundation—focused on building clean interfaces,
              reliable backends, and data-driven tools that feel great to use.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
              >
                View projects{" "}
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Contact <Mail size={16} />
              </button>
              <div className="mt-2 flex items-center gap-4 sm:mt-0 sm:ml-2">
                <a
                  href="https://github.com/narin17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition hover:text-white"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/untithnarin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="mailto:untithnarin17@gmail.com"
                  className="text-white/70 transition hover:text-white"
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
                <a
                  href="https://t.me/untithnarin17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition hover:text-white"
                  aria-label="Telegram"
                >
                  <Send size={22} />
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Focus", value: "Data tools + web apps" },
                { label: "Strengths", value: "Clean UI, reliable backend" },
                { label: "Currently learning", value: "ML + data pipelines" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
                >
                  <div className="text-white/50">{item.label}</div>
                  <div className="mt-1 font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </header>

      <main className="pb-16">
        <section id="about" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8 sm:mt-20">
          <div data-reveal className="reveal grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">About</h2>
              <p className="mt-3 text-white/60">
                A quick snapshot of what I do and what I care about.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <p className="text-base leading-relaxed text-white/75 sm:text-lg">
                  I’m a passionate Data Science student with a strong foundation in programming and a keen
                  interest in developing innovative solutions. My journey started with web development, and
                  I’ve since expanded into data analysis and machine learning.
                </p>
                <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                  When I’m not coding, I enjoy exploring new technologies, contributing to open-source, and
                  collaborating with like-minded people. I’m always eager to learn and take on challenges that
                  push me to grow.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8 sm:mt-20">
          <div data-reveal className="reveal flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h2>
              <p className="mt-3 max-w-2xl text-white/60">
                A few highlights. Each project is built to learn something real—performance, architecture, or
                data workflows.
              </p>
            </div>
            <a
              href="https://github.com/narin17"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              View all <ExternalLink size={16} />
            </a>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                data-reveal
                className={cx(
                  "reveal rounded-3xl border bg-white/5 p-6 transition",
                  "border-white/10 hover:border-white/20 hover:bg-white/7",
                  "hover:-translate-y-0.5 hover:shadow-[0_12px_60px_rgba(0,0,0,0.35)]",
                  project.featured &&
                    "relative overflow-hidden border-cyan-400/30 bg-gradient-to-b from-cyan-400/10 via-white/5 to-white/5"
                )}
              >
                {project.featured && (
                  <div className="absolute right-4 top-4 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                    Featured
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white sm:text-2xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                  {project.description}
                </p>

                {project.technologies.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
                  >
                    <Github size={18} /> Code <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8 sm:mt-20">
          <div data-reveal className="reveal grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Skills</h2>
              <p className="mt-3 text-white/60">
                A practical toolkit—chosen for building real products and shipping reliably.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8 sm:mt-20">
          <div data-reveal className="reveal rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-white/5 p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Let’s build something</h2>
                <p className="mt-3 max-w-2xl text-white/70">
                  I’m open to new opportunities and collaborations. If you have a project idea, internship, or
                  just want to connect—send a message.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href="mailto:untithnarin17@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
                >
                  Email me <Mail size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/untithnarin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  LinkedIn <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/70">
              <a
                href="https://github.com/narin17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://t.me/untithnarin17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                <Send size={16} /> Telegram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 text-sm text-white/55 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} untithnarin. All rights reserved.</p>
          <p className="text-white/45">Built with React + Tailwind. Deployed anywhere.</p>
        </div>
      </footer>
    </div>
  );
}
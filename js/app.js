/**
 * Portfolio Application & GSAP Interactions
 * Features: Supabase CMS integration, Admin Dashboard, GSAP animations, and custom cursor.
 */

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
let siteInitialized = false;
let resizeTimer = null;

const defaultSite = {
  name: "Portfolio",
  initials: "PORTFOLIO",
  profile_image_url: "/assets/images/photo.png",
  about_short:
    "Designing and building high-performance, memorable web experiences with modern architecture and technical SEO precision.",
  about_lead:
    "A creative developer crafting refined digital products, interactive interfaces, and bespoke web platforms.",
  about_long:
    "Bridging the gap between engineering rigor and aesthetic craftsmanship. Specializing in high-performance web architecture, silky smooth micro-interactions, responsive fluidity, and technical search engine optimization.",
};

const defaultProjects = [
  {
    id: "p-1",
    title: "Apex Studio Platform",
    category: "Full Stack Application",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    live_url: "#contact",
    github_url: "https://github.com",
    thumbnail_url: "",
    published: true,
  },
  {
    id: "p-2",
    title: "Lumina Creative Agency",
    category: "Interactive Portfolio",
    technologies: ["React", "WebGL Canvas", "Motion", "Tailwind"],
    live_url: "#contact",
    github_url: "https://github.com",
    thumbnail_url: "",
    published: true,
  },
  {
    id: "p-3",
    title: "Aether SEO & Core Vitals",
    category: "Performance Dashboard",
    technologies: ["TypeScript", "Lighthouse API", "Next.js", "Tailwind"],
    live_url: "#contact",
    github_url: "https://github.com",
    thumbnail_url: "",
    published: true,
  },
  {
    id: "p-4",
    title: "Nova E-Commerce Engine",
    category: "Headless Commerce",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe API"],
    live_url: "#contact",
    github_url: "https://github.com",
    thumbnail_url: "",
    published: true,
  },
  {
    id: "p-5",
    title: "Verdant Design System",
    category: "UI/UX Framework",
    technologies: ["Figma Tokens", "React", "CSS Architecture", "Storybook"],
    live_url: "#contact",
    github_url: "https://github.com",
    thumbnail_url: "",
    published: true,
  },
];

const defaultServices = [
  {
    id: "s-1",
    title: "Full-Stack Web Development",
    description:
      "Architecting bespoke, production-ready web applications with React, Next.js, TypeScript, and clean modular backends. Engineered for blazing speed, enterprise-grade security, and effortless cloud scaling.",
    highlight:
      "Type-safe APIs · Zero-downtime deployments · Clean modular codebases",
    tags: [
      "Next.js / React 19",
      "TypeScript",
      "Node.js & Express",
      "Supabase / PostgreSQL",
      "REST & GraphQL",
      "CI/CD Workflows",
    ],
    icon: "↗",
  },
  {
    id: "s-2",
    title: "Technical SEO & Web Performance",
    description:
      "Maximizing organic search discoverability through rigorous semantic HTML5, automated schema markup (JSON-LD), crawl budget optimization, and sub-second Core Web Vitals performance tuning (LCP, INP, CLS).",
    highlight:
      "Sub-second LCP · 100/100 Lighthouse audits · Schema indexability",
    tags: [
      "Core Web Vitals",
      "Structured Data (JSON-LD)",
      "SSR / SSG Crawling",
      "Edge Caching & CDN",
      "Performance Auditing",
    ],
    icon: "↗",
  },
  {
    id: "s-3",
    title: "UI/UX & Interactive Design Systems",
    description:
      "Designing memorable digital interfaces, wireframes, and scalable design token systems in Figma and code. Focusing on micro-interaction physics, typography hierarchy, and WCAG AA accessibility compliance.",
    highlight:
      "Pixel-perfect Figma handoffs · Fluid design tokens · WCAG AA compliance",
    tags: [
      "Figma Design Systems",
      "Micro-Interactions",
      "WCAG AA Accessible",
      "Design Tokens",
      "Interactive Prototyping",
    ],
    icon: "↗",
  },
  {
    id: "s-4",
    title: "Creative Frontend & Motion Engineering",
    description:
      "Crafting fluid storytelling experiences, 60fps GSAP timelines, responsive canvas visualizers, and interactive digital branding that resonates deeply with audiences.",
    highlight:
      "Hardware-accelerated 60fps animations · Dynamic micro-interactions",
    tags: [
      "GSAP Timelines",
      "ScrollTrigger",
      "Micro-Physics",
      "WebGL / Canvas",
      "Interactive Branding",
    ],
    icon: "↗",
  },
  {
    id: "s-5",
    title: "Headless E-Commerce & Platform Solutions",
    description:
      "Developing conversion-focused headless storefronts, seamless payment gateway integrations with Stripe API, custom dashboard metrics, and automated customer workflows.",
    highlight:
      "Frictionless checkout UX · Secure webhooks · PCI-compliant flows",
    tags: [
      "Stripe Integration",
      "Headless Storefronts",
      "Conversion Rate Optimization",
      "Automated Workflows",
    ],
    icon: "↗",
  },
];

const defaultSkills = [
  { name: "Web Development", description: "Full-Stack & Frontend Engineering" },
  {
    name: "React.js",
    description: "Component architecture & state management",
  },
  { name: "Next.js", description: "SSR, ISR & Server Actions" },
  { name: "TypeScript", description: "Type-safe robust application logic" },
  {
    name: "JavaScript (ES6+)",
    description: "Core asynchronous programming & DOM",
  },
  {
    name: "HTML5 & Semantic SEO",
    description: "Accessible, crawlable structures",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first rapid responsive styling",
  },
  {
    name: "Technical SEO",
    description: "Indexing, crawl budget & schema markup",
  },
  {
    name: "Core Web Vitals",
    description: "LCP, FID/INP & CLS performance tuning",
  },
  {
    name: "GSAP & Web Animations",
    description: "High-performance 60fps animations",
  },
  { name: "Node.js & Express", description: "RESTful APIs & microservices" },
  {
    name: "Supabase & PostgreSQL",
    description: "Relational data & Auth schemas",
  },
  {
    name: "Figma UI/UX",
    description: "Design systems & interactive prototypes",
  },
  {
    name: "Git & GitHub Workflow",
    description: "Version control & CI/CD delivery",
  },
  {
    name: "Performance Auditing",
    description: "Lighthouse optimization & bundle splitting",
  },
  {
    name: "REST & GraphQL APIs",
    description: "API integration & state syncing",
  },
];

function escapeHtml(v = "") {
  return String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}

function escapeAttr(v = "") {
  return escapeHtml(v);
}

function showError(message) {
  console.error(message);
  const projects = $("#projects");
  if (projects && !projects.dataset.loaded) {
    projects.innerHTML =
      '<div class="empty-state">Unable to load content.<br>Please try again.</div>';
  }
}

/* ==========================================================================
   GSAP-POWERED PREMIUM CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  if (!finePointer || !window.gsap || reduceMotion) return;

  const cursorContainer = $(".custom-cursor");
  const cursorDot = $(".cursor-dot");
  const cursorRing = $(".cursor-ring");
  const cursorLabel = $(".cursor-label");

  if (!cursorContainer || !cursorDot || !cursorRing) return;
  if (cursorContainer.dataset.initialized === "1") return;
  cursorContainer.dataset.initialized = "1";

  // Center coordinate alignment
  gsap.set([cursorDot, cursorRing], {
    xPercent: -50,
    yPercent: -50,
    transformOrigin: "50% 50%",
    opacity: 0,
    scale: 1,
  });

  // High-performance quickTo setters for 60fps+ tracking
  const dotX = gsap.quickTo(cursorDot, "x", {
    duration: 0.12,
    ease: "power3.out",
  });
  const dotY = gsap.quickTo(cursorDot, "y", {
    duration: 0.12,
    ease: "power3.out",
  });
  const ringX = gsap.quickTo(cursorRing, "x", {
    duration: 0.36,
    ease: "power3.out",
  });
  const ringY = gsap.quickTo(cursorRing, "y", {
    duration: 0.36,
    ease: "power3.out",
  });

  let isVisible = false;
  let currentState = "normal";
  let isMouseDown = false;

  function setCursorState(state, labelText = "") {
    if (currentState === state && !labelText) return;
    currentState = state;

    cursorRing.classList.remove("is-hover", "is-view", "is-text");

    if (state === "view") {
      cursorRing.classList.add("is-view");
      if (cursorLabel) {
        cursorLabel.textContent = labelText || "VIEW";
      }

      gsap.to(cursorRing, {
        scale: isMouseDown ? 2.0 : 2.4,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(cursorDot, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        overwrite: "auto",
      });

      if (cursorLabel) {
        gsap.to(cursorLabel, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          delay: 0.05,
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
      }
    } else if (state === "hover") {
      cursorRing.classList.add("is-hover");

      gsap.to(cursorRing, {
        scale: isMouseDown ? 1.3 : 1.65,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(cursorDot, {
        scale: 0.3,
        opacity: 0.4,
        duration: 0.2,
        overwrite: "auto",
      });

      if (cursorLabel) {
        gsap.to(cursorLabel, {
          opacity: 0,
          scale: 0.6,
          duration: 0.15,
          overwrite: "auto",
        });
      }
    } else if (state === "text") {
      cursorRing.classList.add("is-text");

      gsap.to(cursorRing, {
        scale: isMouseDown ? 0.9 : 1.15,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(cursorDot, {
        scale: 1,
        opacity: 0.85,
        duration: 0.2,
        overwrite: "auto",
      });

      if (cursorLabel) {
        gsap.to(cursorLabel, {
          opacity: 0,
          scale: 0.6,
          duration: 0.15,
          overwrite: "auto",
        });
      }
    } else {
      // Normal state
      gsap.to(cursorRing, {
        scale: isMouseDown ? 0.85 : 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(cursorDot, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        overwrite: "auto",
      });

      if (cursorLabel) {
        gsap.to(cursorLabel, {
          opacity: 0,
          scale: 0.6,
          duration: 0.15,
          overwrite: "auto",
        });
      }
    }
  }

  // Window mouse movement with event delegation
  window.addEventListener(
    "mousemove",
    (e) => {
      const { clientX: x, clientY: y } = e;

      dotX(x);
      dotY(y);
      ringX(x);
      ringY(y);

      if (!isVisible) {
        isVisible = true;
        document.documentElement.classList.add("has-custom-cursor");
        gsap.to([cursorDot, cursorRing], {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Interactive target detection via event delegation
      const target = e.target;
      if (!target) return;

      const projectCard = target.closest(
        ".project__visual, [data-cursor='view']",
      );
      if (projectCard) {
        const customLabel =
          projectCard.getAttribute("data-cursor-label") || "VIEW";
        setCursorState("view", customLabel);
        return;
      }

      const interactiveEl = target.closest(
        "a, button, .magnetic, .button, .admin-action, [data-cursor='pointer'], input[type='submit'], input[type='button'], .admin-password-toggle, .admin-modal-close, select, [role='button'], .menu-toggle, .admin-login-link, .admin-back",
      );
      if (interactiveEl) {
        setCursorState("hover");
        return;
      }

      const textEl = target.closest(
        "p, h1, h2, h3, .section-title, .hero__title, .about__content, .lead, textarea, input:not([type='submit']):not([type='button'])",
      );
      if (textEl) {
        setCursorState("text");
        return;
      }

      setCursorState("normal");
    },
    { passive: true },
  );

  window.addEventListener(
    "mousedown",
    () => {
      isMouseDown = true;
      if (currentState === "view") {
        gsap.to(cursorRing, {
          scale: 1.9,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (currentState === "hover") {
        gsap.to(cursorRing, {
          scale: 1.3,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to([cursorDot, cursorRing], {
          scale: 0.8,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
    { passive: true },
  );

  window.addEventListener(
    "mouseup",
    () => {
      isMouseDown = false;
      setCursorState(currentState);
    },
    { passive: true },
  );

  window.addEventListener(
    "mouseleave",
    () => {
      isVisible = false;
      gsap.to([cursorDot, cursorRing], {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    },
    { passive: true },
  );

  window.addEventListener(
    "mouseenter",
    () => {
      isVisible = true;
      gsap.to([cursorDot, cursorRing], {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    },
    { passive: true },
  );
}

/* ==========================================================================
   Hero Role Typewriter Animation (Web Developer ↔ SEO Specialist)
   ========================================================================== */
function initHeroRoleTypewriter() {
  const roleEl = document.getElementById("hero-typing-role");
  if (!roleEl) return;
  if (roleEl.dataset.typewriterReady === "1") return;
  roleEl.dataset.typewriterReady = "1";

  const roles = ["Web Developer", "SEO Specialist"];
  let roleIndex = 0;
  let currentText = roleEl.textContent ? roleEl.textContent.trim() : roles[0];
  let isDeleting = false;
  let timerId = null;

  if (!currentText || !roles.includes(currentText)) {
    currentText = roles[0];
    roleEl.textContent = currentText;
  }
  roleIndex = roles.indexOf(currentText);
  if (roleIndex === -1) roleIndex = 0;

  function tick() {
    const targetRole = roles[roleIndex];

    if (isDeleting) {
      currentText = targetRole.substring(0, currentText.length - 1);
      roleEl.textContent = currentText;

      if (currentText.length === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timerId = setTimeout(tick, 320);
        return;
      }

      const eraseDelay = 45 + Math.floor(Math.random() * 20);
      timerId = setTimeout(tick, eraseDelay);
    } else {
      currentText = targetRole.substring(0, currentText.length + 1);
      roleEl.textContent = currentText;

      if (currentText === targetRole) {
        isDeleting = true;
        timerId = setTimeout(tick, 2800);
        return;
      }

      const typeDelay = 65 + Math.floor(Math.random() * 20);
      timerId = setTimeout(tick, typeDelay);
    }
  }

  timerId = setTimeout(() => {
    isDeleting = true;
    tick();
  }, 2800);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (timerId) clearTimeout(timerId);
    } else {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(tick, 500);
    }
  });
}

/* ==========================================================================
   Dynamic Content Animation
   ========================================================================== */
function animateDynamic() {
  if (!window.gsap) return;
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();

  $$(".reveal").forEach((el) => {
    if (el.dataset.animated === "1") return;
    el.dataset.animated = "1";

    if (reduceMotion) {
      gsap.set(el, { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo(
      el,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      },
    );
  });

  if (window.ScrollTrigger) {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
}

function projectCard(project, index, total) {
  const large = index % 3 === 0;
  const visual = project.thumbnail_url
    ? `<img src="${escapeAttr(project.thumbnail_url)}" alt="${escapeAttr(project.title)}" loading="lazy">`
    : `<div class="project__art-content"><span>${escapeHtml((project.title || "Project").slice(0, 12).toUpperCase())}</span><small>${escapeHtml(project.category || "PROJECT")}</small></div>`;

  const links = [
    project.live_url
      ? `<a href="${escapeAttr(project.live_url)}" target="_blank" rel="noopener noreferrer">Live ↗</a>`
      : "",
    project.github_url
      ? `<a href="${escapeAttr(project.github_url)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`
      : "",
    project.project_file_url
      ? `<a href="${escapeAttr(project.project_file_url)}" target="_blank" rel="noopener noreferrer" download>Download Project ↗</a>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  return `<article class="project ${large ? "project--large" : ""} reveal">
    <a href="${project.live_url ? escapeAttr(project.live_url) : "#contact"}" ${project.live_url ? 'target="_blank" rel="noreferrer"' : ""} class="project__visual" aria-label="${escapeAttr(project.title)}" data-cursor="view" data-cursor-label="VIEW">
      <span class="project__badge">${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span><span class="project__open">↗</span>
      <div class="project__art">${visual}</div>
    </a>
    <div class="project__meta">
      <div>
        <h3>${escapeHtml(project.title)}</h3>
        <span>${escapeHtml(project.category || "")}</span>
        ${links ? `<div class="project__links">${links}</div>` : ""}
      </div>
      <span>${escapeHtml((project.technologies || []).join(" • "))}</span>
    </div>
  </article>`;
}

function renderSkillsMarquee(skills) {
  const track = $("#marquee-track");
  if (!track) return;
  const list = skills && skills.length ? skills : defaultSkills;
  const items = list
    .map((x) => `<span>${escapeHtml(x.name.toUpperCase())}</span><i>✦</i>`)
    .join("");
  // Duplicate for seamless 100% marquee scroll loop
  track.innerHTML = items + items;
}

async function loadPublicContent() {
  fillSiteText();

  let projects = defaultProjects;
  let skills = defaultSkills;
  let services = defaultServices;

  if (isConfigured()) {
    try {
      const [projectsRes, skillsRes, servicesRes, settingsRes] =
        await Promise.all([
          supabase
            .from("projects")
            .select("*")
            .eq("published", true)
            .order("display_order", { ascending: true })
            .order("created_at", { ascending: false }),
          supabase
            .from("skills")
            .select("*")
            .eq("published", true)
            .order("display_order", { ascending: true })
            .order("created_at", { ascending: false }),
          supabase
            .from("services")
            .select("*")
            .eq("published", true)
            .order("display_order", { ascending: true })
            .order("created_at", { ascending: false }),
          supabase
            .from("site_settings")
            .select("*")
            .order("created_at", { ascending: true })
            .limit(1),
        ]);

      if (
        !projectsRes.error &&
        projectsRes.data &&
        projectsRes.data.length > 0
      ) {
        projects = projectsRes.data;
      }
      if (!skillsRes.error && skillsRes.data && skillsRes.data.length > 0) {
        skills = skillsRes.data;
      }
      if (
        !servicesRes.error &&
        servicesRes.data &&
        servicesRes.data.length > 0
      ) {
        services = servicesRes.data;
      }

      const settings = settingsRes.error ? null : settingsRes.data?.[0] || null;
      if (settings) {
        Object.assign(defaultSite, settings);
        fillSiteText();
        if (settings.profile_image_url) {
          const img = $(".portrait-image");
          if (img) img.src = settings.profile_image_url;
        }
      }
    } catch (e) {
      console.warn("Supabase fetch notice (using defaults):", e);
    }
  }

  // Render Projects
  const p = $("#projects");
  if (p) {
    p.dataset.loaded = "1";
    p.innerHTML = projects.length
      ? projects.map((x, i) => projectCard(x, i, projects.length)).join("")
      : '<div class="empty-state">No projects published yet.</div>';
  }

  // Render Services
  const sList = $("#services-list");
  if (sList) {
    sList.innerHTML = services.length
      ? services
          .map((x, i) => {
            const tagsHtml =
              x.tags && x.tags.length
                ? `<div class="service__tags">${x.tags.map((t) => `<span class="service__tag">${escapeHtml(t)}</span>`).join("")}</div>`
                : "";
            const highlightHtml = x.highlight
              ? `<div class="service__highlight"><span>✦</span> ${escapeHtml(x.highlight)}</div>`
              : "";

            return `<article class="service reveal">
            <span class="service__number">${String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>${escapeHtml(x.title)}</h3>
              <p>${escapeHtml(x.description || "")}</p>
              ${highlightHtml}
              ${tagsHtml}
            </div>
            <span class="service__arrow">${escapeHtml(x.icon || "↗")}</span>
          </article>`;
          })
          .join("")
      : '<div class="empty-state">No services published yet.</div>';
  }

  // Render Skills
  const skList = $("#skills-list");
  if (skList) {
    skList.innerHTML = skills.length
      ? skills
          .map(
            (x) =>
              `<span class="skill-pill reveal" title="${escapeAttr(x.description || "")}">${escapeHtml(x.name)}</span>`,
          )
          .join("")
      : '<div class="empty-state">No skills published yet.</div>';
  }

  // Render Marquee
  renderSkillsMarquee(skills);

  // Update Stats
  $$('[data-stat="projects"]').forEach(
    (el) => (el.textContent = projects.length),
  );
  $$('[data-stat="skills"]').forEach((el) => (el.textContent = skills.length));
  $$('[data-stat="services"]').forEach(
    (el) => (el.textContent = services.length),
  );
  $$('[data-stat="messages"]').forEach((el) => (el.textContent = "100%"));

  animateStatCounters();
  animateDynamic();
  initProjectTilt();
}

function initProjectTilt() {
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  $$(".project__visual").forEach((project) => {
    if (project.dataset.tilted === "1") return;
    project.dataset.tilted = "1";

    if (!finePointer || !window.gsap) return;

    const art = project.querySelector(".project__art");
    if (!art) return;

    project.addEventListener("mousemove", (e) => {
      const r = project.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(art, {
        x: x * 14,
        y: y * 14,
        duration: 0.45,
        ease: "power2.out",
        overwrite: true,
      });
    });

    project.addEventListener("mouseleave", () =>
      gsap.to(art, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      }),
    );
  });
}

async function submitContact(e) {
  e.preventDefault();
  const status = $("#contact-status");
  const form = e.currentTarget;
  const button = form.querySelector("button");

  if (!isConfigured()) {
    status.textContent =
      "Configure Supabase in js/supabase.js before sending messages.";
    status.className = "form-status error";
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  if (data.message.trim().length < 10) {
    status.textContent = "Please enter at least 10 characters.";
    status.className = "form-status error";
    return;
  }

  button.disabled = true;
  status.textContent = "Sending...";
  status.className = "form-status";

  try {
    const { error } = await supabase.from("messages").insert({
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    });
    if (error) throw error;
    form.reset();
    status.textContent = "Message sent successfully.";
    status.className = "form-status success";
  } catch (err) {
    if (err?.code === "PGRST205") {
      status.textContent =
        "Contact form is not configured yet. Run the Supabase portfolio migration.";
    } else if (err?.code === "42501") {
      status.textContent =
        "Contact form permissions are not configured yet. Check the Supabase RLS policy.";
    } else {
      status.textContent = "Unable to send your message. Please try again.";
    }
    status.className = "form-status error";
    console.error(err);
  } finally {
    button.disabled = false;
  }
}

function initInteractions() {
  if (siteInitialized) return;
  siteInitialized = true;

  // Initialize Custom Cursor
  initCustomCursor();

  const header = $(".nav");
  if (window.ScrollTrigger) {
    ScrollTrigger.create({
      start: "top -40",
      onUpdate: (self) =>
        header?.classList.toggle("scrolled", self.scroll() > 40),
    });
  }

  // Magnetic effects for fine pointers
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  if (finePointer && window.gsap) {
    $$(".magnetic").forEach((el) => {
      if (el.dataset.magnetic === "1") return;
      el.dataset.magnetic = "1";

      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * 0.14,
          y: (e.clientY - r.top - r.height / 2) * 0.14,
          duration: 0.25,
          overwrite: true,
        });
      });

      el.addEventListener("mouseleave", () =>
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "elastic.out(1, .45)",
          overwrite: true,
        }),
      );
    });
  }

  const toggle = $(".menu-toggle");
  const menu = $(".nav__links");

  if (toggle && menu && toggle.dataset.bound !== "1") {
    toggle.dataset.bound = "1";

    const closeMenu = () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
      menu.classList.add("open");
      toggle.classList.add("open");
      document.body.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    const toggleMenu = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const isCurrentlyOpen = menu.classList.contains("open");
      if (isCurrentlyOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    toggle.addEventListener("click", toggleMenu);

    $$(".nav__links a").forEach((a) => {
      a.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        closeMenu();
      }
    });

    document.addEventListener("click", (e) => {
      if (menu.classList.contains("open")) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          closeMenu();
        }
      }
    });

    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (window.innerWidth > 800) closeMenu();
          if (window.ScrollTrigger) ScrollTrigger.refresh();
        }, 120);
      },
      { passive: true },
    );
  }

  if (window.gsap && !reduceMotion) {
    gsap.to(".ambient-a", {
      x: 80,
      y: 100,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".ambient-b", {
      x: -100,
      y: -80,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".orbit--one", {
      rotation: 360,
      duration: 24,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".orbit--two", {
      rotation: -360,
      duration: 30,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".orbit--three", {
      rotation: -360,
      duration: 36,
      repeat: -1,
      ease: "none",
    });
  }

  const cardWrap = $(".hero-card-wrap");
  if (cardWrap && window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.to(cardWrap, {
      y: -35,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-card-wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Initialize GSAP Timelines
  initHeroMasterTimeline();
  initAboutTimeline();
  initServicesTimeline();

  $("#contact-form")?.addEventListener("submit", submitContact);

  initProjectTilt();
  animateDynamic();
}

/* ==========================================================================
   Master GSAP Timelines
   ========================================================================== */
function initHeroMasterTimeline() {
  if (!window.gsap || reduceMotion) {
    initHeroPhotoAnimation();
    return;
  }

  const masterTl = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.1,
  });

  // 1. Navigation Header Timeline Reveal
  const nav = $(".nav");
  const brand = $(".brand");
  const navLinks = $$(".nav__links a");
  const navCta = $(".nav__cta");

  if (nav) {
    masterTl.fromTo(
      nav,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 },
    );
  }

  if (brand || navLinks.length) {
    masterTl.fromTo(
      [brand, ...navLinks, navCta].filter(Boolean),
      { y: -12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
      "-=0.6",
    );
  }

  // 2. Hero Section Eyebrow, Title lines & CTAs
  const eyebrow = $(".hero .eyebrow");
  const lineStatic = $(".hero__line--static");
  const lineDynamic = $(".hero__line--dynamic");
  const heroCopy = $(".hero__copy");
  const heroActions = $(".hero__actions");

  if (eyebrow) {
    masterTl.fromTo(
      eyebrow,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75 },
      "-=0.5",
    );
  }

  if (lineStatic && lineDynamic) {
    masterTl.fromTo(
      [lineStatic, lineDynamic],
      { y: 46, opacity: 0, rotationX: 10, transformOrigin: "50% 100%" },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.95,
        ease: "power4.out",
        stagger: 0.12,
      },
      "-=0.5",
    );
  }

  if (heroCopy) {
    masterTl.fromTo(
      heroCopy,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75 },
      "-=0.6",
    );
  }

  if (heroActions) {
    masterTl.fromTo(
      heroActions,
      { y: 20, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
      "-=0.55",
    );
  }

  // 3. Coordinate Hero Photo entrance
  masterTl.add(() => {
    initHeroPhotoAnimation();
  }, "-=0.6");
}

function initAboutTimeline() {
  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

  const aboutSection = $("#about");
  if (!aboutSection) return;

  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSection,
      start: "top 78%",
      toggleActions: "play reverse play reverse",
      invalidateOnRefresh: true,
    },
    defaults: { ease: "power3.out" },
  });

  const label = $("#about .section-label");
  const title = $("#about .section-title");
  const contentItems = $$("#about .about__content > *");
  const pillars = $$("#about .about-pillar");

  if (label) {
    aboutTl.fromTo(
      label,
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.6 },
    );
  }

  if (title) {
    aboutTl.fromTo(
      title,
      { y: 38, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85 },
      "-=0.35",
    );
  }

  if (contentItems.length) {
    aboutTl.fromTo(
      contentItems,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
      "-=0.55",
    );
  }

  if (pillars.length) {
    aboutTl.fromTo(
      pillars,
      { y: 36, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.14,
        ease: "power2.out",
      },
      "-=0.45",
    );
  }

  // Animated Stats Counter Timeline on scroll
  const statsWrap = $("#about .stats");
  if (statsWrap) {
    ScrollTrigger.create({
      trigger: statsWrap,
      start: "top 85%",
      toggleActions: "play reverse play reverse",
      invalidateOnRefresh: true,
      onEnter: () => {
        animateStatCounters();
      },
    });
  }
}

function animateStatCounters() {
  if (!window.gsap || reduceMotion) return;

  const statEls = $$(".stat strong");
  statEls.forEach((el) => {
    const rawVal = el.textContent.trim();
    const hasPercent = rawVal.includes("%");
    const num = parseInt(rawVal, 10);
    if (isNaN(num)) return;

    const counterObj = { val: 0 };
    gsap.to(counterObj, {
      val: num,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(counterObj.val) + (hasPercent ? "%" : "");
      },
    });
  });
}

function initServicesTimeline() {
  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

  const servicesSection = $("#services");
  if (!servicesSection) return;

  const servicesTl = gsap.timeline({
    scrollTrigger: {
      trigger: servicesSection,
      start: "top 76%",
      toggleActions: "play reverse play reverse",
      invalidateOnRefresh: true,
    },
    defaults: { ease: "power3.out" },
  });

  const label = $("#services .section-label");
  const title = $("#services .section-title");

  if (label) {
    servicesTl.fromTo(
      label,
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.6 },
    );
  }

  if (title) {
    servicesTl.fromTo(
      title,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.35",
    );
  }
}

/* ==========================================================================
   Premium Hero Profile Photo Animation System
   ========================================================================== */
function initBinaryPortrait(img) {
  const portrait = img.closest(".hero-card__portrait");
  const canvas = portrait?.querySelector(".portrait-binary-canvas");
  if (!portrait || !canvas || canvas.dataset.initialized === "1") return canvas;

  canvas.dataset.initialized = "1";
  const context = canvas.getContext("2d", { alpha: true });
  const source = document.createElement("canvas");
  const sourceContext = source.getContext("2d", { willReadFrequently: true });
  const binaryChars = "0101010011010110";

  const draw = () => {
    if (!img.naturalWidth || !img.naturalHeight) return;

    const portraitRect = portrait.getBoundingClientRect();
    const imageRect = img.getBoundingClientRect();
    const width = Math.max(1, Math.round(portraitRect.width));
    const height = Math.max(1, Math.round(portraitRect.height));
    const imageLeft = imageRect.left - portraitRect.left;
    const imageTop = imageRect.top - portraitRect.top;
    const imageWidth = Math.max(1, imageRect.width);
    const imageHeight = Math.max(1, imageRect.height);
    const sourceWidth = Math.max(1, Math.round(imageWidth));
    const sourceHeight = Math.max(1, Math.round(imageHeight));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.left = "0px";
    canvas.style.top = "0px";

    source.width = sourceWidth;
    source.height = sourceHeight;
    sourceContext.clearRect(0, 0, sourceWidth, sourceHeight);
    sourceContext.drawImage(img, 0, 0, sourceWidth, sourceHeight);
    const pixels = sourceContext.getImageData(
      0,
      0,
      sourceWidth,
      sourceHeight,
    ).data;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = '500 5px "Space Grotesk", monospace';

    const cell = Math.max(3.2, Math.min(4.6, width / 54));
    for (let y = cell / 2; y < height; y += cell) {
      for (let x = cell / 2; x < width; x += cell) {
        const inImage =
          x >= imageLeft &&
          x < imageLeft + imageWidth &&
          y >= imageTop &&
          y < imageTop + imageHeight;
        const px = Math.min(width - 1, Math.floor(x));
        const py = Math.min(height - 1, Math.floor(y));
        let luminance = 0.08;
        let red = 8;
        let green = 54;
        let blue = 31;

        if (inImage) {
          const sourceX = Math.min(
            sourceWidth - 1,
            Math.floor(((x - imageLeft) * sourceWidth) / imageWidth),
          );
          const sourceY = Math.min(
            sourceHeight - 1,
            Math.floor(((y - imageTop) * sourceHeight) / imageHeight),
          );
          const index = (sourceY * sourceWidth + sourceX) * 4;
          red = pixels[index];
          green = pixels[index + 1];
          blue = pixels[index + 2];
          const alpha = pixels[index + 3] / 255;
          if (alpha < 0.05) continue;
          luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
        }

        const character = binaryChars[(px * 7 + py * 13) % binaryChars.length];
        const brightness = 0.28 + luminance * 0.72;
        const hue =
          luminance > 0.58
            ? "#8aff9a"
            : luminance > 0.3
              ? "#38d86a"
              : "#087a4b";
        context.fillStyle = `${hue}${Math.round((0.5 + brightness * 0.5) * 255)
          .toString(16)
          .padStart(2, "0")}`;
        context.fillText(character, x, y);
      }
    }
  };

  const redraw = () => requestAnimationFrame(draw);
  const loadSource = () => {
    redraw();
    if (typeof img.decode === "function")
      img
        .decode()
        .then(redraw)
        .catch(() => {});
  };
  if (img.complete && img.naturalWidth) loadSource();
  else img.addEventListener("load", loadSource, { once: true });
  requestAnimationFrame(() => {
    if (img.naturalWidth) redraw();
  });
  window.setTimeout(() => {
    if (img.naturalWidth) draw();
  }, 250);
  window.setTimeout(() => {
    if (img.naturalWidth) draw();
  }, 900);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(redraw).observe(img);
  } else {
    window.addEventListener("resize", redraw, { passive: true });
  }
  return canvas;
}

function initHeroPhotoAnimation() {
  const cardWrap = $(".hero-card-wrap");
  const card = $(".hero-card");
  const img = $(".portrait-image");
  if (!card || !img) return;
  if (card.dataset.photoAnimInit === "1") return;
  card.dataset.photoAnimInit = "1";
  const binaryCanvas = initBinaryPortrait(img);

  // 1. INITIAL PHOTO ENTRANCE: opacity 0 -> 1, scale 0.96 -> 1, duration ~1.1s
  if (!reduceMotion && window.gsap) {
    gsap.fromTo(
      binaryCanvas || img,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
        onComplete: () => {
          // 2. FLOATING EFFECT: Continuous subtle floating (3-5px) smoothly in a slow 4.5s loop
          startFloatingEffect();
        },
      },
    );
  } else {
    img.style.opacity = "1";
    img.style.transform = "scale(1)";
  }

  function startFloatingEffect() {
    if (reduceMotion || !window.gsap) return;
    gsap.to(binaryCanvas || img, {
      y: -5,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  // 3. CURSOR INTERACTION, 3D TILT, PARALLAX & RADIAL GLOW
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  if (!finePointer || reduceMotion || !window.gsap || !cardWrap) return;

  let isHovered = false;

  cardWrap.addEventListener("mouseenter", () => {
    isHovered = true;
    card.classList.add("is-hovering");
  });

  cardWrap.addEventListener(
    "mousemove",
    (e) => {
      if (!isHovered) {
        isHovered = true;
        card.classList.add("is-hovering");
      }

      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Update CSS variables for soft radial highlight tracking
      card.style.setProperty("--mouse-x", `${mouseX}px`);
      card.style.setProperty("--mouse-y", `${mouseY}px`);

      // Normalized coordinates (-1 to 1) relative to card center
      const normX = Math.max(-1, Math.min(1, (mouseX / rect.width - 0.5) * 2));
      const normY = Math.max(-1, Math.min(1, (mouseY / rect.height - 0.5) * 2));

      // Subtle 3D tilt: max ~3.5 to 4.5 degrees
      const rotY = normX * 4.5;
      const rotX = -normY * 3.5;

      // Subtle 3D movement: max ~5 to 6px
      const moveX = normX * 6;
      const moveY = normY * 5;

      gsap.to(card, {
        x: moveX,
        y: moveY,
        rotationX: rotX,
        rotationY: rotY,
        scale: 1.01,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    { passive: true },
  );

  cardWrap.addEventListener("mouseleave", () => {
    isHovered = false;
    card.classList.remove("is-hovering");

    // 7. EXIT ANIMATION: Smoothly return to resting position
    gsap.to(card, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.65,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
}

function fillSiteText() {
  const s = defaultSite;
  $$("[data-about-short]").forEach((x) => (x.textContent = s.about_short));
  $$("[data-about-lead]").forEach((x) => (x.textContent = s.about_lead));
  $$("[data-about-long]").forEach((x) => (x.textContent = s.about_long));
  $$("[data-site-name]").forEach((x) => (x.textContent = s.name));
  $$("[data-site-initials]").forEach((x) => (x.textContent = s.initials));
  const socialLinks = [
    ["[data-social-github]", s.github_url],
    ["[data-social-linkedin]", s.linkedin_url],
    ["[data-social-instagram]", s.instagram_url],
  ];
  socialLinks.forEach(([selector, url]) => {
    $$(selector).forEach((link) => {
      link.hidden = !url;
      if (url) link.href = url;
    });
  });
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ==========================================================================
   Single Admin Router / Auth Controller
   ========================================================================== */
window.__openAdminDirect = function (event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  try {
    location.hash = "#admin";
  } catch (e) {
    console.warn("Admin hash navigation failed", e);
  }
  return false;
};

const AdminRouter = (() => {
  let initialized = false;
  const BUCKET = "portfolio-assets";
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const state = {
    projects: [],
    services: [],
    skills: [],
    messages: [],
    media: [],
    settings: null,
    session: null,
    activeView: "overview",
    editingId: null,
    editingType: null,
    selectedFile: null,
  };

  function els() {
    return {
      panel: $("#admin-panel"),
      login: $("#admin-login-view"),
      dashboard: $("#admin-dashboard"),
      form: $("#admin-login-form"),
      status: $("#admin-login-status"),
      submit: $("#admin-login-form button[type='submit']"),
      logout: $("#admin-logout"),
      user: $("#admin-user-label"),
      sidebar: $(".admin-sidebar"),
    };
  }

  function setPublicVisible(visible) {
    ["main", ".site-header", ".footer"].forEach((sel) => {
      const el =
        sel === "main"
          ? document.querySelector("main")
          : document.querySelector(sel);
      if (el) el.hidden = !visible;
    });
  }

  function showShell(show) {
    const { panel } = els();
    if (!panel) return;
    panel.hidden = !show;
    setPublicVisible(!show);
    if (show) window.scrollTo(0, 0);
  }

  function status(message = "", type = "") {
    const el = els().status;
    if (el) {
      el.textContent = message;
      el.className = "admin-status" + (type ? " " + type : "");
    }
  }

  function toast(message, type = "success") {
    const el = $("#admin-toast");
    if (!el) return;
    el.textContent = message;
    el.className = "admin-toast show " + type;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 3000);
  }

  function setAuthUI(session) {
    const { login, dashboard, user } = els();
    if (!login || !dashboard) return;
    const loggedIn = !!session;
    state.session = session;
    login.hidden = loggedIn;
    login.classList.toggle("is-visible", !loggedIn);
    dashboard.hidden = !loggedIn;
    if (loggedIn && user)
      user.textContent = session.user?.email || "Administrator";
  }

  async function ensureAdmin() {
    if (!isConfigured())
      throw new Error(
        "Supabase is not configured. Add your project URL and anon key.",
      );
    const { data, error } = await supabase.rpc("is_admin");
    if (error)
      throw new Error(
        "Admin authorization is not configured in Supabase yet. Run supabase/migrations/001_portfolio_cms.sql first.",
      );
    if (data !== true)
      throw new Error("This account is not authorized as an administrator.");
    return true;
  }

  function activateView(view) {
    state.activeView = view;
    $$("[data-admin-section]").forEach((s) =>
      s.classList.toggle("is-visible", s.dataset.adminSection === view),
    );
    $$("[data-admin-view]").forEach((b) =>
      b.classList.toggle("is-active", b.dataset.adminView === view),
    );
    const title =
      {
        overview: "Overview",
        projects: "Projects",
        services: "Services",
        skills: "Skills",
        media: "Media Library",
        settings: "Site Settings",
        messages: "Contact Messages",
      }[view] || "Overview";

    $("#admin-view-title").textContent = title;
    els().sidebar?.classList.remove("open");

    if (view === "projects") renderProjects();
    if (view === "services") renderServices();
    if (view === "skills") renderSkills();
    if (view === "messages") renderMessages();
    if (view === "media") renderMedia();
    if (view === "settings") fillSettings();
  }

  async function loadAdminData() {
    await ensureAdmin();
    const [p, s, k, m, settings] = await Promise.all([
      supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),
      supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),
      supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),
      supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("site_settings")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(1),
    ]);

    for (const r of [p, s, k, m, settings]) if (r.error) throw r.error;

    state.projects = (p.data || []).map((project) => ({
      ...project,
      live_url: project.live_url || project.project_url || null,
    }));
    state.services = s.data || [];
    state.skills = k.data || [];
    state.messages = m.data || [];
    state.settings = settings.data?.[0] || null;

    updateStats();
    fillSettings();
    await loadMedia();
    renderCurrent();
  }

  function updateStats() {
    $("#admin-stat-projects").textContent = state.projects.filter(
      (x) => x.published !== false,
    ).length;
    $("#admin-stat-services").textContent = state.services.filter(
      (x) => x.published !== false,
    ).length;
    $("#admin-stat-skills").textContent = state.skills.filter(
      (x) => x.published !== false,
    ).length;
    $("#admin-stat-messages").textContent = state.messages.length;
  }

  function renderCurrent() {
    if (state.activeView === "projects") renderProjects();
    if (state.activeView === "services") renderServices();
    if (state.activeView === "skills") renderSkills();
    if (state.activeView === "media") renderMedia();
    if (state.activeView === "messages") renderMessages();
    if (state.activeView === "settings") fillSettings();
  }

  function safeDate(v) {
    return v ? new Date(v).toLocaleDateString() : "—";
  }

  function renderProjects() {
    const q = ($("#admin-project-search")?.value || "").toLowerCase();
    const list = state.projects.filter((x) =>
      [x.title, x.category, x.description].join(" ").toLowerCase().includes(q),
    );
    $("#admin-project-count").textContent =
      `${list.length} of ${state.projects.length}`;
    $("#admin-project-list").innerHTML = list.length
      ? list
          .map((p) => {
            const live = p.live_url || p.project_url;
            const github = p.github_url;
            const file = p.project_file_url;
            const fileName = p.project_file_name || "Project file";
            return `<div class="admin-row">
            <div class="admin-row-main">
              ${p.thumbnail_url ? `<img class="admin-thumb" src="${escapeAttr(p.thumbnail_url)}" alt="">` : ``}
              <span class="admin-row-title">${escapeHtml(p.title || "Untitled")}</span>
              <div class="admin-row-meta">
                ${escapeHtml(p.category || "Project")} · ${p.published === false ? "Draft" : "Published"} · order ${p.display_order ?? 0}
                ${live ? ` · <a href="${escapeAttr(live)}" target="_blank" rel="noopener noreferrer">Live ↗</a>` : ""}
                ${github ? ` · <a href="${escapeAttr(github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : ""}
                ${file ? ` · <a href="${escapeAttr(file)}" target="_blank" rel="noopener noreferrer">${escapeHtml(fileName)} ↗</a>` : ""}
              </div>
            </div>
            <div class="admin-row-actions">
              <button class="admin-action" data-edit-project="${escapeAttr(p.id)}">Edit</button>
              <button class="admin-action" data-project-image="${escapeAttr(p.id)}">Image</button>
              <button class="admin-action" data-project-link="${escapeAttr(p.id)}">Project Link</button>
              <button class="admin-action" data-project-github="${escapeAttr(p.id)}">GitHub</button>
              <button class="admin-action" data-project-file="${escapeAttr(p.id)}">Upload File</button>
              ${file ? `<button type="button" class="admin-action danger" data-delete-project-file="${escapeAttr(p.id)}">Delete File</button>` : ""}
              <button type="button" class="admin-action danger" data-delete-project="${escapeAttr(p.id)}">Delete</button>
            </div>
          </div>`;
          })
          .join("")
      : `<div class="admin-empty">No projects found.</div>`;
  }

  function renderServices() {
    const list = state.services;
    $("#admin-service-list").innerHTML = list.length
      ? list
          .map(
            (x) =>
              `<div class="admin-row"><div class="admin-row-main"><span class="admin-row-title">${escapeHtml(x.title || "Untitled")}</span><div class="admin-row-meta">${escapeHtml(x.description || "")} · ${x.published === false ? "Draft" : "Published"}</div></div><div class="admin-row-actions"><button class="admin-action" data-edit-service="${escapeAttr(x.id)}">Edit</button><button type="button" class="admin-action danger" data-delete-service="${escapeAttr(x.id)}">Delete</button></div></div>`,
          )
          .join("")
      : `<div class="admin-empty">No services found.</div>`;
  }

  function renderSkills() {
    const list = state.skills;
    $("#admin-skill-list").innerHTML = list.length
      ? list
          .map(
            (x) =>
              `<div class="admin-row"><div class="admin-row-main"><span class="admin-row-title">${escapeHtml(x.name || "Unnamed skill")}</span><div class="admin-row-meta">${escapeHtml(x.description || "")} · ${x.published === false ? "Draft" : "Published"}</div></div><div class="admin-row-actions"><button class="admin-action" data-edit-skill="${escapeAttr(x.id)}">Edit</button><button type="button" class="admin-action danger" data-delete-skill="${escapeAttr(x.id)}">Delete</button></div></div>`,
          )
          .join("")
      : `<div class="admin-empty">No skills found.</div>`;
  }

  function renderMessages() {
    const list = state.messages;
    $("#admin-message-list").innerHTML = list.length
      ? list
          .map(
            (m) =>
              `<div class="admin-row"><div class="admin-row-main"><span class="admin-row-title">${escapeHtml(m.subject || "No subject")}</span><div class="admin-row-meta">${escapeHtml(m.name || "")} · ${escapeHtml(m.email || "")} · ${safeDate(m.created_at)}</div><p class="admin-muted" style="margin-top:8px">${escapeHtml(m.message || "")}</p></div><div class="admin-row-actions"><button type="button" class="admin-action danger" data-delete-message="${escapeAttr(m.id)}" onclick="event.stopPropagation(); window.__deleteMessageFromButton(this)">Delete</button></div></div>`,
          )
          .join("")
      : `<div class="admin-empty">No messages.</div>`;
  }

  function openContentModal(type, id = null) {
    state.editingType = type;
    state.editingId = id;
    const modal = $("#admin-modal");
    const form = $("#admin-content-form");
    const row = id
      ? state[type + "s"].find((x) => String(x.id) === String(id))
      : null;

    $("#admin-modal-kicker").textContent = id ? "EDIT" : "CREATE";
    $("#admin-modal-title").textContent = (id ? "Edit " : "Add ") + type;

    if (type === "project") {
      form.innerHTML = `
        <div class="admin-form-grid">
          <label>Title<input name="title" required maxlength="160" value="${escapeAttr(row?.title || "")}"></label>
          <label>Category<input name="category" value="${escapeAttr(row?.category || "")}"></label>
        </div>
        <label>Description<textarea name="description">${escapeHtml(row?.description || "")}</textarea></label>
        <label>Technologies<input name="technologies" value="${escapeAttr((row?.technologies || []).join(", "))}" placeholder="HTML, CSS, JavaScript"></label>
        <div class="admin-form-grid">
          <label>Live Project URL<input name="live_url" type="text" inputmode="url" autocomplete="url" placeholder="https://example.com" value="${escapeAttr(row?.live_url || row?.project_url || "")}"></label>
          <label>GitHub URL<input name="github_url" type="text" inputmode="url" autocomplete="url" placeholder="https://github.com/username/repo" value="${escapeAttr(row?.github_url || "")}"></label>
        </div>
        <div class="admin-form-grid">
          <label>Display order<input name="display_order" type="number" value="${Number(row?.display_order || 0)}"></label>
          <label class="admin-checkbox"><input name="published" type="checkbox" ${row?.published !== false ? "checked" : ""}> Published</label>
        </div>
        <label>Project image<input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml"></label>
        <img class="admin-image-preview" id="admin-content-image-preview" src="${escapeAttr(row?.thumbnail_url || "")}" style="${row?.thumbnail_url ? "display:block" : ""}" alt="Current project image">
        <div class="admin-project-file-panel">
          <strong>Project File</strong>
          ${row?.project_file_url ? `<p class="admin-muted">Current: <a href="${escapeAttr(row.project_file_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(row.project_file_name || "Download file")}</a></p><button type="button" class="admin-action danger" data-modal-delete-project-file="${escapeAttr(row.id)}">Remove current file</button>` : `<p class="admin-muted">No project file uploaded. Use the Upload File action after saving the project.</p>`}
        </div>
        <button class="button" type="submit">${id ? "Save changes" : "Create project"} <span>↗</span></button>
        <p id="admin-content-status" class="admin-status"></p>
      `;
    }

    if (type === "service") {
      form.innerHTML = `
        <label>Title<input name="title" required maxlength="160" value="${escapeAttr(row?.title || "")}"></label>
        <label>Description<textarea name="description">${escapeHtml(row?.description || "")}</textarea></label>
        <div class="admin-form-grid">
          <label>Icon<input name="icon" maxlength="20" value="${escapeAttr(row?.icon || "↗")}"></label>
          <label>Display order<input name="display_order" type="number" value="${Number(row?.display_order || 0)}"></label>
        </div>
        <label class="admin-checkbox"><input name="published" type="checkbox" ${row?.published !== false ? "checked" : ""}> Published</label>
        <button class="button" type="submit">${id ? "Save changes" : "Create service"} <span>↗</span></button>
        <p id="admin-content-status" class="admin-status"></p>
      `;
    }

    if (type === "skill") {
      form.innerHTML = `
        <label>Name<input name="name" required maxlength="120" value="${escapeAttr(row?.name || "")}"></label>
        <label>Description<textarea name="description">${escapeHtml(row?.description || "")}</textarea></label>
        <div class="admin-form-grid">
          <label>Display order<input name="display_order" type="number" value="${Number(row?.display_order || 0)}"></label>
          <label class="admin-checkbox"><input name="published" type="checkbox" ${row?.published !== false ? "checked" : ""}> Published</label>
        </div>
        <button class="button" type="submit">${id ? "Save changes" : "Create skill"} <span>↗</span></button>
        <p id="admin-content-status" class="admin-status"></p>
      `;
    }

    modal.hidden = false;
    const image = form.querySelector('input[type="file"]');
    image?.addEventListener("change", () =>
      previewFile(image.files[0], $("#admin-content-image-preview")),
    );
  }

  function closeContentModal() {
    $("#admin-modal").hidden = true;
    state.editingId = null;
    state.editingType = null;
  }

  async function saveContent(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const type = state.editingType;
    const id = state.editingId;
    const statusEl = $("#admin-content-status");
    if (!type) return;

    const values = Object.fromEntries(new FormData(form).entries());
    const table = type + "s";

    try {
      statusEl.textContent = "Saving...";
      let payload;

      if (type === "project") {
        const liveUrl = normalizeProjectUrl(values.live_url);
        const githubUrl = String(values.github_url || "").trim();
        payload = {
          title: String(values.title).trim(),
          category: String(values.category || "").trim(),
          description: String(values.description || "").trim(),
          technologies: String(values.technologies || "")
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
          live_url: liveUrl,
          project_url: liveUrl,
          github_url: githubUrl ? normalizeProjectUrl(githubUrl) : null,
          published: !!form.elements.published.checked,
          display_order: Number(values.display_order || 0),
        };
      }

      if (type === "service") {
        payload = {
          title: String(values.title).trim(),
          description: String(values.description || "").trim(),
          icon: String(values.icon || "↗").trim(),
          published: form.elements.published.checked,
          display_order: Number(values.display_order || 0),
        };
      }

      if (type === "skill") {
        payload = {
          name: String(values.name).trim(),
          description: String(values.description || "").trim(),
          published: form.elements.published.checked,
          display_order: Number(values.display_order || 0),
        };
      }

      let saved;
      if (id) {
        const r = await supabase
          .from(table)
          .update(payload)
          .eq("id", id)
          .select()
          .single();
        if (r.error) throw r.error;
        saved = r.data;
      } else {
        const r = await supabase.from(table).insert(payload).select().single();
        if (r.error) throw r.error;
        saved = r.data;
      }

      if (type === "project" && form.elements.image.files[0]) {
        const oldUrl = id
          ? state.projects.find((x) => x.id === id)?.thumbnail_url
          : null;
        const uploaded = await uploadToStorage(
          form.elements.image.files[0],
          "projects",
        );
        const r = await supabase
          .from("projects")
          .update({ thumbnail_url: uploaded.url })
          .eq("id", saved.id);
        if (r.error) {
          await removeStoragePath(uploaded.path);
          throw r.error;
        }
        if (oldUrl) await removeStorageUrl(oldUrl);
        saved.thumbnail_url = uploaded.url;
      }

      state[table] = state[table].filter(
        (x) => String(x.id) !== String(saved.id),
      );
      state[table].push(saved);
      state[table].sort(
        (a, b) => (a.display_order || 0) - (b.display_order || 0),
      );

      closeContentModal();
      updateStats();
      renderCurrent();
      await loadPublicContent();
      toast(type + " saved successfully.");
    } catch (err) {
      console.error(err);
      statusEl.textContent = err.message || "Unable to save.";
      statusEl.className = "admin-status error";
    }
  }

  const PROJECT_FILE_MAX_SIZE = 50 * 1024 * 1024;

  function validateFile(file, mode = "image") {
    if (!file) throw new Error("Choose a file first.");
    if (mode === "project-file") {
      const name = String(file.name || "").toLowerCase();
      const allowed = [
        "application/zip",
        "application/x-zip-compressed",
        "application/octet-stream",
        "application/pdf",
        "text/plain",
        "application/json",
      ];
      const extensionAllowed = /\.(zip|pdf|txt|json|rar|7z)$/i.test(name);
      if (!allowed.includes(file.type) && !extensionAllowed) {
        throw new Error(
          "Project file type not supported. Use ZIP, PDF, TXT, JSON, RAR, or 7Z.",
        );
      }
      if (file.size > PROJECT_FILE_MAX_SIZE)
        throw new Error("Project file is too large. Maximum size is 50MB.");
      return;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
    if (!allowed.includes(file.type))
      throw new Error("File type not supported. Use JPG, PNG, WebP, or SVG.");
    if (file.size > MAX_FILE_SIZE)
      throw new Error("File is too large. Maximum size is 10MB.");
  }

  function slugName(name) {
    return (
      name
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "") || "file"
    );
  }

  function normalizeProjectUrl(value) {
    const raw = String(value || "").trim();
    if (!raw) return null;
    const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw)
      ? raw
      : `https://${raw}`;
    try {
      const url = new URL(withProtocol);
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
        throw new Error();
      }
      return url.href;
    } catch {
      throw new Error(
        "Enter a valid project URL, for example https://example.com",
      );
    }
  }

  async function uploadToStorage(
    file,
    folder = "general",
    existingPath = null,
    options = {},
  ) {
    validateFile(
      file,
      options.mode === "project-file" ? "project-file" : "image",
    );
    const sessionResult = await supabase.auth.getSession();
    if (sessionResult.error) throw sessionResult.error;
    if (!sessionResult.data?.session)
      throw new Error("Your admin session has expired. Please log in again.");

    const randomId =
      window.crypto && typeof window.crypto.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const path = existingPath || `${folder}/${randomId}-${slugName(file.name)}`;
    const uploadPromise = supabase.storage.from(BUCKET).upload(path, file, {
      upsert: !!existingPath,
      contentType: file.type || "application/octet-stream",
      cacheControl: "3600",
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () =>
          reject(
            new Error(
              "Upload timed out. Check Supabase Storage, RLS policies, and your internet connection.",
            ),
          ),
        45000,
      );
    });

    const { error } = await Promise.race([uploadPromise, timeoutPromise]);
    if (error) {
      if (/bucket.*not found/i.test(error.message || "")) {
        throw new Error(
          `Storage bucket \"${BUCKET}\" was not found. Create the portfolio-assets bucket in Supabase Storage.`,
        );
      }
      if (
        /row-level security|permission|not authorized|unauthorized/i.test(
          error.message || "",
        )
      ) {
        throw new Error(
          "Storage permission denied. Make sure you are logged in as the authorized admin and the portfolio-assets Storage policies are installed.",
        );
      }
      throw error;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    if (!data?.publicUrl)
      throw new Error(
        "Upload succeeded, but Supabase did not return a public URL.",
      );
    return {
      path,
      url: data.publicUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  function storagePathFromUrl(url) {
    try {
      const u = new URL(url);
      const marker = `/storage/v1/object/public/${BUCKET}/`;
      const i = u.pathname.indexOf(marker);
      return i >= 0
        ? decodeURIComponent(u.pathname.slice(i + marker.length))
        : null;
    } catch {
      return null;
    }
  }

  async function removeStoragePath(path) {
    if (!path) return;
    const sessionResult = await supabase.auth.getSession();
    if (sessionResult.error) throw sessionResult.error;
    if (!sessionResult.data?.session)
      throw new Error("Your admin session has expired. Please log in again.");

    const { data, error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) {
      console.error("Storage remove failed", { path, error });
      if (
        /row-level security|permission|not authorized|unauthorized/i.test(
          error.message || "",
        )
      ) {
        throw new Error(
          "Delete permission denied. Run the latest storage policy migration in Supabase and make sure you are logged in as an admin.",
        );
      }
      throw error;
    }
    const removed = Array.isArray(data) ? data : [];
    if (removed.length === 0) {
      throw new Error(`Supabase did not delete the file: ${path}`);
    }
    return removed[0];
  }

  async function removeStorageUrl(url) {
    const path = storagePathFromUrl(url);
    if (path) await removeStoragePath(path);
  }

  async function loadMedia() {
    const folders = ["projects", "services", "profile", "general"];
    const all = [];
    for (const folder of folders) {
      const { data, error } = await supabase.storage.from(BUCKET).list(folder, {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });
      if (error) {
        console.warn("Media folder list failed", folder, error);
        continue;
      }
      for (const f of data || []) {
        if (!f.name || f.id === null) continue;
        const path = `${folder}/${f.name}`;
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        all.push({
          name: f.name,
          path,
          folder,
          url: pub.publicUrl,
          size: f.metadata?.size || 0,
          type: f.metadata?.mimetype || "",
          created_at: f.created_at || f.updated_at,
        });
      }
    }
    state.media = all;
  }

  function formatBytes(n) {
    if (!n) return "—";
    const u = ["B", "KB", "MB", "GB"];
    let i = 0,
      x = n;
    while (x >= 1024 && i < u.length - 1) {
      x /= 1024;
      i++;
    }
    return `${x.toFixed(i ? 1 : 0)} ${u[i]}`;
  }

  function renderMedia() {
    const q = ($("#admin-media-search")?.value || "").toLowerCase();
    const filter = $("#admin-media-filter")?.value || "all";
    let list = state.media.filter((x) => x.name.toLowerCase().includes(q));
    if (filter === "image")
      list = list.filter((x) => x.type.startsWith("image/"));
    else if (["projects", "profile", "general"].includes(filter))
      list = list.filter((x) => x.folder === filter);

    $("#admin-media-list").innerHTML = list.length
      ? list
          .map(
            (x) => `
        <article class="admin-media-card">
          <div class="admin-media-preview">
            ${x.type.startsWith("image/") ? `<img src="${escapeAttr(x.url)}" alt="${escapeAttr(x.name)}" loading="lazy">` : `<span class="admin-media-file">FILE</span>`}
          </div>
          <div class="admin-media-info">
            <div class="admin-media-name" title="${escapeAttr(x.name)}">${escapeHtml(x.name)}</div>
            <div class="admin-media-meta">${escapeHtml(x.folder)} · ${formatBytes(x.size)} · ${safeDate(x.created_at)}</div>
            <div class="admin-media-actions">
              <button class="admin-action" data-media-preview="${escapeAttr(x.url)}">Preview</button>
              <button class="admin-action" data-media-copy="${escapeAttr(x.url)}">Copy URL</button>
              <button class="admin-action" data-media-replace="${escapeAttr(x.path)}">Replace</button>
              <button type="button" class="admin-action admin-danger" data-media-delete="${escapeAttr(x.path)}" onclick="event.stopPropagation(); window.__deleteMediaFromButton(this)">Delete</button>
            </div>
          </div>
        </article>
      `,
          )
          .join("")
      : `<div class="admin-empty" style="grid-column:1/-1">No files found.</div>`;
  }

  function openUpload(opts = {}) {
    resetUpload();
    $("#admin-upload-modal").hidden = false;
    const kind = opts.kind || "general";
    $("#admin-upload-kind").value = kind;
    if (opts.projectId) $("#admin-upload-project-id").value = opts.projectId;

    const project = opts.projectId
      ? state.projects.find((x) => String(x.id) === String(opts.projectId))
      : null;
    const linkFields = $("#admin-project-link-fields");
    const dropzone = $("#admin-dropzone");
    const fileInput = $("#admin-file-input");
    const chooseBtn = $("#admin-choose-file");
    const submitBtn = $("#admin-upload-submit");
    const projectInput = $("#admin-upload-project-id");
    const isProject =
      kind === "project" || kind === "project-file" || kind === "project-link";
    const isLink = kind === "project-link";

    if (projectInput) {
      projectInput.disabled = !isProject;
      projectInput.required = isProject;
      projectInput.placeholder = isProject
        ? "Automatically selected from the project card"
        : "Only needed for a project upload";
    }
    if (linkFields) linkFields.hidden = !isLink;
    if (dropzone) dropzone.hidden = isLink;
    if (fileInput) fileInput.disabled = isLink;
    if (chooseBtn) chooseBtn.disabled = isLink;
    if (submitBtn) submitBtn.textContent = isLink ? "Save Links" : "Upload";

    if (isLink) {
      $("#admin-project-live-url").value =
        project?.live_url || project?.project_url || "";
      $("#admin-project-github-url").value = project?.github_url || "";
      $("#admin-upload-title").textContent = "Add Project Links";
    } else if (kind === "project-file") {
      $("#admin-upload-title").textContent = "Upload Project File";
    } else {
      $("#admin-upload-title").textContent = "Upload Portfolio File";
    }

    if (opts.replacePath) {
      $("#admin-upload-form").dataset.replacePath = opts.replacePath;
    } else {
      delete $("#admin-upload-form").dataset.replacePath;
    }
  }

  function closeUpload() {
    $("#admin-upload-modal").hidden = true;
    resetUpload();
  }

  function resetUpload() {
    const form = $("#admin-upload-form");
    form?.reset();
    delete form?.dataset.replacePath;
    state.selectedFile = null;
    const preview = $("#admin-upload-preview");
    const progress = $("#admin-upload-progress");
    const statusEl = $("#admin-upload-status");

    if (preview) {
      preview.src = "";
      preview.style.display = "none";
    }
    if (progress) {
      progress.style.display = "none";
      progress.querySelector("i").style.width = "0";
    }
    if (statusEl) {
      statusEl.textContent = "";
      statusEl.className = "admin-upload-status";
    }
    $("#admin-file-selected").textContent = "";
    const linkFields = $("#admin-project-link-fields");
    const dropzone = $("#admin-dropzone");
    const fileInput = $("#admin-file-input");
    const chooseBtn = $("#admin-choose-file");
    const submitBtn = $("#admin-upload-submit");
    if (linkFields) linkFields.hidden = true;
    if (dropzone) dropzone.hidden = false;
    if (fileInput) fileInput.disabled = false;
    if (chooseBtn) chooseBtn.disabled = false;
    if (submitBtn) submitBtn.textContent = "Upload";
  }

  function previewFile(file, img) {
    if (!file || !img) return;
    const url = URL.createObjectURL(file);
    img.src = url;
    img.style.display = "block";
    img.onload = () => URL.revokeObjectURL(url);
  }

  function chooseFile(file) {
    try {
      const kind = $("#admin-upload-kind")?.value || "general";
      validateFile(file, kind === "project-file" ? "project-file" : "image");
      state.selectedFile = file;
      $("#admin-file-selected").textContent =
        `${file.name} · ${formatBytes(file.size)} · ${file.type}`;
      if (file.type.startsWith("image/"))
        previewFile(file, $("#admin-upload-preview"));
    } catch (e) {
      state.selectedFile = null;
      $("#admin-file-selected").textContent = "";
      $("#admin-upload-status").textContent = e.message;
      $("#admin-upload-status").className = "admin-upload-status error";
    }
  }

  async function submitUpload(e) {
    e.preventDefault();
    const file = state.selectedFile;
    const statusEl = $("#admin-upload-status");
    const progress = $("#admin-upload-progress");
    const bar = progress?.querySelector("i");
    const submitBtn = $("#admin-upload-submit");
    if (!file) {
      statusEl.textContent = "Choose a file first.";
      statusEl.className = "admin-upload-status error";
      return;
    }

    const kind = $("#admin-upload-kind").value;
    const projectId = $("#admin-upload-project-id").value.trim();
    const form = $("#admin-upload-form");

    try {
      if (
        kind === "project" ||
        kind === "project-file" ||
        kind === "project-link"
      ) {
        if (!projectId)
          throw new Error(
            "Open this action from a project card so the project is selected automatically.",
          );
        if (!state.projects.some((x) => String(x.id) === projectId))
          throw new Error("Selected project was not found.");
      }

      if (kind === "project-link") {
        const liveUrl = normalizeProjectUrl($("#admin-project-live-url").value);
        const githubRaw = $("#admin-project-github-url").value.trim();
        const githubUrl = githubRaw ? normalizeProjectUrl(githubRaw) : null;
        if (!liveUrl && !githubUrl)
          throw new Error("Add at least a Live Project URL or GitHub URL.");

        statusEl.textContent = "Saving...";
        statusEl.className = "admin-upload-status";
        if (progress) {
          progress.style.display = "block";
          if (bar) bar.style.width = "40%";
        }
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Saving…";
        }

        const r = await supabase
          .from("projects")
          .update({
            live_url: liveUrl,
            project_url: liveUrl,
            github_url: githubUrl,
          })
          .eq("id", projectId)
          .select()
          .single();
        if (r.error) throw r.error;

        const project = state.projects.find((x) => String(x.id) === projectId);
        if (project) Object.assign(project, r.data);
        if (bar) bar.style.width = "100%";
        statusEl.textContent = "✓ Project links saved successfully";
        statusEl.className = "admin-upload-status success";
        renderCurrent();
        await loadPublicContent();
        toast("Project links saved successfully.");
        setTimeout(closeUpload, 700);
        return;
      }

      statusEl.textContent = "Uploading...";
      statusEl.className = "admin-upload-status";
      if (progress) progress.style.display = "block";
      if (bar) bar.style.width = "10%";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Uploading…";
      }

      const current = state.settings?.profile_image_url || null;
      let existingPath = form.dataset.replacePath || null;
      const project = projectId
        ? state.projects.find((x) => String(x.id) === projectId)
        : null;

      if (kind === "project-file") {
        existingPath = existingPath || project?.project_file_path || null;
        const path =
          existingPath || `projects/${projectId}/files/${slugName(file.name)}`;
        const uploaded = await uploadToStorage(file, "projects", path, {
          mode: "project-file",
        });
        if (bar) bar.style.width = "75%";

        const r = await supabase
          .from("projects")
          .update({
            project_file_path: uploaded.path,
            project_file_url: uploaded.url,
            project_file_name: file.name,
            project_file_size: file.size,
          })
          .eq("id", projectId)
          .select()
          .single();

        if (r.error) {
          if (!existingPath) await removeStoragePath(uploaded.path);
          throw r.error;
        }

        if (
          project?.project_file_path &&
          project.project_file_path !== uploaded.path &&
          existingPath !== project.project_file_path
        ) {
          await removeStoragePath(project.project_file_path);
        }
        Object.assign(project, r.data);
      } else {
        const folder =
          kind === "project"
            ? "projects"
            : kind === "profile"
              ? "profile"
              : "general";
        if (kind === "profile" && !existingPath)
          existingPath = storagePathFromUrl(current) || null;

        const uploaded = await uploadToStorage(file, folder, existingPath);
        if (bar) bar.style.width = "75%";

        if (kind === "profile") {
          const payload = { profile_image_url: uploaded.url };
          let r;
          if (state.settings?.id)
            r = await supabase
              .from("site_settings")
              .update(payload)
              .eq("id", state.settings.id);
          else
            r = await supabase
              .from("site_settings")
              .insert({
                ...payload,
                name: defaultSite.name,
                initials: defaultSite.initials,
              })
              .select()
              .single();
          if (r.error) throw r.error;
          state.settings = {
            ...(state.settings || {}),
            ...(r.data || payload),
          };
          if (current && current !== uploaded.url && !existingPath)
            await removeStorageUrl(current);
          applyProfileImage(uploaded.url);
        } else if (kind === "project") {
          const r = await supabase
            .from("projects")
            .update({ thumbnail_url: uploaded.url })
            .eq("id", projectId);
          if (r.error) {
            if (!existingPath) await removeStoragePath(uploaded.path);
            throw r.error;
          }
          if (
            project?.thumbnail_url &&
            project.thumbnail_url !== uploaded.url &&
            !existingPath
          )
            await removeStorageUrl(project.thumbnail_url);
          if (project) project.thumbnail_url = uploaded.url;
        }
      }

      if (bar) bar.style.width = "100%";
      statusEl.textContent = "✓ File uploaded successfully";
      statusEl.className = "admin-upload-status success";
      await loadMedia();
      updateStats();
      renderCurrent();
      await loadPublicContent();
      toast("File uploaded successfully.");
      setTimeout(closeUpload, 700);
    } catch (err) {
      console.error(err);
      if (bar) bar.style.width = "0";
      statusEl.textContent = "✕ " + (err.message || "Upload failed");
      statusEl.className = "admin-upload-status error";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Upload";
      }
    }
  }

  function applyProfileImage(url) {
    const img = $(".portrait-image");
    if (img) img.src = url;
  }

  function fillSettings() {
    const form = $("#admin-settings-form");
    if (!form) return;
    const s = state.settings || {};
    for (const n of [
      "name",
      "initials",
      "github_url",
      "linkedin_url",
      "instagram_url",
      "about_short",
      "about_lead",
      "about_long",
      "contact_note",
    ]) {
      if (form.elements[n]) form.elements[n].value = s[n] || "";
    }
    const img = $("#admin-profile-photo");
    if (img) {
      img.src = s.profile_image_url || $(".portrait-image")?.src || "";
      img.style.display = img.src ? "block" : "none";
    }
  }

  async function saveSettings(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const statusEl = $("#admin-settings-status");
    const payload = {
      name: form.elements.name.value.trim() || "Portfolio",
      initials: form.elements.initials.value.trim() || "PORTFOLIO",
      github_url: form.elements.github_url.value.trim() || null,
      linkedin_url: form.elements.linkedin_url.value.trim() || null,
      instagram_url: form.elements.instagram_url.value.trim() || null,
      about_short: form.elements.about_short.value.trim(),
      about_lead: form.elements.about_lead.value.trim(),
      about_long: form.elements.about_long.value.trim(),
      contact_note: form.elements.contact_note.value.trim(),
    };

    try {
      statusEl.textContent = "Saving...";
      let r;
      if (state.settings?.id) {
        r = await supabase
          .from("site_settings")
          .update(payload)
          .eq("id", state.settings.id)
          .select()
          .single();
      } else {
        r = await supabase
          .from("site_settings")
          .insert(payload)
          .select()
          .single();
      }
      if (r.error) throw r.error;
      state.settings = r.data;
      fillSiteText();
      fillSettings();
      statusEl.textContent = "Settings saved.";
      statusEl.className = "admin-status success";
      toast("Settings saved.");
      await loadPublicContent();
    } catch (err) {
      statusEl.textContent = err.message || "Unable to save settings.";
      statusEl.className = "admin-status error";
    }
  }

  async function deleteRow(table, id) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const r = await supabase.from(table).delete().eq("id", id);
    if (r.error) throw r.error;
    state[table] = state[table].filter((x) => String(x.id) !== String(id));
    updateStats();
    renderCurrent();
    toast("Deleted successfully.");
  }

  async function deleteProjectFile(id) {
    const project = state.projects.find((x) => String(x.id) === String(id));
    if (!project?.project_file_path && !project?.project_file_url) return;
    if (
      !confirm(
        `Delete the project file for "${project.title || "this project"}"?`,
      )
    )
      return;
    try {
      if (project.project_file_path)
        await removeStoragePath(project.project_file_path);
      else if (project.project_file_url)
        await removeStorageUrl(project.project_file_url);
      const r = await supabase
        .from("projects")
        .update({
          project_file_path: null,
          project_file_url: null,
          project_file_name: null,
          project_file_size: null,
        })
        .eq("id", id)
        .select()
        .single();
      if (r.error) throw r.error;
      Object.assign(project, r.data);
      await loadMedia();
      renderProjects();
      await loadPublicContent();
      toast("Project file deleted.");
    } catch (err) {
      console.error(err);
      toast(err.message || "Unable to delete project file.", "error");
    }
  }

  async function deleteProject(id) {
    if (!confirm("Delete this project and its image reference?")) return;
    const p = state.projects.find((x) => String(x.id) === String(id));
    const r = await supabase.from("projects").delete().eq("id", id);
    if (r.error) throw r.error;
    if (p?.thumbnail_url) await removeStorageUrl(p.thumbnail_url);
    if (p?.project_file_path) await removeStoragePath(p.project_file_path);
    else if (p?.project_file_url) await removeStorageUrl(p.project_file_url);
    state.projects = state.projects.filter((x) => String(x.id) !== String(id));
    await loadMedia();
    updateStats();
    renderProjects();
    toast("Project deleted.");
  }

  window.__deleteMediaFromButton = async function (button) {
    const path = button?.dataset?.mediaDelete;
    if (path) await deleteMedia(path);
  };
  window.__deleteMessageFromButton = async function (button) {
    const id = button?.dataset?.deleteMessage;
    if (!id || !confirm("Delete this message?")) return;
    const r = await supabase.from("messages").delete().eq("id", id);
    if (r.error) throw r.error;
    state.messages = state.messages.filter((x) => String(x.id) !== String(id));
    updateStats();
    renderMessages();
    toast("Message deleted.");
  };

  async function deleteMedia(path) {
    if (!path || !confirm("Are you sure you want to delete this file?")) return;
    const btn = document.querySelector(
      `[data-media-delete="${CSS.escape(path)}"]`,
    );
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Deleting…";
    }
    try {
      await removeStoragePath(path);
      state.media = state.media.filter((x) => x.path !== path);
      renderMedia();
      toast("File deleted.");
    } catch (err) {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Delete";
      }
      throw err;
    }
  }

  async function route() {
    const isAdmin = location.hash.toLowerCase() === "#admin";
    showShell(isAdmin);
    if (!isAdmin) return;

    if (!isConfigured()) {
      setAuthUI(null);
      status(
        "Supabase is not configured. Please add your Supabase URL and anon key.",
        "error",
      );
      return;
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      setAuthUI(data.session || null);
      if (data.session) {
        await loadAdminData();
        status("");
      }
    } catch (error) {
      console.error("Admin session check failed:", error);
      setAuthUI(null);
      status(error.message || "Unable to check admin session.", "error");
    }
  }

  function openFromClick(event) {
    event.preventDefault();
    event.stopPropagation();
    els().sidebar?.classList.remove("open");
    document.body.classList.remove("menu-open");
    try {
      location.hash = "#admin";
    } catch (e) {
      console.warn("Admin navigation fallback:", e);
      showShell(true);
      route();
    }
  }

  async function login(event) {
    event.preventDefault();
    const { form, submit } = els();
    if (!form) return;

    if (!isConfigured()) {
      status(
        "Supabase is not configured. Please add your Supabase URL and anon key.",
        "error",
      );
      return;
    }

    const values = Object.fromEntries(new FormData(form).entries());
    const original = submit?.innerHTML || "Sign in";
    if (submit) {
      submit.disabled = true;
      submit.innerHTML = "Signing in...";
    }
    status("Signing in...");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: String(values.email).trim(),
        password: String(values.password),
      });
      if (error) throw error;
      await ensureAdmin();
      setAuthUI(data.session);
      status("Signed in successfully.", "success");
      await loadAdminData();
      toast("Welcome to your Admin Dashboard.");
    } catch (error) {
      await supabase.auth.signOut().catch(() => {});
      console.error("Admin login failed:", error);
      status(
        error.message || "Login failed. Please check your credentials.",
        "error",
      );
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.innerHTML = original;
      }
    }
  }

  async function logout() {
    const { logout: logoutBtn } = els();
    if (!isConfigured()) return;
    if (logoutBtn) logoutBtn.disabled = true;

    try {
      await supabase.auth.signOut();
      setAuthUI(null);
      state.activeView = "overview";
      status("Signed out.", "success");
      try {
        location.hash = "";
      } catch (e) {
        showShell(false);
      }
    } catch (error) {
      status(error.message || "Logout failed.", "error");
    } finally {
      if (logoutBtn) logoutBtn.disabled = false;
    }
  }

  function bindEvents() {
    document.addEventListener(
      "click",
      (event) => {
        const link = event.target.closest("[data-admin-login-link]");
        if (link) openFromClick(event);
      },
      true,
    );

    $("#admin-login-form")?.addEventListener("submit", login);
    $("#admin-logout")?.addEventListener("click", logout);
    $("#admin-content-form")?.addEventListener("submit", saveContent);
    $("#admin-settings-form")?.addEventListener("submit", saveSettings);
    $("#admin-upload-form")?.addEventListener("submit", submitUpload);

    $("#admin-password-toggle")?.addEventListener("click", () => {
      const p = $("#admin-password");
      const b = $("#admin-password-toggle");
      const v = p.type === "text";
      p.type = v ? "password" : "text";
      b.textContent = v ? "Show" : "Hide";
    });

    $$("[data-admin-close-modal]").forEach((x) =>
      x.addEventListener("click", closeContentModal),
    );
    $$("[data-admin-close-upload]").forEach((x) =>
      x.addEventListener("click", closeUpload),
    );

    $("#admin-open-upload")?.addEventListener("click", () => openUpload());
    $("#admin-media-upload")?.addEventListener("click", () => openUpload());
    $("#admin-profile-upload")?.addEventListener("click", () =>
      openUpload({ kind: "profile" }),
    );
    $("#admin-upload-kind")?.addEventListener("change", () => {
      const kind = $("#admin-upload-kind").value;
      const projectInput = $("#admin-upload-project-id");
      if (!projectInput) return;
      const needsProject =
        kind === "project" ||
        kind === "project-file" ||
        kind === "project-link";
      projectInput.disabled = !needsProject;
      projectInput.required = needsProject;
      if (!needsProject) projectInput.value = "";
      projectInput.placeholder = needsProject
        ? "Automatically selected from the project card"
        : "Only needed for a project upload";
      const isLink = kind === "project-link";
      $("#admin-project-link-fields")?.toggleAttribute("hidden", !isLink);
      $("#admin-dropzone")?.toggleAttribute("hidden", isLink);
      if ($("#admin-file-input")) $("#admin-file-input").disabled = isLink;
      if ($("#admin-choose-file")) $("#admin-choose-file").disabled = isLink;
      if ($("#admin-upload-submit"))
        $("#admin-upload-submit").textContent = isLink
          ? "Save Links"
          : "Upload";
      $("#admin-upload-title").textContent = isLink
        ? "Add Project Links"
        : kind === "project-file"
          ? "Upload Project File"
          : "Upload Portfolio File";
    });

    $("#admin-profile-delete")?.addEventListener("click", async () => {
      const url = state.settings?.profile_image_url;
      if (!url) return;
      if (!confirm("Delete the current profile photo?")) return;
      try {
        await removeStorageUrl(url);
        if (state.settings?.id) {
          await supabase
            .from("site_settings")
            .update({ profile_image_url: null })
            .eq("id", state.settings.id);
        }
        state.settings.profile_image_url = null;
        applyProfileImage(
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='100%25' height='100%25' fill='%230a160d'/%3E%3C/svg%3E",
        );
        fillSettings();
        await loadMedia();
        toast("Profile photo deleted.");
      } catch (e) {
        toast(e.message || "Unable to delete profile photo.", "error");
      }
    });

    $$("[data-admin-view]").forEach((b) =>
      b.addEventListener("click", () => activateView(b.dataset.adminView)),
    );
    $$("[data-admin-view-jump]").forEach((b) =>
      b.addEventListener("click", () => activateView(b.dataset.adminViewJump)),
    );

    $("#admin-project-search")?.addEventListener("input", renderProjects);
    $("#admin-media-search")?.addEventListener("input", renderMedia);
    $("#admin-media-filter")?.addEventListener("change", renderMedia);

    $("#admin-mobile-menu")?.addEventListener("click", () =>
      els().sidebar?.classList.toggle("open"),
    );

    $("#admin-file-input")?.addEventListener("change", (e) =>
      chooseFile(e.target.files?.[0]),
    );
    $("#admin-choose-file")?.addEventListener("click", () =>
      $("#admin-file-input")?.click(),
    );

    const dz = $("#admin-dropzone");
    if (dz) {
      ["dragenter", "dragover"].forEach((ev) =>
        dz.addEventListener(ev, (e) => {
          e.preventDefault();
          dz.classList.add("dragover");
        }),
      );
      ["dragleave", "drop"].forEach((ev) =>
        dz.addEventListener(ev, (e) => {
          e.preventDefault();
          dz.classList.remove("dragover");
        }),
      );
      dz.addEventListener("drop", (e) => chooseFile(e.dataTransfer.files?.[0]));
    }

    document.addEventListener("click", async (event) => {
      try {
        const e = event.target;
        if (e.closest("[data-admin-add]")) {
          const type = e.closest("[data-admin-add]").dataset.adminAdd;
          openContentModal(type);
        } else if (e.closest("[data-edit-project]")) {
          openContentModal(
            "project",
            e.closest("[data-edit-project]").dataset.editProject,
          );
        } else if (e.closest("[data-project-link]")) {
          openContentModal(
            "project",
            e.closest("[data-project-link]").dataset.projectLink,
          );
        } else if (e.closest("[data-project-github]")) {
          openContentModal(
            "project",
            e.closest("[data-project-github]").dataset.projectGithub,
          );
        } else if (e.closest("[data-project-file]")) {
          openUpload({
            kind: "project-file",
            projectId: e.closest("[data-project-file]").dataset.projectFile,
          });
        } else if (e.closest("[data-delete-project-file]")) {
          await deleteProjectFile(
            e.closest("[data-delete-project-file]").dataset.deleteProjectFile,
          );
        } else if (e.closest("[data-modal-delete-project-file]")) {
          await deleteProjectFile(
            e.closest("[data-modal-delete-project-file]").dataset
              .modalDeleteProjectFile,
          );
          openContentModal(
            "project",
            e.closest("[data-modal-delete-project-file]").dataset
              .modalDeleteProjectFile,
          );
        } else if (e.closest("[data-project-image]")) {
          openUpload({
            kind: "project",
            projectId: e.closest("[data-project-image]").dataset.projectImage,
          });
        } else if (e.closest("[data-delete-project]")) {
          await deleteProject(
            e.closest("[data-delete-project]").dataset.deleteProject,
          );
        } else if (e.closest("[data-edit-service]")) {
          openContentModal(
            "service",
            e.closest("[data-edit-service]").dataset.editService,
          );
        } else if (e.closest("[data-delete-service]")) {
          await deleteRow(
            "services",
            e.closest("[data-delete-service]").dataset.deleteService,
          );
        } else if (e.closest("[data-edit-skill]")) {
          openContentModal(
            "skill",
            e.closest("[data-edit-skill]").dataset.editSkill,
          );
        } else if (e.closest("[data-delete-skill]")) {
          await deleteRow(
            "skills",
            e.closest("[data-delete-skill]").dataset.deleteSkill,
          );
        } else if (e.closest("[data-delete-message]")) {
          const id = e.closest("[data-delete-message]").dataset.deleteMessage;
          if (!confirm("Delete this message?")) return;
          const r = await supabase.from("messages").delete().eq("id", id);
          if (r.error) throw r.error;
          state.messages = state.messages.filter(
            (x) => String(x.id) !== String(id),
          );
          updateStats();
          renderMessages();
          toast("Message deleted.");
        } else if (e.closest("[data-media-preview]")) {
          window.open(
            e.closest("[data-media-preview]").dataset.mediaPreview,
            "_blank",
            "noopener",
          );
        } else if (e.closest("[data-media-copy]")) {
          await navigator.clipboard?.writeText(
            e.closest("[data-media-copy]").dataset.mediaCopy,
          );
          toast("URL copied.");
        } else if (e.closest("[data-media-replace]")) {
          const path = e.closest("[data-media-replace]").dataset.mediaReplace;
          const folder = path.split("/")[0];
          openUpload({
            replacePath: path,
            kind:
              folder === "projects"
                ? "project"
                : folder === "profile"
                  ? "profile"
                  : "general",
          });
        } else if (e.closest("[data-media-delete]")) {
          await deleteMedia(
            e.closest("[data-media-delete]").dataset.mediaDelete,
          );
        }
      } catch (err) {
        console.error(err);
        toast(err.message || "Action failed.", "error");
      }
    });
  }

  function init() {
    if (initialized) return;
    initialized = true;
    bindEvents();
    window.addEventListener("hashchange", route);
    window.addEventListener("popstate", route);

    if (isConfigured()) {
      supabase.auth.onAuthStateChange((_event, session) => {
        if (location.hash.toLowerCase() === "#admin") {
          setAuthUI(session);
          if (session) loadAdminData().catch((e) => status(e.message, "error"));
        }
      });
    }
    route();
  }

  return { init };
})();

/* ==========================================================================
   Boot Application
   ========================================================================== */
function bootSite() {
  AdminRouter.init();
  fillSiteText();
  initInteractions();
  initHeroRoleTypewriter();

  // Load Supabase content asynchronously
  loadPublicContent().catch((err) =>
    console.error("Supabase content load failed:", err),
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }
      bootSite();
    },
    { once: true },
  );
} else {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }
  bootSite();
}

window.addEventListener("pageshow", () => {
  document.body.classList.remove("menu-open");
});

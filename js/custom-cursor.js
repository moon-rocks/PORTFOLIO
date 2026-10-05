/* ========================================================================
   GSAP-powered premium custom cursor
   ======================================================================== */
window.initializePortfolioCursor = function initializePortfolioCursor() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  if (!finePointer || !window.gsap || reduceMotion) return;

  const cursorContainer = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  const cursorLabel = document.querySelector(".cursor-label");

  if (!cursorContainer || !cursorDot || !cursorRing) return;
  if (cursorContainer.dataset.initialized === "1") return;
  cursorContainer.dataset.initialized = "1";

  gsap.set([cursorDot, cursorRing], {
    xPercent: -50,
    yPercent: -50,
    transformOrigin: "50% 50%",
    opacity: 0,
    scale: 1,
  });

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
      if (cursorLabel) cursorLabel.textContent = labelText || "VIEW";
      gsap.to(cursorRing, {
        scale: isMouseDown ? 2 : 2.4,
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

  window.addEventListener(
    "mousemove",
    (event) => {
      const { clientX: x, clientY: y } = event;
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

      const target = event.target;
      if (!target) return;

      const projectCard = target.closest(
        ".project__visual, [data-cursor='view']",
      );
      if (projectCard) {
        setCursorState(
          "view",
          projectCard.getAttribute("data-cursor-label") || "VIEW",
        );
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
};

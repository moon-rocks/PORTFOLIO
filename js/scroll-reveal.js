window.animatePortfolioReveals = function animatePortfolioReveals(
  selector = ".reveal",
) {
  if (!window.gsap) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (window.ScrollTrigger) window.ScrollTrigger.refresh();

  document.querySelectorAll(selector).forEach((element) => {
    if (element.dataset.animated === "1") return;
    element.dataset.animated = "1";

    if (reduceMotion) {
      gsap.set(element, { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo(
      element,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: window.ScrollTrigger
          ? {
              trigger: element,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            }
          : undefined,
      },
    );
  });

  if (window.ScrollTrigger) {
    requestAnimationFrame(() => window.ScrollTrigger.refresh());
  }
};

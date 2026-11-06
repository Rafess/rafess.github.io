
gsap.registerPlugin(ScrollTrigger);

// Preferência de acessibilidade
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
gsap.registerPlugin(ScrollTrigger);

gsap.to(".forest-back", {
  y: -40,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
});

gsap.to(".forest-middle", {
  y: -100,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
});

gsap.to(".forest-front", {
  y: -180,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
});
if (!prefersReducedMotion) {

  // ANIMAÇÃO INDIVIDUAL
  const elements = gsap.utils.toArray("[data-reveal]");

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true
        }
      }
    );
  });

  // ANIMAÇÃO STAGGER DOS PROJETOS
  const projectGrid = document.querySelector(".project-grid");

  if (projectGrid) {

    const projectCards = projectGrid.querySelectorAll(".project");

    gsap.fromTo(
      projectCards,
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power2.out",

        scrollTrigger: {
          trigger: projectGrid,
          start: "top 80%",
          once: true
        }
      }
    );
  }
const aboutSection = document.querySelector(".about");

if (aboutSection) {
  const heading = aboutSection.querySelector(".section-head");

  const label = heading.querySelector(".mono");
  const title = heading.querySelector("h2");
  const description = heading.querySelector(".section-note");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heading,
      start: "top 80%",
      once: true
    }
  });

  tl.from(label, {
    opacity: 0,
    y: 20,
    duration: 0.5
  });

  tl.from(title, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.2");

  tl.from(description, {
    opacity: 0,
    y: 25,
    duration: 0.7,
    ease: "power2.out"
  }, "-=0.3");
}
const curtainMedia = gsap.matchMedia();

curtainMedia.add(
  {
    isMobile: "(max-width: 600px)",
    isDesktop: "(min-width: 601px)"
  },
  (context) => {
    const { isMobile } = context.conditions;

    const movement = 87;

    const curtainTimeline = gsap.timeline();

    curtainTimeline
      .to(".curtain-left", {
        xPercent: -movement,
        duration: isMobile ? 1.5 : 2,
        ease: "power3.inOut"
      })
      .to(
        ".curtain-right",
        {
          xPercent: movement,
          duration: isMobile ? 1.5 : 2,
          ease: "power3.inOut"
        },
        "<"
      )
     .from(".hero-content", {
    opacity: 0,
    y: 35,
    // duration: 0.05,
    ease: "power2.out"
  }, "-=0.3");
  }
);
}

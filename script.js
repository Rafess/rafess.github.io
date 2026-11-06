
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
const experienceBoard = document.querySelector(".experience");
const threadSvg = experienceBoard?.querySelector(".thread-layer");

if (experienceBoard && threadSvg) {
  const rows = [
    ...experienceBoard.querySelectorAll(".experience-row")
  ];

  const pins = rows.map((row) => row.querySelector(".case-pin"));

  const svgNS = "http://www.w3.org/2000/svg";
  const threads = [];

  function updateThread(thread) {
  const {
    x1,
    y1,
    x2,
    y2,
    bend,
    motion,
    shadow,
    path,
    highlight
  } = thread;

  const dx = x2 - x1;
  const dy = y2 - y1;

  const sway = motion.offset;
  const irregularity = motion.irregularity;

  const control1X = x1 + dx * 0.3 + bend + sway;
  const control1Y = y1 + dy * 0.3 + irregularity;

  const middleX = (x1 + x2) / 2 + bend * 0.5;
  const middleY = (y1 + y2) / 2 + irregularity;

  const control2X = x2 - dx * 0.3 + bend + sway;
  const control2Y = y1 + dy * 0.7 - irregularity;

  const curve = `
    M ${x1} ${y1}
    C ${control1X} ${control1Y},
      ${middleX - 8} ${middleY},
      ${middleX} ${middleY}
    S ${control2X} ${control2Y},
      ${x2} ${y2}
  `;

  shadow.setAttribute("d", curve);
  path.setAttribute("d", curve);
  highlight.setAttribute("d", curve);
    }

  function drawThreads() {
    threadSvg.replaceChildren();
    threads.length = 0;

    const boardRect = experienceBoard.getBoundingClientRect();

    const width = experienceBoard.clientWidth;
    const height = experienceBoard.scrollHeight;

    threadSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    threadSvg.style.width = `${width}px`;
    threadSvg.style.height = `${height}px`;

    pins.forEach((pin, index) => {
      const nextPin = pins[index + 1];

      if (!pin || !nextPin) return;

      const firstRect = pin.getBoundingClientRect();
      const secondRect = nextPin.getBoundingClientRect();

      const x1 = firstRect.left + firstRect.width / 2 - boardRect.left;
      const y1 = firstRect.top + firstRect.height / 2 - boardRect.top;

      const x2 = secondRect.left + secondRect.width / 2 - boardRect.left;
      const y2 = secondRect.top + secondRect.height / 2 - boardRect.top;

      const shadow = document.createElementNS(svgNS, "path");
        const path = document.createElementNS(svgNS, "path");
        const highlight = document.createElementNS(svgNS, "path");
    shadow.setAttribute("class", "thread-shadow");

    path.setAttribute("class", "thread-body");

    highlight.setAttribute("class", "thread-highlight");
    highlight.setAttribute("stroke-dasharray", "2 5");
    highlight.setAttribute("stroke-dashoffset", "1");
        shadow.setAttribute("fill", "none");
        shadow.setAttribute("stroke", "#32060a");
        shadow.setAttribute("stroke-width", "5");
        shadow.setAttribute("stroke-linecap", "round");
        shadow.setAttribute("opacity", "0.8");

        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#a61926");
        path.setAttribute("stroke-width", "2.5");
        path.setAttribute("stroke-linecap", "round");
        path.style.filter = "drop-shadow(0 0 4px rgba(190, 25, 40, 0.5))";

    threadSvg.append(shadow, path, highlight);
        const thread = {
    x1,
    y1,
    x2,
    y2,
    bend: index % 2 === 0 ? 16 : -16,

    motion: {
        offset: 0,
        irregularity: index % 2 === 0 ? 2 : -2
    },

    shadow,
    path,
    highlight
    };

        threads.push(thread);

        updateThread(thread);
        });
    }

    // Desenha os fios inicialmente
    drawThreads();

    // Atualiza quando a tela ou os cartões mudarem de tamanho
    const observer = new ResizeObserver(drawThreads);

    observer.observe(experienceBoard);

    rows.forEach((row) => observer.observe(row));

    window.addEventListener("resize", drawThreads);

    // Anima os fios conectados ao cartão em hover
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        rows.forEach((row, index) => {
        row.addEventListener("mouseenter", () => {
            const connectedThreads = [
            threads[index - 1],
            threads[index]
            ].filter(Boolean);

            connectedThreads.forEach((thread) => {
            gsap.killTweensOf(thread.motion);

            gsap.to(thread.motion, {
            offset: 12,
            irregularity: 7,
            duration: 0.25,
            repeat: 3,
            yoyo: true,
            ease: "sine.inOut",

            onUpdate: () => updateThread(thread),

            onComplete: () => {
                gsap.to(thread.motion, {
                offset: 0,
                irregularity: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.4)",
                onUpdate: () => updateThread(thread)
                });
            }
            });
            });
        });
        });
    } 
}
}


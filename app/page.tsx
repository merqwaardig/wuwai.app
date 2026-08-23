"use client";

import {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useState,
} from "react";

const steps = [
  { id: "eigenaarschap", label: "Voelen", color: "var(--heart)" },
  { id: "ervaring", label: "Begrijpen", color: "var(--mind)" },
  { id: "resultaat", label: "Leven", color: "var(--spirit)" },
];

const headlineWords = ["tijd", "energie", "leven"];

const channels = [
  {
    id: "doelen",
    number: "01",
    title: "Jouw doelen",
    copy: "Bepaal wat jij wilt bereiken en kom stap voor stap in actie.",
    color: "var(--solar)",
    screenshot: "/app-doelen.png",
    imageAlt: "Wuwai-appscherm Jouw doelen met voortgang en dagelijkse acties",
  },
  {
    id: "lichaam",
    number: "02",
    title: "Jouw lichaam",
    copy: "Ontdek de samenhang tussen lichaam, geest en ziel, van energie en emoties tot bewustzijn.",
    color: "var(--heart)",
    screenshot: "/app-lichaam.png",
    imageAlt: "Wuwai-appscherm Jouw lichaam met balans en zeven energieniveaus",
  },
  {
    id: "coach",
    number: "03",
    title: "Jouw coach",
    copy: "Krijg persoonlijke begeleiding, inzichten en inspiratie om toe te passen wat voor jou werkt.",
    color: "var(--throat)",
    screenshot: "/app-coach.png",
    imageAlt: "Wuwai-appscherm Jouw coach met persoonlijke signalen en inzichten",
  },
];

function DownArrow({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a className="down-arrow" href={href} aria-label={label} onClick={onClick}>
      <span aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeChannel, setActiveChannel] = useState("lichaam");
  const activeChannelIndex = channels.findIndex((channel) => channel.id === activeChannel);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  const navigateToSection =
    (sectionId: string, stepIndex: number) =>
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const target = document.getElementById(sectionId);
      if (!target) return;

      setActiveStep(stepIndex);
      window.history.pushState(null, "", `#${sectionId}`);
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    };

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".v2-section"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          const index = sections.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActiveStep(index);
        });
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      setHeadlineIndex((current) => (current + 1) % headlineWords.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeStep !== 1 || carouselPaused) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      setActiveChannel((current) => {
        const currentIndex = channels.findIndex((channel) => channel.id === current);
        return channels[(currentIndex + 1) % channels.length].id;
      });
    }, 3400);

    return () => window.clearInterval(interval);
  }, [activeStep, carouselPaused]);

  const moveEnergy = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <div className="v2-shell">
      <header className="v2-header">
        <a
          className="v2-brand"
          href="#eigenaarschap"
          aria-label="Wuwai, terug naar het begin"
          onClick={navigateToSection("eigenaarschap", 0)}
        >
          <img src="/wuwai-logo.png" alt="Wuwai" />
        </a>

        <nav className="step-nav" aria-label={`Stap ${activeStep + 1} van 3`}>
          {steps.map((step, index) => (
            <a
              key={step.id}
              href={`#${step.id}`}
              onClick={navigateToSection(step.id, index)}
              className={activeStep === index ? "is-active" : ""}
              aria-current={activeStep === index ? "step" : undefined}
              style={{ "--step-color": step.color } as CSSProperties}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i aria-hidden="true" />
              <strong>{step.label}</strong>
            </a>
          ))}
        </nav>

        <a className="header-action" href="https://app.wuwai.org/login">
          <span>Ontdek de app</span>
          <i aria-hidden="true">→</i>
        </a>
      </header>

      <main>
        <section
          id="eigenaarschap"
          className="v2-section ownership-section is-visible"
          onPointerMove={moveEnergy}
        >
          <img
            className="hero-background"
            src="/hero-charge.webp"
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
          />
          <div className="hero-image-overlay" aria-hidden="true" />

          <div className="v2-inner ownership-layout">
            <div className="ownership-copy reveal">
              <h1 className="rotating-headline" aria-label="Jouw tijd. Jouw energie. Jouw leven.">
                <span className="headline-static">Jouw</span>
                <span className="headline-window" aria-hidden="true">
                  <span className="headline-measure">energie.</span>
                  {headlineWords.map((word, index) => {
                    const previousIndex = (headlineIndex - 1 + headlineWords.length) % headlineWords.length;
                    const state = index === headlineIndex ? "is-current" : index === previousIndex ? "is-previous" : "is-next";
                    return <span key={word} className={`headline-word ${state}`}>{word}.</span>;
                  })}
                </span>
              </h1>
              <p className="hero-subline">
                <strong>Jij bepaalt wat je uit je leven haalt.</strong>
              </p>
              <a
                className="primary-action"
                href="#ervaring"
                onClick={navigateToSection("ervaring", 1)}
              >
                Ontdek hoe
                <span aria-hidden="true">↓</span>
              </a>
            </div>

          </div>

          <DownArrow
            href="#ervaring"
            label="Ga naar stap 2, begrijpen"
            onClick={navigateToSection("ervaring", 1)}
          />
        </section>

        <section id="ervaring" className="v2-section experience-section">
          <div className="experience-spectrum" aria-hidden="true" />
          <div className="v2-inner experience-layout">
            <div className="experience-copy reveal">
              <h2 aria-label="Ontdek wat jou in beweging brengt.">
                <span>Ontdek wat jou</span>
                <span>in beweging brengt.</span>
              </h2>
              <p className="experience-summary">
                Ervaar groei en geef richting aan je leven.
              </p>
              <a
                className="primary-action experience-action desktop-action"
                href="#resultaat"
                onClick={navigateToSection("resultaat", 2)}
              >
                Ervaar het verschil
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div
              className="channel-experience reveal reveal-late"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse" || event.pointerType === "pen") setCarouselPaused(true);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse" || event.pointerType === "pen") setCarouselPaused(false);
              }}
              onPointerDown={() => setCarouselPaused(true)}
              onFocusCapture={() => setCarouselPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setCarouselPaused(false);
              }}
            >
              <div className="phone-showcase" role="list" aria-label="Drie Wuwai-appschermen">
                {channels.map((channel, channelIndex) => {
                  const isActive = activeChannel === channel.id;
                  const relativePosition = (channelIndex - activeChannelIndex + channels.length) % channels.length;
                  const carouselPosition = relativePosition === 0 ? "center" : relativePosition === 1 ? "right" : "left";
                  return (
                    <button
                      key={channel.id}
                      className={`phone-card phone-${channel.id} phone-position-${carouselPosition} ${isActive ? "is-active" : ""}`}
                      type="button"
                      onClick={() => setActiveChannel(channel.id)}
                      aria-pressed={isActive}
                      style={{ "--channel-color": channel.color } as CSSProperties}
                    >
                      <span className="phone-frame">
                        <img src={channel.screenshot} alt={channel.imageAlt} />
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="active-channel-copy">
                {channels.find((channel) => channel.id === activeChannel)?.copy}
              </p>
              <a
                className="primary-action experience-action mobile-action"
                href="#resultaat"
                onClick={navigateToSection("resultaat", 2)}
              >
                Ervaar het verschil
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

        </section>

        <section id="resultaat" className="v2-section result-section">
          <div className="result-aura" aria-hidden="true" />
          <div className="result-grain" aria-hidden="true" />

          <div className="v2-inner result-layout">
            <div className="result-copy reveal">
              <h2 className="result-headline" aria-label="Leef in vrijheid, autonomie & flow.">
                {["Leef in vrijheid,", "autonomie & flow."].map((line) => (
                  <span className="result-line-mask" key={line} aria-hidden="true">
                    <span className="result-line">{line}</span>
                  </span>
                ))}
              </h2>
              <p className="lead result-supporting-copy">
                Vertrouw op wat je lichaam je vertelt.
              </p>
              <a
                className="app-login-action desktop-action"
                href="https://app.wuwai.org/login"
              >
                <span>Ontdek de app</span>
                <i aria-hidden="true">→</i>
              </a>
            </div>

            <div className="be-you-destination reveal reveal-late">
              <div className="result-image-stage" aria-label="Mensen in verschillende levensfasen">
                <img
                  className="result-image result-image-child"
                  src="/polaroid-child.jpg"
                  alt="Kind in warm daglicht"
                />
                <img
                  className="result-image result-image-elder"
                  src="/polaroid-elder.jpg"
                  alt="Oudere vrouw die rustig in de camera kijkt"
                />
                <div className="result-image-shade" aria-hidden="true" />
                <img className="be-you-mark" src="/be-you.svg" alt="Be You" />
              </div>
              <a
                className="app-login-action mobile-action"
                href="https://app.wuwai.org/login"
              >
                <span>Ontdek de app</span>
                <i aria-hidden="true">→</i>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

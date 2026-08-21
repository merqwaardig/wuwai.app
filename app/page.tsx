"use client";

import {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useState,
} from "react";

const steps = [
  { id: "eigenaarschap", label: "Persoonlijk", color: "var(--mind)" },
  { id: "ervaring", label: "Doelgericht", color: "var(--heart)" },
  { id: "resultaat", label: "Resultaat", color: "var(--spirit)" },
];

const headlineWords = ["tijd", "energie", "leven"];
const resultLead = "Ervaar meer vrijheid, zelfvertrouwen\nen geef leiding aan je leven.";

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

function DownArrow({ href, label }: { href: string; label: string }) {
  return (
    <a className="down-arrow" href={href} aria-label={label}>
      <span aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeChannel, setActiveChannel] = useState("lichaam");
  const activeChannelIndex = channels.findIndex((channel) => channel.id === activeChannel);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [resultLeadLength, setResultLeadLength] = useState(0);

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
    if (activeStep !== 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setResultLeadLength(resultLead.length);
      return;
    }

    setResultLeadLength(0);
    let typingInterval = 0;
    const startTyping = window.setTimeout(() => {
      typingInterval = window.setInterval(() => {
        setResultLeadLength((current) => {
          if (current >= resultLead.length) {
            window.clearInterval(typingInterval);
            return current;
          }
          return current + 1;
        });
      }, 32);
    }, 2100);

    return () => {
      window.clearTimeout(startTyping);
      window.clearInterval(typingInterval);
    };
  }, [activeStep]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      setHeadlineIndex((current) => (current + 1) % headlineWords.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeStep !== 1) return;

    const mobileViewport = window.matchMedia("(max-width: 820px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mobileViewport.matches || reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      setActiveChannel((current) => {
        const currentIndex = channels.findIndex((channel) => channel.id === current);
        return channels[(currentIndex + 1) % channels.length].id;
      });
    }, 3400);

    return () => window.clearInterval(interval);
  }, [activeStep]);

  const moveEnergy = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <div className="v2-shell">
      <header className="v2-header">
        <a className="v2-brand" href="#eigenaarschap" aria-label="Wuwai, terug naar het begin">
          <img src="/wuwai-logo.png" alt="Wuwai" />
        </a>

        <nav className="step-nav" aria-label={`Stap ${activeStep + 1} van 3`}>
          {steps.map((step, index) => (
            <a
              key={step.id}
              href={`#${step.id}`}
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

        <a className="header-action" href="https://app.wuwai.org/login">Aanmelden</a>
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
              <p className="step-eyebrow"><span>01</span> Persoonlijk</p>
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
                <span>Ontdek wat jouw lichaam je vertelt en maak keuzes die echt bij je passen.</span>
              </p>
              <a className="primary-action" href="#ervaring">
                Hoe het werkt
                <span aria-hidden="true">↓</span>
              </a>
            </div>

          </div>

          <DownArrow href="#ervaring" label="Ga naar stap 2, ervaar hoe het werkt" />
        </section>

        <section id="ervaring" className="v2-section experience-section">
          <div className="experience-spectrum" aria-hidden="true" />
          <div className="v2-inner experience-layout">
            <div className="experience-copy reveal">
              <p className="step-eyebrow"><span>02</span> Doelgericht</p>
              <h2>Alles wat je nodig hebt om bewust in beweging te komen.</h2>
              <p className="experience-summary">
                Doelen, lichaamswijsheid en coaching komen samen in één persoonlijke ervaring.
              </p>
            </div>

            <div className="channel-experience reveal reveal-late">
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
                      onPointerEnter={() => setActiveChannel(channel.id)}
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
            </div>
          </div>

          <DownArrow href="#resultaat" label="Ga naar stap 3, ervaar het resultaat" />
        </section>

        <section id="resultaat" className="v2-section result-section">
          <div className="result-aura" aria-hidden="true" />
          <div className="result-grain" aria-hidden="true" />

          <div className="v2-inner result-layout">
            <div className="result-copy reveal">
              <p className="step-eyebrow"><span>03</span> Resultaat</p>
              <h2 className="result-headline" aria-label="Meer balans. Meer energie. Meer flow.">
                {["Meer balans.", "Meer energie.", "Meer flow."].map((line) => (
                  <span className="result-line-mask" key={line} aria-hidden="true">
                    <span className="result-line">{line}</span>
                  </span>
                ))}
              </h2>
              <p className="lead result-typed-copy" aria-label={resultLead}>
                <span className="result-typed-measure" aria-hidden="true">{resultLead}</span>
                <span className="result-typed-text" aria-hidden="true">
                  {resultLead.slice(0, resultLeadLength)}
                  <i className={resultLeadLength === resultLead.length ? "is-complete" : ""} />
                </span>
              </p>
            </div>

            <div className="be-you-destination reveal reveal-late">
              <div className="be-you-rings" aria-hidden="true">
                <span /><span /><span />
              </div>
              <div className="polaroid-cluster" aria-label="Mensen in verschillende levensfasen">
                <figure className="polaroid polaroid-child">
                  <img src="/polaroid-child.jpg" alt="Portret van een kind in warm daglicht" />
                </figure>
                <figure className="polaroid polaroid-elder">
                  <img src="/polaroid-elder.jpg" alt="Portret van een oudere vrouw" />
                </figure>
              </div>
              <img className="be-you-mark" src="/be-you.svg" alt="Be You" />

              <a className="app-login-action" href="https://app.wuwai.org/login">
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

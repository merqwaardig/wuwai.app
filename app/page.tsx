"use client";

import {
  CSSProperties,
  FormEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useState,
} from "react";

const steps = [
  { id: "eigenaarschap", label: "Eigenaarschap", color: "var(--root-chakra)" },
  { id: "ervaring", label: "Ervaring", color: "var(--heart)" },
  { id: "resultaat", label: "Resultaat", color: "var(--crown)" },
];

const channels = [
  {
    id: "doelen",
    number: "01",
    title: "Jouw doelen",
    copy: "Bepaal wat jij wilt bereiken en kom stap voor stap in actie.",
    color: "var(--solar)",
    icon: "/chakra-3.svg",
  },
  {
    id: "lichaam",
    number: "02",
    title: "Jouw lichaam",
    copy: "Ontdek de samenhang tussen lichaam, geest en ziel, van energie en emoties tot bewustzijn.",
    color: "var(--heart)",
    icon: "/chakra-4.svg",
  },
  {
    id: "coach",
    number: "03",
    title: "Jouw coach",
    copy: "Krijg persoonlijke begeleiding, inzichten en inspiratie om toe te passen wat voor jou werkt.",
    color: "var(--throat)",
    icon: "/chakra-5.svg",
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
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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

  const moveEnergy = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setFormStatus("submitting");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (!response.ok) throw new Error("FormSubmit kon de aanmelding niet verwerken.");
      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
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

        <a className="header-action" href="#resultaat">Let&apos;s go</a>
      </header>

      <main>
        <section
          id="eigenaarschap"
          className="v2-section ownership-section is-visible"
          onPointerMove={moveEnergy}
        >
          <div className="pointer-light" aria-hidden="true" />
          <div className="ownership-wash ownership-wash-one" aria-hidden="true" />
          <div className="ownership-wash ownership-wash-two" aria-hidden="true" />

          <div className="v2-inner ownership-layout">
            <div className="ownership-copy reveal">
              <p className="step-eyebrow"><span>01</span> Eigenaarschap &amp; inspiratie</p>
              <h1>Jouw leven.<br />Jouw energie.<br />Jouw tijd.</h1>
              <p className="lead">Jij bepaalt wat je uit je leven haalt.</p>
              <p className="supporting-copy">
                Ontdek wat jouw lichaam je vertelt en maak keuzes die echt bij je passen.
              </p>
              <a className="primary-action" href="#ervaring">
                Start je ervaring hier
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="self-field reveal reveal-late" aria-label="Jij staat centraal in jouw leven, energie en tijd">
              <div className="self-aura" aria-hidden="true" />
              <div className="self-ring self-ring-outer" aria-hidden="true" />
              <div className="self-ring self-ring-middle" aria-hidden="true" />
              <div className="self-ring self-ring-inner" aria-hidden="true" />
              <span className="field-word field-word-life">leven</span>
              <span className="field-word field-word-energy">energie</span>
              <span className="field-word field-word-time">tijd</span>
              <div className="self-core">
                <span>Jij</span>
                <small>aan het roer</small>
              </div>
              <div className="energy-pulse energy-pulse-one" aria-hidden="true" />
              <div className="energy-pulse energy-pulse-two" aria-hidden="true" />
              <div className="energy-pulse energy-pulse-three" aria-hidden="true" />
            </div>
          </div>

          <DownArrow href="#ervaring" label="Ga naar stap 2, ervaar hoe het werkt" />
        </section>

        <section id="ervaring" className="v2-section experience-section">
          <div className="experience-spectrum" aria-hidden="true" />
          <div className="v2-inner experience-layout">
            <div className="experience-copy reveal">
              <p className="step-eyebrow"><span>02</span> Ervaar hoe het werkt</p>
              <h2>Alles wat je nodig hebt om bewust in beweging te komen.</h2>
              <p className="experience-summary">
                Doelen, lichaamswijsheid en coaching komen samen in één persoonlijke ervaring.
              </p>
            </div>

            <div className="channel-experience reveal reveal-late">
              <div className="channel-orbit" aria-hidden="true">
                <span className="channel-orbit-ring" />
                <span className="channel-orbit-core">Jij</span>
              </div>

              <div className="channel-list" role="list" aria-label="De drie onderdelen van jouw ervaring">
                {channels.map((channel) => {
                  const isActive = activeChannel === channel.id;
                  return (
                    <button
                      key={channel.id}
                      className={`channel ${isActive ? "is-active" : ""}`}
                      type="button"
                      onClick={() => setActiveChannel(channel.id)}
                      onPointerEnter={() => setActiveChannel(channel.id)}
                      aria-pressed={isActive}
                      style={{ "--channel-color": channel.color } as CSSProperties}
                    >
                      <span className="channel-number">{channel.number}</span>
                      <img src={channel.icon} alt="" aria-hidden="true" />
                      <span className="channel-text">
                        <strong>{channel.title}</strong>
                        <span>{channel.copy}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <DownArrow href="#resultaat" label="Ga naar stap 3, ervaar het resultaat" />
        </section>

        <section id="resultaat" className="v2-section result-section">
          <div className="result-aura" aria-hidden="true" />
          <div className="result-grain" aria-hidden="true" />

          <div className="v2-inner result-layout">
            <div className="result-copy reveal">
              <p className="step-eyebrow"><span>03</span> Ervaar het resultaat</p>
              <h2>Meer energie.<br />Meer rust.<br />Meer flow.</h2>
              <p className="lead">Voel je vrijer. Vertrouw op jezelf. Neem de regie terug.</p>
              <p className="supporting-copy">
                Versterk je gezondheid, ontdek je levensenergie en geef richting aan wat voor jou betekenis heeft.
              </p>
            </div>

            <div className="be-you-destination reveal reveal-late">
              <div className="be-you-rings" aria-hidden="true">
                <span /><span /><span />
              </div>
              <img className="be-you-mark" src="/be-you.svg" alt="Be You" />

              <details
                className="access-panel"
                open={formStatus === "error" || formStatus === "success" ? true : undefined}
              >
                <summary>
                  <span>Let&apos;s go</span>
                  <i aria-hidden="true">→</i>
                </summary>

                <form
                  action="https://formsubmit.co/ajax/contact@wuwai.org"
                  method="POST"
                  onSubmit={submit}
                  className={formStatus === "success" ? "is-success" : ""}
                >
                  <input type="hidden" name="_subject" value="Nieuwe early-accessaanmelding voor Wuwai V2" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_url" value="https://www.wuwai.app/#resultaat" />
                  <input className="form-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" />

                  <div className="form-fields">
                    <label>
                      <span>Naam</span>
                      <input type="text" name="name" placeholder="Jouw naam" autoComplete="name" required />
                    </label>
                    <label>
                      <span>E-mailadres</span>
                      <input type="email" name="email" placeholder="E-mailadres" autoComplete="email" required />
                    </label>
                    <button type="submit" disabled={formStatus === "submitting"}>
                      {formStatus === "submitting" ? "Even versturen…" : "Ik doe mee"}
                    </button>
                  </div>

                  <p className="privacy-note">Je gegevens gaan veilig via FormSubmit naar contact@wuwai.org.</p>
                  <div className="form-feedback" aria-live="polite">
                    {formStatus === "success" && <p className="form-success">Mooi. Je staat op de early-accesslijst.</p>}
                    {formStatus === "error" && <p className="form-error">Dat ging niet goed. Probeer het nog een keer.</p>}
                  </div>
                </form>
              </details>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

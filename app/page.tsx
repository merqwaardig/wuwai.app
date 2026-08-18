"use client";

import { FormEvent, useEffect, useState } from "react";

const chakraColors = [
  "#E14F4A",
  "#F0913C",
  "#F3C844",
  "#56B26D",
  "#3F8FD9",
  "#5061B0",
  "#8E5BC9",
];

const journeySteps = [
  { id: "fundament", label: "Fundament" },
  { id: "voeding-zorg", label: "Ervaren" },
  { id: "wilskracht", label: "Wilskracht" },
  { id: "liefde-verbinding", label: "Liefde & verbinding" },
  { id: "communicatie", label: "Communicatie" },
  { id: "intuitie", label: "Intuïtie" },
  { id: "spiritualiteit", label: "Spiritualiteit" },
];

const symptoms = [
  { label: "Weinig energie en motivatie", icon: "↯", color: "#E14F4A" },
  { label: "Geen richting of levensdoel", icon: "◎", color: "#F0913C" },
  { label: "Depressiviteit", icon: "☁", color: "#F3C844" },
  { label: "Stress en burn-out", icon: "≋", color: "#56B26D" },
  { label: "Overgewicht", icon: "◇", color: "#3F8FD9" },
  { label: "Drank, drugs en social media verslaving", icon: "∞", color: "#5061B0" },
  { label: "Emotie-eten", icon: "♡", color: "#8E5BC9" },
];

const rhythms = [
  {
    title: "Vijf elementen",
    copy: "Ontdek welke elementen jou voeden, bewegen of uit balans brengen.",
    className: "rhythm-elements",
  },
  {
    title: "Energie",
    copy: "Je chakra’s laten zien waar energie stroomt of aandacht vraagt.",
    className: "rhythm-energy",
  },
  {
    title: "Voeding",
    copy: "Ontdek wat jouw lichaam en energie werkelijk voedt.",
    className: "rhythm-food",
  },
  {
    title: "Rust",
    copy: "Herken wanneer je mag vertragen, herstellen en opladen.",
    className: "rhythm-rest",
  },
  {
    title: "Orgaanklok",
    copy: "Volg het natuurlijke ritme van je lichaam door de dag.",
    className: "rhythm-organ",
  },
  {
    title: "Chakraklok",
    copy: "Volg je persoonlijke cyclus van 28 dagen en wat daarin aandacht vraagt.",
    className: "rhythm-clock",
  },
];

function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <div className="step-label">
      <img src={`/chakra-${number}.svg`} alt="" aria-hidden="true" />
      <span>Stap {number}</span>
      <span className="step-separator">·</span>
      <strong>{title}</strong>
    </div>
  );
}

function NextArrow({ href, label }: { href: string; label: string }) {
  return (
    <a className="next-arrow" href={href} aria-label={label}>
      <span aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".story-section"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          const index = sections.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    let ticking = false;
    const updateDepth = () => {
      document.documentElement.style.setProperty("--page-scroll", `${window.scrollY}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateDepth);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateDepth();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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

      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Wuwai, terug naar boven">
          <img src="/wuwai-logo.png" alt="Wuwai" />
        </a>
        <nav className="journey-nav" aria-label={`Scherm ${active + 1} van 9`}>
          <a
            className={`journey-endpoint ${active === 0 ? "is-active" : ""}`}
            href="#top"
            aria-label="Intro"
            aria-current={active === 0 ? "step" : undefined}
          >
            01
          </a>
          {journeySteps.map((step, index) => (
            <a
              key={step.id}
              href={`#${step.id}`}
              aria-label={`Stap ${index + 1}: ${step.label}`}
              aria-current={active === index + 1 ? "step" : undefined}
              className={`journey-dot ${active === index + 1 ? "is-active" : ""}`}
              style={{ "--nav-color": chakraColors[index] } as React.CSSProperties}
            >
              <span />
            </a>
          ))}
          <a
            className={`journey-endpoint ${active === 8 ? "is-active" : ""}`}
            href="#signup"
            aria-label="Afsluiting en early access"
            aria-current={active === 8 ? "step" : undefined}
          >
            09
          </a>
        </nav>
        <a className="header-cta" href="#signup">
          Early access
        </a>
      </header>

      <main>
        <section id="top" className="story-section hero-section is-visible">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />
          <div className="section-inner hero-layout">
            <div className="hero-copy reveal">
              <h1>Alles zit al in je, laat het samenwerken.</h1>
              <p className="hero-intro">
                Wuwai brengt samen wat al van jou is, zodat je ziet wat je voelt, kunt en wilt.
              </p>
              <div className="hero-actions">
                <a className="primary-button" href="#signup">
                  Ik wil early access
                </a>
                <a className="secondary-button" href="#fundament">Ontdek hoe het werkt</a>
              </div>
            </div>

            <div className="orbit-scene reveal reveal-late" aria-label="Alles komt samen rond jou">
              <div className="orbit-halo" />
              <div className="orbit-core"><img src="/be-you.svg" alt="Be You" /></div>
              {[
                "Flow",
                "Zelfvertrouwen",
                "Focus",
                "Bewustzijn",
                "Zelfgeloof",
                "Energie",
                "Levensdoel",
                "Balans",
              ].map((label, index) => (
                <span key={label} className={`orbit-word orbit-word-${index + 1}`}>{label}</span>
              ))}
            </div>
          </div>
          <NextArrow href="#fundament" label="Ga naar stap 1, Fundament" />
        </section>

        <section id="fundament" className="story-section recognition-section">
          <div className="section-inner split-layout">
            <div className="section-copy reveal">
              <StepLabel number={1} title="Fundament" />
              <p className="section-kicker">Misschien herken je dit</p>
              <h2>Je voelt dat er iets niet klopt, maar ziet nog niet waarom.</h2>
              <p className="section-intro">Soms spreekt je systeem al langer, alleen nog niet in één helder verhaal.</p>
            </div>
            <div className="symptom-field reveal reveal-late">
              {symptoms.map((symptom, index) => (
                <span
                  key={symptom.label}
                  style={{ "--delay": `${index * 45}ms`, "--symptom-color": symptom.color } as React.CSSProperties}
                >
                  <i aria-hidden="true">{symptom.icon}</i>
                  {symptom.label}
                </span>
              ))}
            </div>
          </div>
          <NextArrow href="#voeding-zorg" label="Ga naar stap 2, Ervaren" />
        </section>

        <section id="voeding-zorg" className="story-section coherence-section">
          <div className="section-inner coherence-layout">
            <div className="section-copy reveal">
              <StepLabel number={2} title="Ervaren" />
              <p className="section-kicker">Van losse signalen naar samenhang</p>
              <h2>Wat los voelt, kan samen een patroon vormen.</h2>
              <p className="section-intro">
                Wuwai brengt metingen, ervaringen en je dagelijks leven samen in één persoonlijke spiegel.
              </p>
            </div>
            <div className="signal-composition reveal reveal-late">
              <article className="signal signal-body">
                <span>01</span><h3>Lichaam</h3><p>Slaap · energie · gewicht</p>
              </article>
              <article className="signal signal-mind">
                <span>02</span><h3>Geest</h3><p>Gedachten · emoties · motivatie</p>
              </article>
              <article className="signal signal-soul">
                <span>03</span><h3>Ziel</h3><p>Liefde · verbinding · levensdoel</p>
              </article>
            </div>
          </div>
          <NextArrow href="#wilskracht" label="Ga naar stap 3, Wilskracht" />
        </section>

        <section id="wilskracht" className="story-section rhythm-section">
          <div className="rhythm-glow" />
          <div className="section-inner">
            <div className="section-copy rhythm-copy reveal">
              <StepLabel number={3} title="Wilskracht" />
              <p className="section-kicker">Jouw natuurlijke systeem</p>
              <h2>
                <span className="rhythm-title-line">Ontdek je energetische profiel.</span>
                <span className="rhythm-title-line">Leef in flow met de natuur.</span>
              </h2>
            </div>
            <div className="rhythm-composition reveal reveal-late">
              {rhythms.map((item, index) => (
                <article className={`rhythm-item ${item.className}`} key={item.title}>
                  <span className="rhythm-index">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
              <div className="rhythm-pulse" aria-hidden="true"><i /><i /><i /></div>
            </div>
          </div>
          <NextArrow href="#liefde-verbinding" label="Ga naar stap 4, Liefde en verbinding" />
        </section>

        <section id="liefde-verbinding" className="story-section core-section">
          <div className="section-inner core-layout">
            <div className="section-copy reveal">
              <StepLabel number={4} title="Liefde & verbinding" />
              <p className="section-kicker">Terug naar je kern</p>
              <h2>Laat los wat niet meer past.</h2>
              <p className="section-intro">
                Herken overtuigingen en patronen die je sturen. Zo ontstaat er ruimte om te leven vanuit passie en liefde, op de manier die bij je klopt.
              </p>
            </div>
            <div className="blueprint-scene reveal reveal-late" aria-label="Lichaam, geest en spirit komen samen in Be You">
              <div className="blueprint-ring blueprint-body"><span>LICHAAM</span></div>
              <div className="blueprint-ring blueprint-mind"><span>GEEST</span></div>
              <div className="blueprint-ring blueprint-spirit"><span>SPIRIT</span></div>
              <div className="blueprint-center"><img src="/be-you.svg" alt="Be You" /></div>
            </div>
          </div>
          <NextArrow href="#communicatie" label="Ga naar stap 5, Communicatie" />
        </section>

        <section id="communicatie" className="story-section choice-section">
          <div className="section-inner choice-layout">
            <div className="section-copy reveal">
              <StepLabel number={5} title="Communicatie" />
              <p className="section-kicker">Zo werkt het</p>
              <h2>Bewust kiezen het anders te doen.</h2>
              <p className="section-intro">Geen grote ommezwaai. Eén eerlijke observatie en één keuze die vandaag haalbaar voelt.</p>
            </div>
            <div className="choice-path reveal reveal-late">
              <article><span>1</span><div><h3>Zie</h3><p>Leg vast wat je ervaart.</p></div></article>
              <article><span>2</span><div><h3>Begrijp</h3><p>Ontdek een patroon of vraag.</p></div></article>
              <article><span>3</span><div><h3>Doe</h3><p>Kies één kleine stap.</p></div></article>
              <div className="choice-line" aria-hidden="true" />
            </div>
          </div>
          <NextArrow href="#intuitie" label="Ga naar stap 6, Intuïtie" />
        </section>

        <section id="intuitie" className="story-section day-section">
          <div className="section-inner day-layout">
            <div className="section-copy reveal">
              <StepLabel number={6} title="Intuïtie" />
              <p className="section-kicker">Balans</p>
              <h2>Elke dag een stap vooruit.</h2>
              <p className="section-intro">Wuwai beweegt mee met je dag, zonder je dag over te nemen.</p>
            </div>
            <div className="day-line reveal reveal-late">
              <article><time>07:30</time><strong>Check-in</strong><p>Hoe heb je geslapen?</p></article>
              <article><time>Inzicht</time><strong>Zie het verband</strong><p>Op drukke avonden is je slaap korter.</p></article>
              <article><time>Jouw keuze</time><strong>Kies wat past</strong><p>Tien minuten wandelen of even bewust ademen?</p></article>
              <article><time>Morgen</time><strong>Kijk terug</strong><p>Wat merkte je?</p></article>
            </div>
          </div>
          <NextArrow href="#spiritualiteit" label="Ga naar stap 7, Spiritualiteit" />
        </section>

        <section id="spiritualiteit" className="story-section growth-section">
          <div className="growth-orb growth-orb-one" />
          <div className="growth-orb growth-orb-two" />
          <div className="section-inner growth-layout">
            <div className="section-copy reveal">
              <StepLabel number={7} title="Spiritualiteit" />
              <p className="section-kicker">Vooruitgang & vertrouwen</p>
              <h2>Bewust kiezen voor meer energie, balans en bewustzijn.</h2>
              <p className="section-intro">Kleine observaties worden betere vragen. Kleine keuzes worden nieuwe ervaringen.</p>
            </div>
            <div className="growth-visual reveal reveal-late">
              <div className="growth-curve" aria-label="De terugkerende beweging van zien, begrijpen en doen">
                <svg className="growth-path" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
                  <path pathLength="1" d="M 70 238 C 250 226, 340 190, 500 145 S 770 62, 930 58" />
                </svg>
                <span className="growth-point point-one">zien</span>
                <span className="growth-point point-two">begrijpen</span>
                <span className="growth-point point-three">doen</span>
              </div>
              <div className="trust-lines">
                <p><i>✓</i> Jouw data, jouw controle.</p>
                <p><i>✓</i> Suggesties, geen opdrachten.</p>
                <p><i>✓</i> Meetbaar waar het kan, voelbaar waar het telt.</p>
              </div>
            </div>
          </div>
          <NextArrow href="#signup" label="Ga naar de afsluiting en early access" />
        </section>

        <section id="signup" className="story-section signup-section">
          <div className="signup-aura" />
          <div className="section-inner signup-layout reveal">
            <img className="be-you-logo" src="/be-you.svg" alt="Be You" />
            <h2>Niet iemand anders worden, maar dichter komen bij wie je eigenlijk bent.</h2>
            <p className="signup-line">Groei in energie, balans en bewustzijn.</p>
            <form
              action="https://formsubmit.co/ajax/contact@wuwai.org"
              method="POST"
              onSubmit={submit}
              className={formStatus === "success" ? "is-success" : ""}
            >
              <input type="hidden" name="_subject" value="Nieuwe early-accessaanmelding voor Wuwai" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_url" value="https://www.wuwai.app/#signup" />
              <input className="form-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
              <label>
                <span>Naam</span>
                <input type="text" name="name" placeholder="Naam" autoComplete="name" required />
              </label>
              <label>
                <span>E-mailadres</span>
                <input type="email" name="email" placeholder="E-mailadres" autoComplete="email" required />
              </label>
              <button className="primary-button" type="submit" disabled={formStatus === "submitting"}>
                {formStatus === "submitting" ? "Even versturen…" : "Ik wil early access"}
              </button>
              <p className="form-note">Je gegevens worden via FormSubmit doorgestuurd naar contact@wuwai.org.</p>
              <div className="form-feedback" aria-live="polite">
                {formStatus === "success" && (
                  <p className="form-success">Dankjewel. Je aanmelding is verzonden.</p>
                )}
                {formStatus === "error" && (
                  <p className="form-error">Dat ging niet goed. Probeer het nog een keer.</p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  AudioLines,
  BookOpen,
  Captions,
  Check,
  Eye,
  Hand,
  Headphones,
  Keyboard,
  Settings2,
  Volume2,
} from "lucide-react";

import { useAccessibility } from "@/hooks/useAccessibility";

const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Understand numbers, fractions, geometry, and problem-solving.",
    number: "01",
  },
  {
    id: "science",
    name: "Science",
    description: "Explore physics, biology, and the world around you.",
    number: "02",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    description: "Discover programming and fundamental computer concepts.",
    number: "03",
  },
  {
    id: "english",
    name: "English",
    description: "Build vocabulary, grammar, and communication skills.",
    number: "04",
  },
  {
    id: "general-knowledge",
    name: "General Knowledge",
    description: "Learn useful facts about the world around you.",
    number: "05",
  },
];

const formats = [
  {
    name: "Read",
    description: "Clear text with adjustable font sizes.",
    Icon: BookOpen,
  },
  {
    name: "Listen",
    description: "Listen to lessons with text-to-speech.",
    Icon: Headphones,
  },
  {
    name: "Captions",
    description: "Follow along with readable captions.",
    Icon: Captions,
  },
  {
    name: "Sign Language",
    description: "Access sign-language learning content.",
    Icon: Hand,
  },
];

const features = [
  {
    title: "Text-to-Speech",
    description: "Listen to written lessons using your device.",
    Icon: AudioLines,
  },
  {
    title: "Captions & Transcripts",
    description: "Read along with supported audio and video content.",
    Icon: Captions,
  },
  {
    title: "Sign Language",
    description: "Access sign-language videos when available.",
    Icon: Hand,
  },
  {
    title: "High Contrast",
    description: "Improve distinction between text and backgrounds.",
    Icon: Eye,
  },
  {
    title: "Keyboard Navigation",
    description: "Navigate the website without a mouse.",
    Icon: Keyboard,
  },
  {
    title: "Adjustable Text",
    description: "Choose a comfortable text size for reading.",
    Icon: Settings2,
  },
];

export default function Home() {
  const {
    selectedFormat,
    setSelectedFormat,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    resetPreferences,
    isLoaded,
  } = useAccessibility();

  function startLearning() {
    document.getElementById("subjects")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <div
      className={[
        "min-h-screen bg-[#f8faff] text-[#172033]",
        highContrast ? "high-contrast" : "",
        reducedMotion ? "reduce-motion" : "",
        `text-size-${textSize}`,
      ].join(" ")}
    >
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="nav-container">
          <a href="#home" className="brand" aria-label="AccessLearn home">
            <span className="brand-mark">
              <BookOpen size={23} aria-hidden="true" />
            </span>

            <span>
              <span className="brand-name">AccessLearn</span>
              <span className="brand-tagline">
                Education Without Barriers
              </span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a className="nav-active" href="#home">
              Home
            </a>
            <a href="#subjects">Subjects</a>
            <a href="#my-learning">My Learning</a>
            <a href="#accessibility">Accessibility</a>
          </nav>

          <a className="nav-settings" href="#accessibility">
            <Accessibility size={19} aria-hidden="true" />
            <span>Accessibility Settings</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero section-container" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              LEARNING FOR EVERYONE
            </div>

            <h1>
              Learn Without
              <br />
              <span>Barriers.</span>
            </h1>

            <p className="hero-description">
              Accessible lessons designed to help every learner understand
              concepts in the way that works best for them.
            </p>

            <div className="hero-actions">
              <button className="button-primary" onClick={startLearning}>
                Explore Subjects
                <ArrowRight size={18} aria-hidden="true" />
              </button>

              <a className="button-secondary" href="#accessibility">
                <Settings2 size={18} aria-hidden="true" />
                Accessibility Settings
              </a>
            </div>

            <div className="hero-note">
              <Check size={17} aria-hidden="true" />
              <span>Learn at your own pace, in your own way.</span>
            </div>
          </div>

          <div className="lesson-preview" aria-label="Example lesson preview">
            <div className="preview-top">
              <span className="preview-label">A LESSON, YOUR WAY</span>
              <span className="preview-number">01 / 05</span>
            </div>

            <div
              className="preview-illustration"
              role="img"
              aria-label="A circle divided into two equal parts, with one half highlighted to explain one half."
            >
              <div className="fraction-visual">
                <div className="fraction-circle" aria-hidden="true">
                  <span className="fraction-half" />
                </div>

                <div>
                  <span className="visual-overline">MATHEMATICS</span>
                  <p className="visual-title">Understanding fractions</p>
                  <p className="visual-caption">A part of a whole</p>
                </div>
              </div>
            </div>

            <div className="preview-bottom">
              <div className="preview-icon">
                <Volume2 size={19} aria-hidden="true" />
              </div>

              <div className="preview-text">
                <strong>Learn your way</strong>
                <span>Text, audio, and accessible explanations.</span>
              </div>

              <BookOpen
                size={20}
                className="preview-book"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <section className="section-container format-section" id="formats">
          <div className="section-heading">
            <span className="section-kicker">
              YOUR LEARNING, YOUR CHOICE
            </span>
            <h2>How do you want to learn?</h2>
            <p>
              Choose the format that works best for you. You can change it
              whenever you need.
            </p>
          </div>

          <div
            className="format-grid"
            role="group"
            aria-label="Preferred learning format"
          >
            {formats.map(({ name, description, Icon }) => {
              const selected = selectedFormat === name;

              return (
                <button
                  key={name}
                  type="button"
                  className={`format-card ${selected ? "format-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => setSelectedFormat(name)}
                >
                  <span className="format-icon">
                    <Icon size={23} aria-hidden="true" />
                  </span>

                  <span className="format-title">{name}</span>
                  <span className="format-description">{description}</span>

                  {selected && (
                    <span className="selected-indicator">
                      <Check size={15} aria-hidden="true" />
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="selection-status" role="status" aria-live="polite">
            Preferred format: {selectedFormat}
          </p>
        </section>

        <section className="how-section">
          <div className="section-container">
            <div className="section-heading">
              <span className="section-kicker">A SIMPLE WAY TO BEGIN</span>
              <h2>Learning that works for you.</h2>
            </div>

            <div className="steps-grid">
              <article className="step">
                <span className="step-number">01</span>
                <h3>Choose a subject</h3>
                <p>
                  Explore topics that interest you and find a lesson to begin.
                </p>
              </article>

              <article className="step">
                <span className="step-number">02</span>
                <h3>Choose how you learn</h3>
                <p>
                  Read, listen, use transcripts, or explore sign-language
                  content where available.
                </p>
              </article>

              <article className="step">
                <span className="step-number">03</span>
                <h3>Learn at your pace</h3>
                <p>
                  Understand concepts, practise, and keep track of your
                  progress.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section-container features-section"
          id="accessibility"
        >
          <div className="section-heading">
            <span className="section-kicker">BUILT AROUND ACCESSIBILITY</span>
            <h2>Tools that make learning more accessible.</h2>
            <p>
              Adjust the experience to make learning more comfortable for you.
            </p>
          </div>

          <div className="features-grid">
            {features.map(({ title, description, Icon }) => (
              <article className="feature-item" key={title}>
                <span className="feature-icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="settings-panel" id="quick-settings">
            <div className="settings-intro">
              <h3>Make learning comfortable</h3>
              <p>
                Your preferences are saved in this browser after they load.
              </p>
            </div>

            <div className="setting-control">
              <label htmlFor="text-size">Text size</label>
              <select
                id="text-size"
                value={textSize}
                onChange={(event) =>
                  setTextSize(
                    event.target.value as
                      | "normal"
                      | "large"
                      | "extra-large",
                  )
                }
                disabled={!isLoaded}
              >
                <option value="normal">Normal</option>
                <option value="large">Large</option>
                <option value="extra-large">Extra large</option>
              </select>
            </div>

            <label className="toggle-control">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(event) => setHighContrast(event.target.checked)}
                disabled={!isLoaded}
              />
              <span>High contrast</span>
            </label>

            <label className="toggle-control">
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(event) => setReducedMotion(event.target.checked)}
                disabled={!isLoaded}
              />
              <span>Reduced motion</span>
            </label>

            <button
              className="reset-button"
              onClick={resetPreferences}
              disabled={!isLoaded}
            >
              Reset settings
            </button>

            <p className="settings-status" role="status" aria-live="polite">
              {!isLoaded
                ? "Loading saved preferences…"
                : "Accessibility preferences are ready."}
            </p>
          </div>
        </section>

        <section className="subjects-section" id="subjects">
          <div className="section-container">
            <div className="section-heading subjects-heading">
              <div>
                <span className="section-kicker">FIND YOUR NEXT LESSON</span>
                <h2>Explore subjects.</h2>
              </div>
              <p>Start with a topic that interests you.</p>
            </div>

            <div className="subjects-grid">
              {subjects.map((subject) => (
                <article className="subject-card" key={subject.id}>
                  <span className="subject-number">{subject.number}</span>
                  <h3>{subject.name}</h3>
                  <p>{subject.description}</p>

                  <Link
                    href={`/subjects/${subject.id}`}
                    className="subject-link"
                  >
                    Explore subject
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section-container continue-section"
          id="my-learning"
        >
          <div>
            <span className="section-kicker">YOUR NEXT STEP</span>
            <h2>Your learning journey starts here.</h2>
            <p>
              Choose a subject to start a lesson. Your completed lessons are
              saved in this browser as you learn.
            </p>
          </div>

          <button className="button-primary" onClick={startLearning}>
            Explore Subjects
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-container footer-inner">
          <a href="#home" className="footer-brand">
            AccessLearn
          </a>
          <p>Education Without Barriers.</p>
          <span>Designed for more accessible learning.</span>
        </div>
      </footer>
    </div>
  );
}
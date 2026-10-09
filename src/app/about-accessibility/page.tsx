import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Ear,
  Hand,
  BookOpen,
  Keyboard,
  Volume2,
  Captions,
  ShieldCheck,
  Heart,
} from "lucide-react";

const accessibilityFeatures = [
  {
    icon: Eye,
    title: "Blind and low-vision learners",
    description:
      "Clear text, structured headings, keyboard navigation, and screen-reader-friendly controls help learners access educational content.",
  },
  {
    icon: Ear,
    title: "Deaf and hard-of-hearing learners",
    description:
      "Written explanations and lesson transcripts provide alternatives to audio-based learning.",
  },
  {
    icon: Hand,
    title: "Learners with motor disabilities",
    description:
      "Keyboard-operable controls, visible focus indicators, and generous interactive areas support different ways of navigating.",
  },
  {
    icon: BookOpen,
    title: "Learners who benefit from simpler content",
    description:
      "Short sections, clear instructions, familiar language, and consistent page layouts help make lessons easier to follow.",
  },
];

const learningTools = [
  {
    icon: Volume2,
    title: "Text-to-speech",
    description:
      "Supported lesson text can be read aloud using the browser's speech synthesis capabilities.",
  },
  {
    icon: Captions,
    title: "Transcripts and written content",
    description:
      "Written lesson material provides an alternative to audio explanations. Video captions are available only when supplied with the relevant media.",
  },
  {
    icon: Eye,
    title: "Text size and contrast",
    description:
      "Learners can adjust text size and enable high-contrast styling to improve readability.",
  },
  {
    icon: Keyboard,
    title: "Keyboard navigation",
    description:
      "Visible focus indicators and keyboard-operable controls help people navigate without relying solely on a mouse.",
  },
];

export default function AboutAccessibilityPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex min-h-11 items-center gap-2 text-blue-700 hover:underline"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to home
        </Link>

        <header className="mb-12 rounded-3xl border border-blue-100 bg-white p-7 sm:p-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
            <Heart size={17} aria-hidden="true" />
            Education for everyone
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Accessibility is part of how we learn.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            AccessLearn aims to make educational content easier to access
            and understand by offering flexible learning preferences,
            readable content, and alternative ways to engage with lessons.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/subjects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Explore lessons
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link
              href="/accessibility-settings"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Accessibility settings
            </Link>
          </div>
        </header>

        <section
          aria-labelledby="who-heading"
          className="mb-14"
        >
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Designed with different needs in mind
            </p>

            <h2
              id="who-heading"
              className="mt-3 text-3xl font-bold"
            >
              Who is AccessLearn for?
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              People learn and interact with technology in different ways.
              These features aim to reduce common barriers to learning.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {accessibilityFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-700">
                    <Icon size={25} aria-hidden="true" />
                  </div>

                  <h3 className="text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="tools-heading"
          className="mb-14 rounded-3xl border border-slate-200 bg-white p-7 sm:p-10"
        >
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Flexible learning
            </p>

            <h2
              id="tools-heading"
              className="mt-3 text-3xl font-bold"
            >
              Accessibility tools
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Use the tools available on the platform to choose a more
              comfortable learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {learningTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <article key={tool.title} className="flex gap-4">
                  <div className="h-fit rounded-xl bg-blue-50 p-3 text-blue-700">
                    <Icon size={23} aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">
                      {tool.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      {tool.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="commitment-heading"
          className="mb-14 rounded-3xl bg-blue-950 p-7 text-white sm:p-10"
        >
          <ShieldCheck
            size={34}
            className="mb-5 text-blue-200"
            aria-hidden="true"
          />

          <h2
            id="commitment-heading"
            className="text-3xl font-bold"
          >
            Accessibility is an ongoing commitment.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-blue-100">
            AccessLearn is designed to support inclusive learning, but
            not every feature will meet every person's needs. Screen
            readers, browser support, lesson content, and assistive
            technologies can affect the experience. Sign-language
            resources must be provided and verified before they can be
            considered available.
          </p>

          <Link
            href="/accessibility-settings"
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-950 hover:bg-blue-50"
          >
            Personalise your experience
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>

        <footer className="border-t border-slate-200 pt-7">
          <p className="text-sm leading-6 text-slate-600">
            Our goal is to make learning clearer, more flexible, and
            more inclusive. Accessibility improvements should be tested
            with people who use assistive technologies.
          </p>

          <div className="mt-5 flex flex-wrap gap-5">
            <Link
              href="/"
              className="font-semibold text-blue-700 hover:underline"
            >
              Home
            </Link>

            <Link
              href="/subjects"
              className="font-semibold text-blue-700 hover:underline"
            >
              Subjects
            </Link>

            <Link
              href="/my-learning"
              className="font-semibold text-blue-700 hover:underline"
            >
              My Learning
            </Link>

            <Link
              href="/accessibility-settings"
              className="font-semibold text-blue-700 hover:underline"
            >
              Accessibility Settings
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
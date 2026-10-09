"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  Subtitles,
  Volume2,
} from "lucide-react";

import { getAllLessons, getLesson, getSubject } from "@/data/lessons";
import {
  getCompletedLessons,
  markLessonComplete,
  saveLastLesson,
} from "@/lib/progress";

type LearningFormat = "Read" | "Listen" | "Captions" | "Sign Language";

export default function LessonPage() {
  const params = useParams<{
    subjectId: string;
    lessonId: string;
  }>();

  const subject = getSubject(params.subjectId);
  const lesson = getLesson(params.subjectId, params.lessonId);

  const [format, setFormat] = useState<LearningFormat>("Read");
  const [captionsVisible, setCaptionsVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [storageLoaded, setStorageLoaded] = useState(false);

  const allLessons = useMemo(() => getAllLessons(), []);

  const currentIndex = allLessons.findIndex(
    (item) =>
      item.subject.id === params.subjectId &&
      item.lesson.id === params.lessonId
  );

  const previousLesson =
    currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  useEffect(() => {
    if (!subject || !lesson) return;

    const key = `${subject.id}/${lesson.id}`;

    saveLastLesson(key);
    setCompleted(getCompletedLessons().includes(key));
    setStorageLoaded(true);

    return () => {
      if (
        typeof window !== "undefined" &&
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
      }
    };
  }, [subject, lesson]);

  useEffect(() => {
    if (
      format !== "Listen" &&
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [format]);

  if (!subject || !lesson) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
        <h1 className="mb-3 text-3xl font-bold">
          Lesson not found
        </h1>

        <p className="mb-6 text-slate-600">
          This lesson may not exist or its link may be incorrect.
        </p>

        <Link
          href="/subjects"
          className="font-bold text-blue-700 underline"
        >
          Browse subjects
        </Link>
      </main>
    );
  }

  const speakLesson = () => {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window) ||
      typeof SpeechSynthesisUtterance === "undefined"
    ) {
      if (typeof window !== "undefined") {
        window.alert(
          "Text-to-speech is not supported in this browser. Try a recent version of Chrome, Edge, or Safari."
        );
      }

      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const textToRead = lesson.sections
      .map((section) => `${section.heading}. ${section.content}`)
      .join(". ");

    const utterance = new SpeechSynthesisUtterance(textToRead);

    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const openTranscript = () => {
    setFormat("Captions");
    setCaptionsVisible(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  const submitQuiz = () => {
    if (selectedAnswer === null) return;

    setSubmitted(true);

    if (selectedAnswer === lesson.quiz.correctIndex) {
      markLessonComplete(`${subject.id}/${lesson.id}`);
      setCompleted(true);
    }
  };

  const progressLabel = completed
    ? "Lesson completed"
    : "Lesson in progress";

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/subjects/${subject.id}`}
          className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-700 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to {subject.title}
        </Link>

        {/* Lesson heading */}
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">
              {subject.title}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
              {lesson.duration}
            </span>

            {storageLoaded && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                {completed ? (
                  <CheckCircle2 size={15} aria-hidden="true" />
                ) : (
                  <CircleHelp size={15} aria-hidden="true" />
                )}

                {progressLabel}
              </span>
            )}
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {lesson.title}
          </h1>

          <p className="text-lg leading-8 text-slate-600">
            {lesson.summary}
          </p>
        </header>

        {/* UPDATED: Challenging video for Maths Fractions only */}
        {subject.id === "mathematics" &&
          lesson.id === "fractions" && (
            <section
              aria-labelledby="video-heading"
              className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-700">
                Go Beyond the Basics
              </p>

              <h2
                id="video-heading"
                className="text-xl font-bold text-slate-900"
              >
                Ready for a Challenge?
              </h2>

              <p className="mt-2 mb-4 leading-7 text-slate-600">
                Learn how to add fractions with different denominators.
                Watch the example, then use AccessLearn&apos;s learning
                tools to understand the concept at your own pace.
              </p>

              <div className="aspect-video overflow-hidden rounded-xl bg-slate-100">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/bcCLKACsYJ0"
                  title="Adding Fractions with Unlike Denominators"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Take your time. Replay the video whenever needed, then
                continue with the lesson and quiz below.
              </p>

              <a
                href="https://www.youtube.com/watch?v=bcCLKACsYJ0"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 py-2 font-semibold text-blue-800 underline underline-offset-4 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Watch directly on YouTube
              </a>
            </section>
          )}

        {/* Learning format selection */}
        <section
          aria-labelledby="format-heading"
          className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <h2 id="format-heading" className="mb-4 text-xl font-bold">
            Choose how you learn
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button
              type="button"
              onClick={() => setFormat("Read")}
              aria-pressed={format === "Read"}
              className={`min-h-12 rounded-xl border px-3 py-3 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                format === "Read"
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              <span aria-hidden="true">📖</span>
              <span className="ml-2">Read</span>
            </button>

            <button
              type="button"
              onClick={() => setFormat("Listen")}
              aria-pressed={format === "Listen"}
              className={`min-h-12 rounded-xl border px-3 py-3 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                format === "Listen"
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Headphones
                className="inline"
                size={18}
                aria-hidden="true"
              />
              <span className="ml-2">Listen</span>
            </button>

            <button
              type="button"
              onClick={openTranscript}
              aria-pressed={captionsVisible}
              className={`min-h-12 rounded-xl border px-3 py-3 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                captionsVisible
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Subtitles
                className="inline"
                size={18}
                aria-hidden="true"
              />
              <span className="ml-2">Transcript</span>
            </button>

            <button
              type="button"
              onClick={() => setFormat("Sign Language")}
              aria-pressed={format === "Sign Language"}
              className={`min-h-12 rounded-xl border px-3 py-3 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                format === "Sign Language"
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Volume2
                className="inline"
                size={18}
                aria-hidden="true"
              />
              <span className="ml-2">Sign language</span>
            </button>
          </div>

          {/* Text-to-speech */}
          {format === "Listen" && (
            <div className="mt-5 rounded-xl bg-blue-50 p-4">
              <p className="mb-3 font-semibold text-blue-950">
                Listen to this lesson using your browser&apos;s speech
                synthesis.
              </p>

              <button
                type="button"
                onClick={speakLesson}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {isSpeaking ? (
                  <Pause size={18} aria-hidden="true" />
                ) : (
                  <Play size={18} aria-hidden="true" />
                )}

                {isSpeaking ? "Stop listening" : "Listen to lesson"}
              </button>

              <p className="mt-3 text-sm leading-6 text-blue-950">
                Audio availability and voice quality depend on your
                browser and device. You can stop playback at any time.
              </p>
            </div>
          )}

          {/* Sign-language availability notice */}
          {format === "Sign Language" && (
            <section
              aria-labelledby="sign-language-unavailable-title"
              role="status"
              className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-950"
            >
              <div className="flex items-start gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-300 bg-white"
                >
                  <Volume2 size={22} className="text-amber-800" />
                </div>

                <div className="min-w-0">
                  <h3
                    id="sign-language-unavailable-title"
                    className="text-lg font-bold text-amber-950"
                  >
                    Sign-language video not yet available
                  </h3>

                  <p className="mt-2 leading-7 text-amber-950">
                    This lesson does not currently include a verified
                    Indian Sign Language (ISL) video. We will not display
                    a blank video box or suggest that a video exists
                    when it does not.
                  </p>

                  <p className="mt-2 leading-7 text-amber-950">
                    For now, you can use the written lesson and
                    transcript. An ISL video should be added and
                    reviewed by qualified sign-language contributors
                    before publication.
                  </p>

                  <button
                    type="button"
                    onClick={openTranscript}
                    className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg border border-amber-800 px-4 py-2 font-semibold text-amber-950 underline underline-offset-4 hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-900"
                  >
                    Read lesson transcript
                  </button>
                </div>
              </div>
            </section>
          )}
        </section>

        {/* Lesson content */}
        <article
          aria-label="Lesson content"
          className="mb-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
        >
          {lesson.sections.map((section, index) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-xl font-bold">
                {index + 1}. {section.heading}
              </h2>

              <p className="text-base leading-8 text-slate-700">
                {section.content}
              </p>
            </section>
          ))}
        </article>

        {/* Transcript */}
        {captionsVisible && (
          <section
            aria-labelledby="transcript-heading"
            className="mb-6 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8"
          >
            <h2
              id="transcript-heading"
              className="mb-4 text-xl font-bold"
            >
              Lesson transcript
            </h2>

            <p className="whitespace-pre-line text-base leading-8 text-slate-800">
              {lesson.transcript}
            </p>

            <button
              type="button"
              onClick={() => setCaptionsVisible(false)}
              className="mt-4 min-h-11 rounded-lg px-3 py-2 font-bold text-blue-800 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Hide transcript
            </button>
          </section>
        )}

        {/* Quiz */}
        <section
          aria-labelledby="quiz-heading"
          className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
        >
          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
              <CircleHelp size={23} aria-hidden="true" />
            </div>

            <div>
              <h2 id="quiz-heading" className="text-2xl font-bold">
                Check your understanding
              </h2>

              <p className="mt-1 leading-7 text-slate-600">
                Choose one answer, then check your result. You can retry
                as many times as you need.
              </p>
            </div>
          </div>

          <fieldset>
            <legend className="mb-4 text-lg font-bold leading-7">
              {lesson.quiz.question}
            </legend>

            <div className="space-y-3">
              {lesson.quiz.options.map((option, index) => {
                const isCorrectOption =
                  index === lesson.quiz.correctIndex;
                const isSelected = selectedAnswer === index;

                let optionStyle =
                  "border-slate-300 bg-white hover:bg-slate-50";

                if (isSelected) {
                  optionStyle = "border-blue-700 bg-blue-50";
                }

                if (submitted && isCorrectOption) {
                  optionStyle = "border-green-600 bg-green-50";
                } else if (submitted && isSelected && !isCorrectOption) {
                  optionStyle = "border-red-500 bg-red-50";
                }

                return (
                  <label
                    key={option}
                    className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-4 ${optionStyle}`}
                  >
                    <input
                      type="radio"
                      name="lesson-quiz"
                      value={index}
                      checked={selectedAnswer === index}
                      disabled={submitted}
                      onChange={() => setSelectedAnswer(index)}
                      className="mt-1 h-5 w-5 shrink-0 accent-blue-700"
                    />

                    <span className="leading-7">{option}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {submitted && (
            <div
              className={`mt-5 rounded-xl p-4 ${
                selectedAnswer === lesson.quiz.correctIndex
                  ? "bg-green-50 text-green-950"
                  : "bg-red-50 text-red-950"
              }`}
              role="status"
              aria-live="polite"
            >
              <h3 className="mb-2 font-bold">
                {selectedAnswer === lesson.quiz.correctIndex
                  ? "Correct! Well done."
                  : "Not quite. Try again."}
              </h3>

              <p className="leading-7">{lesson.quiz.explanation}</p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            {!submitted ? (
              <button
                type="button"
                onClick={submitQuiz}
                disabled={selectedAnswer === null}
                className="min-h-12 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check answer
              </button>
            ) : selectedAnswer !== lesson.quiz.correctIndex ? (
              <button
                type="button"
                onClick={resetQuiz}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-bold hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <RotateCcw size={18} aria-hidden="true" />
                Try again
              </button>
            ) : (
              <p className="inline-flex items-center gap-2 font-bold text-green-800">
                <CheckCircle2 size={20} aria-hidden="true" />
                Progress saved in this browser.
              </p>
            )}
          </div>
        </section>

        {/* Previous and next lesson navigation */}
        <nav
          aria-label="Lesson navigation"
          className="flex flex-col justify-between gap-3 sm:flex-row"
        >
          {previousLesson ? (
            <Link
              href={`/subjects/${previousLesson.subject.id}/lessons/${previousLesson.lesson.id}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Previous lesson
            </Link>
          ) : (
            <span />
          )}

          {nextLesson ? (
            <Link
              href={`/subjects/${nextLesson.subject.id}/lessons/${nextLesson.lesson.id}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Next lesson
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href="/subjects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Browse subjects
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
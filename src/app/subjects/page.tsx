"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  FlaskConical,
  Globe2,
  Monitor,
} from "lucide-react";
import { subjects } from "@/data/lessons";
import { getCompletedLessons } from "@/lib/progress";

const subjectIcons = {
  Calculator,
  FlaskConical,
  Monitor,
  BookOpen,
  Globe2,
};

export default function SubjectsPage() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(getCompletedLessons());
  }, []);

  const totalLessons = subjects.reduce(
    (total, subject) => total + subject.lessons.length,
    0,
  );

  const completedCount = completed.length;

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Home
        </Link>

        <header className="mb-8">
          <p className="mb-2 font-bold uppercase tracking-wider text-blue-700">
            Your learning space
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Explore subjects
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Choose a subject and learn through readable lessons, audio,
            transcripts, and interactive quizzes.
          </p>
        </header>

        <section
          aria-label="Learning progress"
          className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Your overall progress</h2>
            <span className="font-semibold text-blue-700">
              {completedCount} of {totalLessons} lessons completed
            </span>
          </div>

          <div
            className="h-3 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label="Overall learning progress"
            aria-valuemin={0}
            aria-valuemax={totalLessons}
            aria-valuenow={Math.min(completedCount, totalLessons)}
          >
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${Math.min((completedCount / totalLessons) * 100, 100)}%`,
              }}
            />
          </div>
        </section>

        <section aria-label="Available subjects">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const Icon =
                subjectIcons[subject.icon as keyof typeof subjectIcons] ??
                BookOpen;
              const subjectCompleted = subject.lessons.filter((lesson) =>
                completed.includes(`${subject.id}/${lesson.id}`),
              ).length;

              return (
                <article
                  key={subject.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon size={28} aria-hidden="true" />
                  </div>

                  <h2 className="mb-2 text-xl font-bold">{subject.title}</h2>
                  <p className="mb-5 flex-1 leading-7 text-slate-600">
                    {subject.description}
                  </p>

                  <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
                    <span>{subject.lessons.length} lessons</span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 size={16} aria-hidden="true" />
                      {subjectCompleted} completed
                    </span>
                  </div>

                  <Link
                    href={`/subjects/${subject.id}`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    Explore subject
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Target,
} from "lucide-react";
import { subjects, getAllLessons } from "@/data/lessons";
import {
  getCompletedLessons,
  getLastLesson,
} from "@/lib/progress";

export default function MyLearningPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lastLesson, setLastLesson] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCompletedLessons(getCompletedLessons());
    setLastLesson(getLastLesson());
    setLoaded(true);
  }, []);

  const allLessons = getAllLessons();
  const totalLessons = allLessons.length;

  const completedCount = allLessons.filter(({ subject, lesson }) =>
    completedLessons.includes(`${subject.id}/${lesson.id}`)
  ).length;

  const progress =
    totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

  const lastLessonParts = lastLesson?.split("/");
  const lastSubjectId = lastLessonParts?.[0];
  const lastLessonId = lastLessonParts?.[1];

  const continueLesson = allLessons.find(
    ({ subject, lesson }) =>
      subject.id === lastSubjectId && lesson.id === lastLessonId
  );

  const firstIncompleteLesson = allLessons.find(
    ({ subject, lesson }) =>
      !completedLessons.includes(`${subject.id}/${lesson.id}`)
  );

  const nextLesson = continueLesson ?? firstIncompleteLesson;

  if (!loaded) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <p role="status">Loading your learning progress...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-lg text-blue-700 hover:underline"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to home
        </Link>

        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
              <GraduationCap size={27} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700">
                YOUR LEARNING SPACE
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My Learning
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Track your progress, revisit completed lessons, and continue
            learning at your own pace.
          </p>
        </header>

        <section
          aria-label="Learning statistics"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-medium text-slate-600">
                Overall progress
              </span>
              <Target className="text-blue-700" size={22} aria-hidden="true" />
            </div>

            <p className="text-3xl font-bold">{progress}%</p>

            <div
              className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-label="Overall learning progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-blue-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-slate-600">
              {completedCount} of {totalLessons} lessons completed
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-medium text-slate-600">
                Completed lessons
              </span>
              <CheckCircle2
                className="text-green-700"
                size={22}
                aria-hidden="true"
              />
            </div>

            <p className="text-3xl font-bold">{completedCount}</p>
            <p className="mt-3 text-sm text-slate-600">
              Keep going, one lesson at a time.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-medium text-slate-600">
                Available lessons
              </span>
              <BookOpen
                className="text-purple-700"
                size={22}
                aria-hidden="true"
              />
            </div>

            <p className="text-3xl font-bold">
              {totalLessons - completedCount}
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Lessons remaining in your library.
            </p>
          </article>
        </section>

        <section className="mb-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-blue-800">
                <Clock size={16} aria-hidden="true" />
                Continue learning
              </div>

              <h2 className="text-2xl font-bold">
                {nextLesson
                  ? nextLesson.lesson.title
                  : "You've completed every lesson!"}
              </h2>

              <p className="mt-2 max-w-xl leading-7 text-slate-700">
                {nextLesson
                  ? "Pick up where you left off or explore your next lesson."
                  : "Excellent work! You can revisit any subject whenever you want."}
              </p>
            </div>

            {nextLesson ? (
              <Link
                href={`/subjects/${nextLesson.subject.id}/lessons/${nextLesson.lesson.id}`}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Continue lesson
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ) : (
              <Link
                href="/subjects"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Explore subjects
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            )}
          </div>
        </section>

        <section aria-labelledby="subjects-heading">
          <div className="mb-6">
            <h2 id="subjects-heading" className="text-2xl font-bold">
              Your subjects
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              See your progress in each learning area.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {subjects.map((subject) => {
              const completedInSubject = subject.lessons.filter((lesson) =>
                completedLessons.includes(`${subject.id}/${lesson.id}`)
              ).length;

              const subjectProgress =
                subject.lessons.length > 0
                  ? Math.round(
                      (completedInSubject / subject.lessons.length) * 100
                    )
                  : 0;

              return (
                <article
                  key={subject.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{subject.title}</h3>
                      <p className="mt-2 leading-6 text-slate-600">
                        {subject.description}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-800">
                      {subjectProgress}%
                    </span>
                  </div>

                  <div
                    className="h-2 overflow-hidden rounded-full bg-slate-200"
                    role="progressbar"
                    aria-label={`${subject.title} progress`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={subjectProgress}
                  >
                    <div
                      className="h-full rounded-full bg-blue-700"
                      style={{ width: `${subjectProgress}%` }}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-slate-600">
                      {completedInSubject} of {subject.lessons.length} completed
                    </p>

                    <Link
                      href={`/subjects/${subject.id}`}
                      className="inline-flex min-h-11 items-center gap-2 font-semibold text-blue-700 hover:underline"
                    >
                      View lessons
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <Link
            href="/subjects"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-blue-700 hover:underline"
          >
            Browse all subjects
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
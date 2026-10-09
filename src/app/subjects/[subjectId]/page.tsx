"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { getSubject } from "@/data/lessons";
import { getCompletedLessons } from "@/lib/progress";

export default function SubjectDetailPage() {
  const params = useParams<{ subjectId: string }>();
  const subject = getSubject(params.subjectId);

  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(getCompletedLessons());
  }, []);

  if (!subject) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
        <h1 className="mb-3 text-3xl font-bold">Subject not found</h1>
        <p className="mb-6 text-slate-600">
          This subject may not exist or the link may be incorrect.
        </p>
        <Link className="font-bold text-blue-700 underline" href="/subjects">
          Browse all subjects
        </Link>
      </main>
    );
  }

  const completedCount = subject.lessons.filter((lesson) =>
    completed.includes(`${subject.id}/${lesson.id}`),
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/subjects"
          className="mb-8 inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          All subjects
        </Link>

        <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="mb-2 font-bold uppercase tracking-wider text-blue-700">
            Subject overview
          </p>
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
            {subject.title}
          </h1>
          <p className="mb-6 max-w-2xl text-lg leading-8 text-slate-600">
            {subject.description}
          </p>

          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <span className="font-semibold">
              {completedCount} of {subject.lessons.length} completed
            </span>
            <span className="text-sm text-slate-600">
              {Math.round((completedCount / subject.lessons.length) * 100)}%
            </span>
          </div>

          <div
            className="h-3 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label={`${subject.title} progress`}
            aria-valuemin={0}
            aria-valuemax={subject.lessons.length}
            aria-valuenow={completedCount}
          >
            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: `${(completedCount / subject.lessons.length) * 100}%`,
              }}
            />
          </div>
        </header>

        <section aria-labelledby="lessons-heading">
          <h2 id="lessons-heading" className="mb-4 text-2xl font-bold">
            Lessons
          </h2>

          <ol className="space-y-4">
            {subject.lessons.map((lesson, index) => {
              const isComplete = completed.includes(
                `${subject.id}/${lesson.id}`,
              );

              return (
                <li key={lesson.id}>
                  <Link
                    href={`/subjects/${subject.id}/lessons/${lesson.id}`}
                    className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-800">
                      {isComplete ? (
                        <CheckCircle2 size={24} aria-label="Completed" />
                      ) : (
                        <BookOpen size={23} aria-hidden="true" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-sm font-semibold text-slate-500">
                        Lesson {index + 1} · {lesson.duration}
                      </p>
                      <h3 className="text-lg font-bold">{lesson.title}</h3>
                      <p className="mt-1 leading-6 text-slate-600">
                        {lesson.summary}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-blue-700">
                        {isComplete ? "Completed · Review lesson" : "Start lesson"}
                      </p>
                    </div>

                    <ArrowRight
                      size={20}
                      className="shrink-0 text-slate-500 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="mt-8 flex items-center gap-2 text-sm leading-6 text-slate-600">
          <Circle size={15} aria-hidden="true" />
          Your completed lessons are saved in this browser.
        </div>
      </div>
    </main>
  );
}
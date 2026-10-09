const PROGRESS_KEY = "accesslearn-completed-lessons";
const LAST_LESSON_KEY = "accesslearn-last-lesson";

export function getCompletedLessons(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function markLessonComplete(lessonKey: string): void {
  if (typeof window === "undefined") return;

  const completed = getCompletedLessons();

  if (!completed.includes(lessonKey)) {
    localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify([...completed, lessonKey]),
    );
  }
}

export function saveLastLesson(lessonKey: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LAST_LESSON_KEY, lessonKey);
  } catch {
    // Learning remains usable if browser storage is unavailable.
  }
}

export function getLastLesson(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(LAST_LESSON_KEY);
  } catch {
    return null;
  }
}

export function getProgressPercentage(): number {
  const totalLessons = 25;
  return Math.round((getCompletedLessons().length / totalLessons) * 100);
}
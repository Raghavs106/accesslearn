import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center text-slate-900">
      <h1 className="text-6xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page not found
      </h2>

      <p className="mt-3 max-w-md text-base leading-7 text-slate-600">
        Sorry, we could not find the page you are looking for.
        Return home or explore available subjects.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Back to Home
        </Link>

        <Link
          href="/subjects"
          className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-100"
        >
          Explore Subjects
        </Link>
      </div>
    </main>
  );
}
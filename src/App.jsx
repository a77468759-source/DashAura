
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ThemeProvider from "./components/common/ThemeProvider";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));

function NotFound() {
  return (
    <section className="mx-auto max-w-lg py-20 text-center" aria-labelledby="not-found-heading">
      <p className="text-sm font-semibold text-violet-700">404 error</p>
      <h2 id="not-found-heading" className="mt-3 text-3xl font-semibold text-ink">Page not found</h2>
      <p className="mt-2 text-sm text-slate-600">The page you’re looking for doesn’t exist or may have moved.</p>
      <Link className="mt-6 inline-flex rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800" to="/">Return to overview</Link>
    </section>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="p-8 text-sm text-slate-600" role="status" aria-live="polite">Loading workspace…</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

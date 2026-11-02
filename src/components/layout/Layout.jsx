import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="min-h-screen bg-canvas text-ink md:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Header />
        <main id="main-content" className="mx-auto w-full max-w-[1500px] px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
        <footer className="border-t border-slate-200 px-4 py-4 text-center text-xs text-slate-500 md:px-8">© 2026 Dashaura. One Workspace. Complete Control.</footer>
      </div>
    </div>
  );
}

export default Layout;

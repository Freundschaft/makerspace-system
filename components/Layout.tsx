import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const SIDEBAR_TOGGLE_ID = "app-sidebar-toggle";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(132,178,121,0.18),transparent_38%),radial-gradient(circle_at_90%_90%,rgba(240,136,9,0.12),transparent_42%)]" />
      <input
        id={SIDEBAR_TOGGLE_ID}
        type="checkbox"
        className="peer sr-only xl:hidden"
        aria-hidden="true"
      />
      <Header menuToggleId={SIDEBAR_TOGGLE_ID} />
      <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-[18.5rem] -translate-x-full border-r border-sidebar-border/50 bg-sidebar text-sidebar-foreground shadow-xl transition-transform duration-300 ease-in-out peer-checked:translate-x-0 xl:translate-x-0">
        <Sidebar menuToggleId={SIDEBAR_TOGGLE_ID} />
      </aside>
      <label
        htmlFor={SIDEBAR_TOGGLE_ID}
        className="fixed inset-0 z-20 hidden bg-black/45 peer-checked:block xl:hidden"
        aria-label="Close navigation"
      />
      <main className="xl:pl-[18.5rem]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-5 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

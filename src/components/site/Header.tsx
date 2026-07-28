import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronRight, ShieldCheck } from "lucide-react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft",
      )}
    >
      <div className="container-x flex h-16 items-center gap-6 md:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <span className={cn(
            "grid h-9 w-9 place-items-center rounded-lg gradient-primary shadow-glow transition-transform group-hover:scale-105",
          )}>
            <ShieldCheck className="h-5 w-5 text-white" />
          </span>
          <span className={cn(
            "flex flex-col leading-none",
            transparent ? "text-white" : "text-ink",
          )}>
            <span className="font-display text-lg font-extrabold tracking-tight">iSmart</span>
            <span className={cn("text-[10px] font-medium uppercase tracking-widest", transparent ? "text-white/70" : "text-ink-soft")}>Digital Tech</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  transparent
                    ? active
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                    : active
                      ? "text-primary bg-primary/10"
                      : "text-ink-soft hover:text-ink hover:bg-muted",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={site.phoneLink}
            className={cn(
              "hidden md:inline-flex text-sm font-medium",
              transparent ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-primary",
            )}
          >
            {site.phone}
          </a>
          <Link
            to="/quote"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover-lift"
          >
            Request Quote
            <ChevronRight className="h-4 w-4" />
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={cn(
              "lg:hidden grid h-10 w-10 place-items-center rounded-md",
              transparent ? "text-white hover:bg-white/10" : "text-ink hover:bg-muted",
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="absolute inset-0 bg-night/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[86%] max-w-sm bg-background shadow-elevated transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between p-5 border-b border-border">
            <span className="font-display text-lg font-bold">Menu</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-md hover:bg-muted">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-3 flex flex-col">
            {nav.map((item) => {
              const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-4 py-3 rounded-md text-base font-medium transition-colors",
                    active ? "text-primary bg-primary/10" : "text-ink hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/quote"
              className="mt-3 inline-flex items-center justify-center rounded-full gradient-primary px-4 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Request Quote
            </Link>
            <a href={site.phoneLink} className="mt-2 text-center text-sm text-ink-soft py-2">{site.phone}</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

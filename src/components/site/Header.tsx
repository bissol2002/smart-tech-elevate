import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Phone, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Solutions", to: "/solutions", caret: true },
  { label: "Brands", to: "/brands" },
  { label: "Projects", to: "/projects" },
  { label: "Why Choose Us", to: "/industries" },
  { label: "Contact", to: "/contact" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-start gap-2.5 shrink-0 group">
      <span className="grid h-10 w-10 place-items-center rounded-lg gradient-primary shadow-glow transition-transform group-hover:scale-105">
        <ShieldCheck className="h-5 w-5 text-white" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-xl font-extrabold tracking-tight text-ink">
          i<span className="text-primary">Smart</span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wide text-primary">Digital Technology</span>
        <span className="hidden xl:block text-[9px] text-ink-soft">
          Smart Security. Intelligent Networking. Reliable Solutions.
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-background transition-shadow",
        scrolled ? "shadow-soft border-b border-border" : "border-b border-border/60",
      )}
    >
      <div className="container-x flex h-[72px] items-center gap-6 md:h-20">
        <Logo />

        <nav className="ml-auto hidden lg:flex items-center gap-1">
          {mainNav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-ink hover:text-primary",
                )}
              >
                {item.label}
                {item.caret && <ChevronDown className="h-3.5 w-3.5" />}
                {active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-4">
          <a href={site.phoneLink} className="hidden md:flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-primary">
              <Phone className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-ink">{site.phone}</span>
              <span className="block text-[10px] text-ink-soft">Call Us Anytime</span>
            </span>
          </a>
          <Link
            to="/quote"
            className="hidden sm:inline-flex items-center rounded-md gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover-lift"
          >
            Request a Quote
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-md text-ink hover:bg-muted"
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
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-md hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-3 flex flex-col">
            {mainNav.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
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
              className="mt-3 inline-flex items-center justify-center rounded-md gradient-primary px-4 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Request a Quote
            </Link>
            <a href={site.phoneLink} className="mt-2 text-center text-sm text-ink-soft py-2">
              {site.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

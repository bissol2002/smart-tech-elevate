import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ArrowRight, Sun, Moon } from "lucide-react";
import { useSite } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/ismart-logo.webp";


const mainNav = [
  { label: "Solutions", to: "/solutions" },
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "Projects", to: "/projects" },
  { label: "Brands", to: "/brands" },
  { label: "Resources", to: "/resources" },
  { label: "Company", to: "/about" },
  { label: "Contact", to: "/contact" },
];


function Logo() {
  return (
    <Link to="/" className="flex items-center shrink-0 group" aria-label="iSmart Digital Tech — home">
      <img
        src={logoUrl}
        alt="iSmart Digital Tech Ltd — Smart Solutions, Digital Future"
        width={200}
        height={64}
        className="h-12 w-auto md:h-14 transition-transform group-hover:scale-[1.03]"
      />
    </Link>
  );
}


export function Header() {
  const site = useSite();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try { localStorage.setItem("ismart-theme", next ? "dark" : "light"); } catch { /* Storage can be unavailable. */ }
  };

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
                  "relative inline-flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-ink hover:text-primary",
                )}
              >
                {item.label}
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
            className="btn-lime hidden sm:inline-flex px-5 py-2.5 text-[11px] uppercase"
          >
            Request Assessment <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <CartDrawer />
          <Button
            type="button"
            variant="ghost"
            role="switch"
            aria-checked={dark}
            aria-label="Dark mode"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="h-10 w-[62px] shrink-0 rounded-full border border-border bg-muted p-1 hover:bg-accent"
          >
            <span className="relative flex h-7 w-full items-center justify-between text-ink-soft">
              <Sun className="relative z-10 h-3.5 w-3.5 ml-1" />
              <Moon className="relative z-10 h-3.5 w-3.5 mr-1" />
              <span className={cn("absolute top-0 h-7 w-7 rounded-full bg-background shadow-soft transition-transform", dark ? "translate-x-[26px]" : "translate-x-0")} />
            </span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-md text-ink hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </Button>
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
            <Button
              type="button"
              variant="ghost"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-md hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-3 flex flex-col">
            {mainNav.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-4 py-3.5 rounded-md text-base font-medium transition-colors",
                    active ? "text-primary bg-primary/10" : "text-ink hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/quote"
              className="btn-lime mt-3 justify-center px-4 py-3.5 text-xs uppercase"
            >
              Request Assessment <ArrowRight className="h-4 w-4" />
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

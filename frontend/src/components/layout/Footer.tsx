import { Ruler, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES, APP_NAME, APP_VERSION } from "@/constants";
import { cn } from "@/utils";

const footerLinks = [
  { label: "Height", path: ROUTES.HEIGHT },
  { label: "Weight", path: ROUTES.WEIGHT },
  { label: "Volume", path: ROUTES.VOLUME },
  { label: "Currency", path: ROUTES.CURRENCY },
  { label: "Planet Gravity", path: ROUTES.PLANET_GRAVITY },
];

const techStack = ["React 19", "TypeScript", "Tailwind CSS", "Node.js", "Express"];

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-[var(--color-border)] bg-[var(--color-background)] mt-auto", className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-primary-500)] transition-colors">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white">
                <Ruler size={14} />
              </div>
              <span className="font-semibold text-sm">{APP_NAME}</span>
            </Link>
            <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed max-w-xs">
              Convert measurements instantly with speed and precision. Free &amp; open source.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Converters</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Built with */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Built with</h4>
            <ul className="space-y-2">
              {techStack.map((tech) => (
                <li key={tech} className="text-sm text-[var(--color-text-tertiary)]">{tech}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--color-text-tertiary)]">&copy; {year} {APP_NAME}. All rights reserved.</p>
          <p className="text-xs text-[var(--color-text-tertiary)]">v{APP_VERSION}</p>
        </div>
      </div>
    </footer>
  );
}

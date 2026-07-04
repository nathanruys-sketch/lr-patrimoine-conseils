import Link from "next/link";
import { Mail, Phone, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CONTACT, LEGAL, NAV_ITEMS, SITE } from "@/lib/constants";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="#top" className="flex items-center gap-2.5">
              <Avatar className="size-8">
                <AvatarImage src="/ludovic-ruys.jpg" alt="Ludovic Ruys" />
                <AvatarFallback className="rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </AvatarFallback>
              </Avatar>
              <span className="font-heading text-[1.05rem] font-semibold tracking-tight">
                {SITE.shortName}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-3.5 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-3.5 shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li className="pt-1 text-sm text-muted-foreground">{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {LEGAL.company} — {LEGAL.rcs}
          </p>
          <p>
            {LEGAL.orias} · {LEGAL.acpr} · {LEGAL.anacofi}
          </p>
        </div>
      </div>
    </footer>
  );
}

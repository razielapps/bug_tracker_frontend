"use client";

import { 
  Bug, 
  Code, 
  Github, 
  Mail, 
  MessageSquare, 
  FileText, 
  Info,
  Shield,
  Heart
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

// Define the link type
interface FooterLink {
  href: string;
  label: string;
  icon: ReactNode | null;
  external?: boolean;
}

// Define the section type
interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks: FooterSection[] = [
    {
      title: "Product",
      links: [
        { href: "/dashboard", label: "Dashboard", icon: null },
        { href: "/dashboard/bugs", label: "Issues", icon: null },
        { href: "/info", label: "Features", icon: <Info className="h-3 w-3" /> },
        { href: "/feedback", label: "Feedback", icon: <MessageSquare className="h-3 w-3" /> },
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "https://github.com/razielapps", label: "GitHub", icon: <Github className="h-3 w-3" />, external: true },
        { href: "https://x.com/cyborg0720", label: "Twitter/X", icon: null, external: true },
        { href: "mailto:avtconscience@gmail.com", label: "Contact", icon: <Mail className="h-3 w-3" />, external: true },
      ]
    },
    {
      title: "Legal",
      links: [
        { href: "#", label: "Privacy Policy", icon: <Shield className="h-3 w-3" /> },
        { href: "#", label: "Terms of Service", icon: <FileText className="h-3 w-3" /> },
      ]
    }
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="github-container">
        {/* Main Footer Content */}
        <div className="py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                  <Bug className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-bold text-foreground">OurBugTracker</span>
                  <p className="text-xs text-muted-foreground mt-1">Professional bug tracking</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                A full-stack bug tracking solution built with Django & Next.js
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Heart className="h-3 w-3 text-primary" />
                <span>Made with passion by</span>
                <Code className="h-3 w-3" />Conscience
              </div>
            </div>

            {/* Links Columns */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-foreground mb-4 text-sm">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          {link.icon && (
                            <span className="group-hover:scale-110 transition-transform">
                              {link.icon}
                            </span>
                          )}
                          <span>{link.label}</span>
                          {link.external && (
                            <span className="text-xs opacity-50">↗</span>
                          )}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          {link.icon && (
                            <span className="group-hover:scale-110 transition-transform">
                              {link.icon}
                            </span>
                          )}
                          <span>{link.label}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            © {currentYear} OurBugTracker. All rights reserved.
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Version 1.0</span>
              <span className="hidden md:inline">•</span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/razielapps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <Github className="h-3 w-3" />
                <span>GitHub</span>
              </a>
              
              <a 
                href="https://x.com/cyborg0720" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hidden sm:inline-flex items-center gap-1"
              >
                <span>Twitter</span>
              </a>
              
              <a 
                href="mailto:avtconscience@gmail.com" 
                className="hover:text-primary transition-colors hidden sm:inline-flex items-center gap-1"
              >
                <Mail className="h-3 w-3" />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
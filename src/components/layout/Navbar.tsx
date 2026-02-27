"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User, Briefcase, Eye, Layout } from 'lucide-react';

const navItems = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Preview', href: '/preview', icon: Eye },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
          <Layout className="h-6 w-6" />
          <span>ResumeKeeper</span>
        </Link>
        <div className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith(item.href) ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
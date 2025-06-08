'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from './nav-items';
import Image from 'next/image';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-20 border-r bg-slate-50 flex flex-col items-center py-6">
      <div className="mb-20 flex flex-col items-center gap-1">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        <span className="text-xs font-bold text-primary">OCTOM.</span>
      </div>

      <nav className="flex flex-col items-center gap-6">
        {navItems.map(({ icon: Icon, href }) => {
          const isActive = pathname === href;

          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  'p-3 rounded-xl transition-all',
                  isActive
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

import {
  LayoutDashboard,
  Settings,
  Send,
  PlusSquare,
  SquareKanban,
} from 'lucide-react';

export const navItems = [
  { href: '/', icon: LayoutDashboard },
  { href: '/tasks', icon: SquareKanban },
  { href: '/settings', icon: Settings },
  { href: '/send', icon: Send },
  { href: '/add', icon: PlusSquare },
];

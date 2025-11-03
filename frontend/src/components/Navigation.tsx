'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Brain, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/technology', label: 'Technology' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Brain className="h-8 w-8 text-[#2D336B] transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#2D336B]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="ml-2 text-xl font-bold text-[#2D336B] tracking-tight">NeuroVED</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-[#2D336B] bg-[#2D336B]/10"
                    : "text-[#7886C7] hover:text-[#2D336B] hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              className="ml-4 bg-gradient-to-r from-[#2D336B] to-[#1E2245] hover:from-[#1E2245] hover:to-[#0F1122] text-white shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-[#2D336B]" />
              ) : (
                <Menu className="h-6 w-6 text-[#2D336B]" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-[#2D336B] bg-[#2D336B]/10 shadow-sm"
                    : "text-[#7886C7] hover:text-[#2D336B] hover:bg-gray-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button 
                className="w-full bg-gradient-to-r from-[#2D336B] to-[#1E2245] hover:from-[#1E2245] hover:to-[#0F1122] text-white shadow-lg"
                onClick={() => {
                  setIsOpen(false);
                  handleGetStarted();
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
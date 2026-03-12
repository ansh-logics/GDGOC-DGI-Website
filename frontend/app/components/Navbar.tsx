"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import BubbleMenu from '@/components/BubbleMenu';
import { useAuth } from '@/app/context/AuthContext';

const bubbleMenuItems = [
  {
    label: 'About',
    href: '#about',
    ariaLabel: 'About GDG',
    rotation: -8,
    hoverStyles: { bgColor: '#4285F4', textColor: '#ffffff' }
  },
  {
    label: 'Events',
    href: '/events',
    ariaLabel: 'Our Events',
    rotation: 8,
    hoverStyles: { bgColor: '#EA4335', textColor: '#ffffff' }
  },
  {
    label: 'Team',
    href: '#team',
    ariaLabel: 'Meet the Team',
    rotation: -6,
    hoverStyles: { bgColor: '#FBBC04', textColor: '#111' }
  },
  {
    label: 'Blog',
    href: '/blog',
    ariaLabel: 'Read our Blog',
    rotation: 6,
    hoverStyles: { bgColor: '#34A853', textColor: '#ffffff' }
  },
];

const navBtnClass =
  'rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-0';

const Navbar = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [showBubbleMenu, setShowBubbleMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatches by only using the resolved theme after mount
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === 'dark';

  return (
    <>
      <Link href="/">
        <div className="fixed top-6 left-6 z-[150] bg-white dark:bg-gray-800 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] px-6 py-3 cursor-pointer">
          <img src="/gdg-logo.svg" alt="GDG" className="h-6 w-auto" />
        </div>
      </Link>

      <BubbleMenu
        logo={
          <div className="hidden" />
        }
        items={bubbleMenuItems}
        menuBg={isDark ? '#1f2937' : '#ffffff'}
        menuContentColor={isDark ? '#ffffff' : '#111827'}
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.08}
        onMenuClick={(open) => setShowBubbleMenu(open)}
        className={`top-6 left-auto justify-end ${mounted && !user ? 'right-60' : 'right-32'}`}
      />

      <div className="fixed top-6 right-6 z-[150] flex items-center gap-2">
        {mounted && (
          <>
            {user ? (
              <Link
                href="/profile"
                className={navBtnClass}
                aria-label="Your profile"
              >
                Profile
              </Link>
            ) : (
              <>
                <Link
                  href="/signup?mode=login"
                  className={navBtnClass}
                  aria-label="Sign in"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`${navBtnClass} bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white`}
                  aria-label="Sign up"
                >
                  Sign up
                </Link>
              </>
            )}
          </>
        )}
        <AnimatedThemeToggler />
      </div>

      <style jsx global>{`
        /* Make burger button same size as theme toggle */
        .bubble.toggle-bubble.menu-btn {
          width: 40px !important;
          height: 40px !important;
        }
        
        /* Hide the logo bubble since we're showing logo separately */
        .bubble.logo-bubble {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;


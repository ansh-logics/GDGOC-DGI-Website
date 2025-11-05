"use client";

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import BubbleMenu from '@/components/BubbleMenu';

const Navbar = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showBubbleMenu, setShowBubbleMenu] = useState(false);

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
      href: '#blog',
      ariaLabel: 'Read our Blog',
      rotation: 6,
      hoverStyles: { bgColor: '#34A853', textColor: '#ffffff' }
    },
  ];

  return (
    <>
      {/* Logo - positioned at top left */}
      <div className="fixed top-6 left-6 z-[150] bg-white dark:bg-gray-800 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] px-6 py-3">
        <img src="/gdg-logo.svg" alt="GDG" className="h-6 w-auto" />
      </div>

      {/* BubbleMenu - burger button positioned at top right */}
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
        className="top-6 right-16 left-auto justify-end"
      />
      
      {/* Theme Toggle - positioned at top right, next to burger */}
      <div className="fixed top-6 right-6 z-[150]">
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


// Standardized hover and interaction animations for consistent UX
// Use these preset animations to maintain design consistency across components

import type { MotionProps } from "framer-motion";

// Standard timing values
export const TIMING = {
  fast: 0.1,
  normal: 0.15,
  slow: 0.2,
  icon: 0.2,
} as const;

// Standard easing curves
export const EASING = {
  smooth: "easeOut",
  bounce: "easeInOut",
  sharp: "easeIn",
} as const;

// Reusable animation presets
export const animations = {
  // Button-like elements (buttons, CTAs, cards)
  button: {
    whileHover: {
      scale: 1.05,
      transition: { duration: TIMING.normal, ease: EASING.smooth }
    },
    whileTap: {
      scale: 0.95,
      transition: { duration: TIMING.fast }
    }
  } as MotionProps,

  // Navigation links and text links
  navLink: {
    whileHover: {
      scale: 1.05,
      y: -1,
      transition: { duration: TIMING.normal, ease: EASING.smooth }
    },
    whileTap: {
      scale: 0.95,
      transition: { duration: TIMING.fast }
    }
  } as MotionProps,

  // Mobile navigation items
  mobileNavLink: {
    whileHover: {
      scale: 1.02,
      x: 4,
      transition: { duration: TIMING.normal }
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: TIMING.fast }
    }
  } as MotionProps,

  // Interactive cards and containers
  card: {
    whileHover: {
      scale: 1.02,
      y: -2,
      transition: { duration: TIMING.normal, ease: EASING.smooth }
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: TIMING.fast }
    }
  } as MotionProps,

  // Icons and small interactive elements
  icon: {
    whileHover: {
      rotate: [0, -10, 10, 0],
      transition: { duration: TIMING.icon, ease: EASING.bounce }
    }
  } as MotionProps,

  // Subtle hover for badges and status elements
  subtle: {
    whileHover: {
      scale: 1.02,
      transition: { duration: TIMING.normal }
    }
  } as MotionProps,

  // Images and media elements
  media: {
    whileHover: {
      scale: 1.02,
      y: -2,
      transition: { duration: TIMING.slow }
    }
  } as MotionProps,
} as const;

// CSS class utilities for hover effects (to complement Framer Motion)
export const hoverClasses = {
  // Standard button hover effects
  button: "transition-all duration-150 hover:scale-105 hover:shadow-lg active:scale-95",

  // Navigation link effects
  navLink: "transition-all duration-200 hover:text-primary hover:scale-105",

  // Card hover effects
  card: "transition-all duration-200 hover:shadow-lg hover:-translate-y-1",

  // Subtle hover effects
  subtle: "transition-all duration-150 hover:scale-102",

  // Media hover effects
  media: "transition-all duration-300 hover:scale-102 hover:-translate-y-1",
} as const;

// Usage examples:
/*
// For Framer Motion components:
<motion.button {...animations.button}>Click me</motion.button>

// For CSS-only components:
<button className={hoverClasses.button}>Click me</button>

// For custom timing:
<motion.div
  whileHover={{
    scale: 1.05,
    transition: { duration: TIMING.normal, ease: EASING.smooth }
  }}
>
  Custom element
</motion.div>
*/
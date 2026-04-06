/**
 * DATA.JS — Centralized text and image URLs for the landing page.
 */

const DATA = {
  hero: {
    eyebrow: "▶ EARLY ACCESS — FREE",
    title: "PRODUCTIVITISM",
    subtitle: "Life-maxxing for multitalented individuals.",
    body: "You're a jack-of-all-trades juggling multiple identities. Create pixel-art characters for each role, turn habits into quests, and escape decision paralysis by focusing on one character at a time. Level up your real life.",
    ctaLead: "Begin Your Quest →",
    appStoreUrl: "#download",
    googlePlayUrl: "#download",
    sprite: {
      base: "assets/sprites/base/base.png",
      skin: "assets/sprites/skin/skin_tone.png",
      hair: "assets/sprites/hair/hair.png",
      tops: "assets/sprites/tops/tops.png",
      bottoms: "assets/sprites/bottoms/bottoms.png",
      shoes: "assets/sprites/shoes/shoes.png"
    }
  },
  features: {
    label: "Your real-life party",
    title: "BUILD MULTIPLE IDENTITIES",
    subtitle: "Stop mixing up your roles. Each character represents a different part of who you are — The Developer, The Athlete, The Creator, The Student. Level them up independently.",
    items: [
      {
        id: "feat-rituals",
        badge: "+XP",
        title: "DAILY RITUALS",
        description: "Build streaks on habits tied to each character. Every check-in earns XP and moves your character closer to the next level.",
        details: [
          "Three habit types: Check (binary), Count (reps), Measure (tracked amounts)",
          "Assign habits to specific characters — separate your skill trees",
          "Streak tracking prevents decision paralysis: pick one character per day",
          "Daily, weekly, or custom frequency targets",
          "XP reward scales with streak length"
        ]
      },
      {
        id: "feat-quests",
        badge: "+XP",
        title: "QUEST BOARD",
        description: "Frame your goals as quests. Assign tasks to characters, set difficulty ratings (1–10), and earn XP for completion.",
        details: [
          "Difficulty slider (1–10) scales XP reward",
          "Subtask breakdowns for complex projects",
          "Voice memo notes on any quest",
          "Due date chips and overdue warnings",
          "Link tasks to the character role they belong to"
        ]
      },
      {
        id: "feat-focus",
        badge: "+XP",
        title: "COZY FOCUS ROOM",
        description: "Enter deep focus without burnout. Sit your character in a pixel-art sanctuary with ambient soundscapes. ADHD-friendly and streak-proof.",
        details: [
          "Two modes: Countdown (Pomodoro-style) and Endurance (open-ended)",
          "Layered pixel art study room with customizable ambience",
          "Your character earns XP alongside you",
          "Focus minutes tracked per character",
          "Live Activity on iOS lock screen"
        ]
      },
      {
        id: "feat-chars",
        badge: "+XP",
        title: "CHARACTER SYSTEM",
        description: "Create pixel art avatars for each life role. Customize them, unlock cosmetics, and watch your real-life stat distribution.",
        details: [
          "12 classes tied to real-life archetypes (Developer, Athlete, Scholar, etc.)",
          "Layered sprite customization: skin, hair, outfit, accessories",
          "Unlock cosmetics via habits, tasks, and focus sessions",
          "Full lore page per character with activity history",
          "See your stat distribution across all roles"
        ]
      },
      {
        id: "feat-voice",
        badge: "LOG",
        title: "VOICE MEMOS",
        description: "Record thoughts directly on tasks or as standalone notes. Perfect for brain-dumping, progress logs, or idea capture.",
        details: [
          "One-tap record from the home tab",
          "Attach memos to any task or quest",
          "Rename and organize recordings",
          "Stored locally on your device",
          "Link to characters for context"
        ]
      },
      {
        id: "feat-sync",
        badge: "SYNC",
        title: "SYNC & OFFLINE",
        description: "Works fully offline. Sign in to sync your data across devices seamlessly — pick up right where you left off.",
        details: [
          "Full offline-first functionality",
          "Optional cloud sync via account",
          "Apple & Google Sign-In supported",
          "Guest mode with no account required",
          "Auto-sync in background"
        ]
      }
    ]
  },
  gallery: {
    label: "See it in action",
    title: "TURN MULTIPLE ROLES INTO A PARTY",
    subtitle: "Create characters for each identity. Assign habits and quests. Watch your stat distribution across all roles.",
    screenshots: [
      {
        src: "assets/screenshots/screenshot-1.jpeg",
        alt: "Home screen with character and daily stats"
      },
      {
        src: "assets/screenshots/screenshot-2.jpeg",
        alt: "Quest board with tasks and difficulty ratings"
      },
      {
        src: "assets/screenshots/screenshot-3.jpeg",
        alt: "Habit tracking with streaks and XP rewards"
      },
      {
        src: "assets/screenshots/screenshot-4.jpeg",
        alt: "Deep focus sanctuary with ambient study room"
      }
    ]
  },
  download: {
    label: "Start Today",
    title: "BEGIN YOUR QUEST",
    subtitle: "Free during Early Access. No credit card required.",
    tagline: "Free during Early Access",
    appStoreUrl: "#download",
    googlePlayUrl: "#download",
    appStoreText: "COMING SOON",
    googlePlayText: "COMING SOON"
  },
  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "Guide", href: "#guide" },
      { label: "Classes", href: "#classes" },
      { label: "Download", href: "#download" }
    ]
  },
  footer: {
    copyright: "© 2026 Productivitism. All rights reserved.",
    links: [
      { label: "Privacy", href: "privacy.html" },
      { label: "Terms", href: "terms.html" }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DATA;
}

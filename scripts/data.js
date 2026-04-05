/**
 * DATA.JS — Centralized text and image URLs for the landing page.
 */

const DATA = {
  hero: {
    eyebrow: "▶ EARLY ACCESS — FREE",
    title: "PRODUCTIVISM",
    subtitle: "Life-maxxing for multitalented individuals..",
    body: "Track habits. Complete quests. Enter deep focus. Level up your character while leveling up your life — one day at a time.",
    ctaLead: "Learn More →",
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
    label: "What you get",
    title: "YOUR TOOLS FOR GROWTH",
    subtitle: "Three interconnected systems — habits feed your character, tasks reward your progress, and focus sessions keep you in the zone.",
    items: [
      {
        id: "feat-rituals",
        badge: "+XP",
        title: "DAILY RITUALS",
        description: "Build streaks, earn XP, and watch your stats grow. Habits are linked to characters — every check-in makes them stronger.",
        details: [
          "Streak tracking with full history log",
          "Types: check-in, count, measure",
          "Assign habits to specific characters",
          "Daily, weekly, or custom frequency",
          "XP reward scales with streak length"
        ]
      },
      {
        id: "feat-quests",
        badge: "+XP",
        title: "QUEST BOARD",
        description: "Tasks as quests — with difficulty ratings, due dates, subtasks, and voice memos. The harder the quest, the more XP you earn.",
        details: [
          "Difficulty slider (1–10) scales XP reward",
          "Voice memo notes on any task",
          "Subtask breakdowns",
          "Due date chips and overdue warnings",
          "Link tasks to your characters"
        ]
      },
      {
        id: "feat-focus",
        badge: "+XP",
        title: "THE SANCTUARY",
        description: "A deep focus room with layered pixel art ambience. Choose Endurance or Countdown mode — your character sits with you and earns XP.",
        details: [
          "Layered pixel art study room",
          "Endurance & Countdown focus modes",
          "Ambient soundscapes",
          "Focus minutes tracked per character",
          "Live Activity on iOS lock screen"
        ]
      },
      {
        id: "feat-chars",
        badge: "+XP",
        title: "CHARACTER SYSTEM",
        description: "Create pixel art characters, pick a class, and watch them grow as your real-life stats improve. Each character has a full history log.",
        details: [
          "12 classes tied to real-life archetypes",
          "Layered sprite customization (skin, hair, outfit)",
          "Unlockable cosmetics via habits, tasks & focus",
          "Full activity history per character",
          "XP, levels, and focus time tracking"
        ]
      }
    ]
  },
  gallery: {
    label: "See it in action",
    title: "EXPERIENCE PRODUCTIVISM",
    subtitle: "Screenshots from the app — character creation, quest tracking, daily habits, and deep focus sessions.",
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
    appStoreUrl: "#",
    googlePlayUrl: "#",
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

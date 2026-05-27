# 🕋 Hajj Way: The Ultimate Pilgrim Companion PWA

An interactive, premium, offline-first Progressive Web App (PWA) designed to guide pilgrims through the physical, mental, and spiritual journey of Hajj. Formatted with state-of-the-art mobile viewport locking, modern typography, dynamic animations, and a tranquil design system.

The application fully implements **Sheikh Omar Suleiman's Step-by-Step Hajj Guide** as structured overlay courses, fully localized in **English (EN), Arabic (AR), Turkish (TR), and Albanian (SQ/Shqip)**.

---

## ✨ Features that Make it "Something Special"

### 1. 🗂️ Pilgrim Onboarding Profiler
Customize your Hajj checklist and guidelines dynamically!
- **Typology Filters**: Differentiate between **Tamattu**, **Qiran**, and **Ifrad** Hajj types.
- **Gender-Specific Rules**: Swaps checklists, sunnahs, and jurisprudential alerts based on gender selection (e.g., handles Niqab/Ihram towels, exposed shoulder rules, and menstrual concessions).
- **Smooth Transition flow**: A gorgeous glassmorphic intro panel with responsive animations.

### 2. 🧭 Offline GPS Compass & Mina Tent Locator
Navigate the complex plains of Mina and find Qiblah without any cellular connection!
- **Precision Geotelemetry**: Employs the browser HTML5 Geolocation API and Haversine mathematical formulas to compute distances offline.
- **Dynamic 3D-Like Compass Widget**: Shows active device orientation and points gold needles directly to the **Holy Kaaba** and green needles to the **Mina Tent**.
- **Mina Tent GPS Coordinates Stamp**: Allows pilgrims to record their camp coordinate location by locking satellite coordinates when standing inside Mina Tent City.
- **Simulate GPS Trigger**: Built-in test simulation mode for desktop testing in Makkah/Mina.

### 3. 🎵 Sanctuary Soundscape Synthesizer
A zero-network-payload offline ambient audio synthesizer to block outside distress and induce peace.
- **Web Audio API Engine**: Generates smooth drone waves (Eb2 fundamental at 75 Hz and perfect fifth Bb2 at 112.5 Hz) using double triangle oscillators.
- **Aesthetic Warmth**: Low-passed with a slow BiquadFilter (140 Hz) and slow-breathing LFO sweep (0.12 Hz modulation) to simulate rhythmic, slow breathing.

### 4. 🎓 Full-Page Scholarly Guide Overlays
Deep-dive fikh articles mapped for each daily stage:
- **Comprehensive Sunnahs**: Includes Meeqat Ihram, Tawaf (Wudu, Safa-Marwa, Nafila), Wuquf in Arafat, sleeping in Muzdalifah, Jamarat stoning rules, and final Farewell (Wadaa) details.
- **High-Density Alerts**: Crimson-accented **Fidya Expiation Warnings** for Ihram prohibitions, purple-accented **Menses Concession cards**, and amber-accented **Critical Advice callouts**.
- **TTS Arabic Reciter**: Press a speaker icon to hear beautiful Quranic Arabic recitations (utilizing offline SpeechSynthesis API) with automatic pause controls when switching stages.

### 5. 🏆 Golden Confetti Milestone Canvas
- Dynamic HTML Canvas particle physics emitter exploding custom golden particle confetti across the screen whenever a day's checklist is fully completed.
- Integrates native hardware vibration APIs to deliver pleasant tactile haptic pulses on achievements.

---

## 🛠️ Tech Stack & Architecture

- **Core**: React 18 + TypeScript (Vite)
- **State**: Zustand (with HTML5 localStorage persistence)
- **Aesthetics & Animations**: Vanilla CSS + Tailwind CSS v4 + Framer Motion
- **PWA Workbox Plugin**: Generates offline Service Workers and precaches assets under a tiny **459 KiB** memory footprint.
- **Device APIs**: HTML5 Geolocation API, DeviceOrientation Event API, Web Audio API, Web SpeechSynthesis API, and Navigator Vibration API.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/[YOUR_USERNAME]/hajj-way.git
   cd hajj-way
   ```

2. **Navigate to the React App:**
   ```bash
   cd hajj-way
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Lint Codebase:**
   ```bash
   npm run lint
   ```

6. **Build for Production (PWA Precache Generator):**
   ```bash
   npm run build
   ```

---

## 📂 Codebase Structure

- `src/components/BottomSheet.tsx` — Handles offline compass tracking, canvas confetti physics, multi-language checklist widgets, and the full-page scholarly guide overlay system.
- `src/components/BackgroundViewer.tsx` — Employs custom CSS transitions and slow Ken Burns panning scales to shift scenery between Hajj stages.
- `src/store/useStore.ts` — The persisted Zustand store managing the user profile, language coordinates, and task checklists.
- `src/data/hajjData.ts` — Multi-language structural schema of Hajj daily stages and deep scholarly fikh guides.
- `src/App.tsx` — Mounts the main container, the offline Web Audio Sanctuary synth drone engine, and the Pilgrim Onboarding Profiler.

---

## 📜 License
Distributed under the MIT License.

---
*May Allah accept your spiritual efforts and grant you Hajj Mabroor! 🕋*

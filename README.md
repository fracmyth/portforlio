# DevPortfolio | Pointercrate Submission

[![Deployment Status](https://img.shields.io/badge/Vercel-Live_Demo-black?style=for-the-badge&logo=vercel)](https://portforlio-snowy.vercel.app/)

A high-performance web dashboard built with Next.js 15, focusing on algorithmic visualization and community-driven data management. This project was developed to demonstrate full-stack proficiency and optimization skills for the Pointercrate development team.

## 🚀 Live Demo
**Link:** [https://your-project-link.vercel.app](https://portforlio-snowy.vercel.app/)

## 🛠️ Tech Stack & Deployment
- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Logic:** TypeScript & Server Actions
- **Deployment:** **Vercel**
  - Implemented automatic deployments via GitHub integration.
  - Optimized for Vercel’s Edge Runtime and Serverless Functions.

## 📦 Projects Included

### 1. Algorithm Visualizer
An interactive tool designed to visualize complex sorting logic. 
- **Tech:** Custom recursive implementations in TypeScript.
- **Key Feature:** Visualizes $O(n \log n)$ efficiency using asynchronous state updates to provide real-time frame-by-frame rendering.

### 2. Mini-Demon List (Top 50)
A specialized ranking dashboard for the Geometry Dash community.
- **Dynamic Routing:** Implemented using Next.js `[id]` patterns for high-speed navigation.
- **Data Architecture:** Utilizes a local JSON database system with **Server Actions** to simulate persistent storage.

### 3. Record Submission System
A functional workflow for community members to submit level completions.
- **Validation:** Server-side logic to handle and sanitize user input.
- **Persistence:** Submissions are written directly to `db.json` and immediately reflected on level-specific pages via `revalidatePath`.

## 🏆 Technical Profile
- **KOI #4 (Korean Olympiad in Informatics):** Ranked 4th in national competitive programming.
- **Competitive Programming Rigor:** Strong foundation in C++, data structures, and algorithmic optimization.

## ⌨️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/fracmyth/portforlio.git](https://github.com/fracmyth/portforlio.git)

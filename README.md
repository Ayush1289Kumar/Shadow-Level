# ⚔️ Shadow Level — RPG Habit Tracker

**Shadow Level** is a gamified habit tracker inspired by the _Solo Leveling_ anime. It transforms your daily routines into an RPG experience where completing habits earns you experience points (EXP), helps you level up, and unlocks rewards.

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shadow-level-6qaq.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-97.9%25-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **🌐 Live Demo**: [https://shadow-level-6qaq.vercel.app/](https://shadow-level-6qaq.vercel.app/)

---

## ✨ Features

- **🎮 RPG-Style Progression** — Complete habits to earn EXP, level up, and track your progress like a true hunter.
- **✅ Habit Tracking** — Create **Positive** habits (gain EXP) and **Negative** habits (lose EXP). Check and uncheck tasks with real-time EXP updates.
- **📊 Analytics Dashboard** — Visualize your progress with interactive charts:
  - Daily EXP bar chart (last 7 days)
  - Monthly heatmap (GitHub-style activity grid)
  - Positive vs. Negative habit impact pie chart
- **🔥 Streak System** — Maintain daily streaks just like GitHub and LeetCode. Track your current and longest streaks.
- **🎁 Reward Shop** — Spend your hard-earned EXP to purchase rewards. Purchases are **permanent** — no refunds!
- **👤 Shareable Profile** — Each user gets a public profile page (`/profile/[username]`) with their level, EXP, streak, and avatar. Share it with anyone!
- **🖼️ Custom Avatar** — Upload your own character image (max 1MB) stored securely in Supabase Storage.
- **📱 Fully Responsive** — Works seamlessly on desktop, tablet, and mobile devices.
- **🔐 Authentication** — Secure sign-up and sign-in powered by Supabase Auth.

---

## 🛠️ Tech Stack

| Category               | Technology                            |
| ---------------------- | ------------------------------------- |
| **Frontend Framework** | React 19 with TypeScript              |
| **Routing**            | TanStack Router (file-based)          |
| **State Management**   | Zustand                               |
| **Styling**            | Tailwind CSS 4 + shadcn/ui components |
| **Animations**         | Framer Motion + canvas-confetti       |
| **Charts**             | Recharts                              |
| **Backend & Auth**     | Supabase (PostgreSQL, Auth, Storage)  |
| **Build Tool**         | Vite                                  |
| **Forms**              | React Hook Form + Zod validation      |
| **Date Handling**      | date-fns                              |

---
## 📁 Project Structure

Shadow-Level/
├── src/
│ ├── components/
│ │ ├── ui/ # shadcn/ui component library
│ │ ├── AppNav.tsx # Navigation component
│ │ ├── ExpBar.tsx # EXP progress bar
│ │ └── RequireAuth.tsx # Protected route wrapper
│ ├── hooks/ # Custom React hooks
│ ├── integrations/
│ │ └── supabase/ # Supabase client configuration
│ ├── lib/ # Utility functions
│ ├── routes/ # File-based routing (TanStack Router)
│ │ ├── __root.tsx # Root layout
│ │ ├── index.tsx # Landing page
│ │ ├── auth.tsx # Login/Signup
│ │ ├── dashboard.tsx # Main dashboard
│ │ ├── habits.tsx # Habit CRUD
│ │ ├── analytics.tsx # Charts & visualizations
│ │ ├── rewards.tsx # Reward shop
│ │ └── profile/ # Public profile routes
│ ├── router.tsx # Router configuration
│ ├── server.ts # Server entry (TanStack Start)
│ ├── start.ts # App entry point
│ └── styles.css # Global styles
├── supabase/
│ └── migrations/ # Database schema migrations
├── public/ # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or pnpm
- A Supabase account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/Ayush1289Kumar/Shadow-Level.git
cd Shadow-Level
2. Install Dependencies
bash
npm install
3. Set Up Environment Variables
Create a .env file in the root directory:

env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
You can find these credentials in your Supabase dashboard under Settings → API.

4. Set Up Supabase Database
Run the following SQL in your Supabase SQL Editor to create the required tables:
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    avatar_url TEXT,
    total_exp BIGINT DEFAULT 0,
    level INT DEFAULT 1,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    exp_to_next_level INT DEFAULT 100,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create habits table
CREATE TABLE IF NOT EXISTS habits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    habit_type TEXT CHECK (habit_type IN ('positive', 'negative')) NOT NULL,
    exp_value INT DEFAULT 10,
    frequency TEXT CHECK (frequency IN ('daily', 'weekly')) DEFAULT 'daily',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create habit_logs table
CREATE TABLE IF NOT EXISTS habit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    habit_id UUID REFERENCES habits(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    completed_at DATE DEFAULT CURRENT_DATE,
    exp_earned INT NOT NULL,
    UNIQUE(habit_id, completed_at)
);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    cost INT NOT NULL CHECK (cost > 0),
    is_purchased BOOLEAN DEFAULT FALSE,
    purchased_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can CRUD own habits" ON habits FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own logs" ON habit_logs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own rewards" ON rewards FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_habit_logs_user_date ON habit_logs(user_id, completed_at);
CREATE INDEX IF NOT EXISTS idx_habits_user_active ON habits(user_id, is_active);
5. Set Up Storage Bucket
In Supabase, go to Storage → Create Bucket.

Name it avatars and set it to Public.

Add the following policies:

sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects FOR SELECT TO public USING (bucket_id = 'avatars');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');

-- Allow users to delete their own files
CREATE POLICY "Authenticated delete own" ON storage.objects FOR DELETE TO authenticated USING (
    bucket_id = 'avatars' AND (SELECT auth.jwt()->>'sub') = owner_id
);
6. Run the Development Server
bash
npm run dev
The app will be available at http://localhost:5173.

🎮 Game Mechanics
EXP & Leveling
Positive habits → Earn EXP when checked

Negative habits → Lose EXP when checked (punishment)

Level formula: Level = floor(sqrt(total_exp / 100)) + 1

Level-up triggers a confetti celebration! 🎊

Streak System
Complete at least one positive habit daily to maintain your streak

Missing a day resets your streak to 0

Tracks both current and longest streaks

Reward Shop
Spend EXP to purchase rewards

No refunds — purchases are permanent

Purchased rewards display a badge

🚢 Deployment
The live application is successfully deployed and accessible at:
👉 https://shadow-level-6qaq.vercel.app/

Deploy to Vercel (Recommended)
Push your code to GitHub.

Go to Vercel and import your repository.

Add the environment variables:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Deploy!

Deploy to Netlify
Push your code to GitHub.

Go to Netlify and import your repository.

Add the same environment variables.

Deploy!

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 License
This project is licensed under the MIT License — see the LICENSE file for details.

🙏 Acknowledgments
Inspired by the Solo Leveling anime and manhwa

Built with TanStack Start

UI components from shadcn/ui

Icons from Lucide

Made with ❤️ by Ayush Kumar
```

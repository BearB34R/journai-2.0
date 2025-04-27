# Serene – Mental Wellness Companion

Serene is a modern mental wellness web app built with Next.js 15+, React 19, and Supabase. It helps users track their moods, journal their thoughts, and chat with an AI wellness companion—all in a private, supportive environment.

## Features

- ✍️ Private journaling with a rich text editor (Tiptap)
- 💬 AI-powered chat wellness companion
- 📈 Mood tracking and progress over time
- 🔒 User authentication (Supabase)
- 🎨 Responsive, accessible UI (Radix UI, Tailwind CSS)
- ☁️ Data stored securely in Supabase

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- Supabase project (for authentication and data)

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd journai-2.0
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local` and fill in your Supabase credentials.

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm run build
pnpm start
```

## Project Structure

- `app/` – Next.js app directory (pages, API routes)
- `components/` – Reusable UI components
- `lib/` – Utility functions and Supabase client
- `styles/` – Tailwind CSS and global styles

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Supabase](https://supabase.com/)
- [Tiptap](https://tiptap.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Credits

- Built by Andy Do Nguyen
- Inspired by the need for accessible, private mental wellness tools

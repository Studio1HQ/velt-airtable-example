# MailCraft - Professional Email Composer

A beautiful, modern email composer built with Tiptap, Velt, Next.js, and shadcn/ui. Features rich-text editing, real-time collaboration with inline commenting, and a premium glassmorphic UI.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-blue)
![Tiptap](https://img.shields.io/badge/Tiptap-2.8-purple)
![Velt](https://img.shields.io/badge/Velt-5.0.0--beta-green)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Rich Text Editor

- **Tiptap Powered** - Modern headless rich text editor framework
- **Bubble Menu** - Floating toolbar appears on text selection for quick actions
- **Advanced Formatting** - Support for headings, lists, bold, italic, and more
- **tiptap-Style Integration** - Designed for seamless data management workflows

### Real-Time Collaboration (Velt)

- **Presence** - See who's currently viewing the email in real time
- **Inline Comments** - Select text and add comments directly in the editor using Velt's Tiptap integration
- **Notifications** - Real-time notification bell for new comments and replies
- **Comments Sidebar** - Manage all discussions in a dedicated sidebar
- **User Switching** - Easily switch between predefined users (Nany, Mary) to test collaboration

### UI / UX

- **Dark / Light Mode** - Full support for both themes with smooth transitions
- **Responsive Design** - Optimized for desktop and mobile devices
- **shadcn/ui** - Highly accessible, beautiful UI components

## Modern Tech Stack

- **React 19** - Latest React features including updated hooks
- **Next.js 16** - App Router architecture with server and client components
- **TypeScript** - Fully type-safe development experience
- **Tiptap** - Highly extensible rich text editor
- **Velt SDK v5** - Cutting-edge collaboration tools including `@veltdev/tiptap-velt-comments`
- **Tailwind CSS** - Modern utility-first styling
- **Zustand** - Lightweight state management for user sessions
- **Lucide React** - Minimalist icon library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Velt API Key (sign up at [velt.dev](https://velt.dev))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd velt-email-composer-tiptap
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create .env file
echo "NEXT_PUBLIC_VELT_ID=your_velt_api_key_here" > .env
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── (app)/                    # Main application routes
│   │   ├── layout.tsx            # Velt + Theme providers
│   │   └── page.tsx              # Email composer page
│   ├── layout.tsx                # Root layout (HTML, Fonts)
│   └── globals.css               # Global styles and Tailwind
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── EmailEditor.tsx           # Tiptap editor with Velt integration
│   ├── EditorFooter.tsx          # Editor footer with formatting options
│   ├── email-composer.tsx        # Main composer layout
│   └── navbar.tsx                # Navigation with Velt tools
├── constant/
│   └── general.ts                # Initial editor content
├── helper/
│   └── userdb.ts                 # User management and state
├── lib/
│   └── utils.ts                  # Tailwind class merging utility
├── public/                       # Static assets
└── package.json                  # Dependencies and scripts
```

## Velt Integration

This project uses the Velt SDK to add collaborative features.

### Tiptap Velt Comments

The editor integrates `@veltdev/tiptap-velt-comments` for inline discussions:

```tsx
import {
  TiptapVeltComments,
  renderComments,
  addComment,
} from "@veltdev/tiptap-velt-comments";

// Configure extension
TiptapVeltComments.configure({ persistVeltMarks: false });

// Render existing comments
renderComments({ editor, editorId, commentAnnotations });

// Add new comment
addComment({ editor, editorId });
```

### Components Used

| Component               | Purpose                 |
| ----------------------- | ----------------------- |
| `VeltProvider`          | Main SDK initialization |
| `VeltPresence`          | Real-time user avatars  |
| `VeltNotificationsTool` | Notification bell       |
| `VeltSidebarButton`     | Toggle for comments     |
| `VeltCommentsSidebar`   | Discussion panel        |

## 📚 Resources

- [Velt Documentation](https://docs.velt.dev)
- [Tiptap Guide](https://tiptap.dev/docs)
- [shadcn/ui](https://ui.shadcn.com)

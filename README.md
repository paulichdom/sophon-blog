# Sophon: Generative AI Blogging Platform

Sophon is a modern, feature-rich blogging platform that empowers users to create, edit, and share articles with ease. Leveraging generative AI, Sophon enables users to scaffold and draft articles automatically from a simple prompt, making content creation faster and more accessible for everyone.

> This project is inspired by the [RealWorld](https://realworld-docs.netlify.app/) apps

## Features

- **Generative AI Article Creation:** Instantly generate article drafts using AI by providing a topic or prompt.
- **Rich Text Editor:** Compose and format articles with a powerful, intuitive editor supporting headings, lists, highlights, and more.
- **User Authentication:** Register, log in, and manage your profile securely.
- **Article Management:** Create, edit, and publish articles with tags and descriptions.
- **Responsive UI:** Built with [Mantine](https://mantine.dev/) for a beautiful, accessible experience on any device.
- **Modern Tooling:** Includes TypeScript, ESLint, Storybook, and Vitest for robust development and testing.

## Backend
The backend for Sophon is developed with [NestJS](https://nestjs.com/). You can find the backend source code here: [paulichdom/sophon-api](https://github.com/paulichdom/sophon-api)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/paulichdom/sophon-blog.git
   cd sophon-blog
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## Generative AI
Sophon integrates generative AI to help users quickly draft articles. Simply enter a topic or prompt in the editor, and the AI assistant will generate a complete article draft for you to review and edit. This feature lowers the barrier to content creation and boosts productivity for writers of all levels.

## npm Scripts

### Build and Dev Scripts
- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing Scripts
- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other Scripts
- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier



# Anagha Mithra — Portfolio

An interactive portfolio for Anagha Mithra Ainippully Remith, a Computer Science and Cybersecurity student at SRM Institute of Science and Technology.

## Stack

- Next.js App Router and TypeScript
- React Three Fiber, Three.js, and a custom GLSL particle shader
- Tailwind CSS
- Lucide icons

The particle scene is loaded on the client and scales its particle count for mobile and tablet widths. It responds to pointer and touch movement, pauses animation when reduced motion is enabled, and provides a fallback message if WebGL is unavailable.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm test
npm run lint
npm run build
```

## Resume and portfolio content

- Replace `public/resume.pdf` with the updated resume PDF to change the download.
- Update project descriptions, technologies, skills, education, and links in `src/utils/portfolioData.ts`.
- Add a project `githubUrl` or `liveUrl` only after a public destination is available.
- Contact and social links are in `PERSONAL_INFO` in `src/utils/portfolioData.ts`.

## Deploy to Vercel

Import the repository into Vercel and deploy with the Next.js framework preset. The standard build command is `npm run build`; Vercel detects the output configuration automatically. No deployment has been performed from this project workspace.

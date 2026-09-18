# Rama Alraddadi Portfolio — Deployment Guide

This export is ready for Vercel and Netlify. It includes local copies of the project images and CV, so it does not depend on Manus storage URLs.

## Vercel

Import this folder or its GitHub repository into Vercel. The included `vercel.json` sets the build command to `pnpm build` and the output directory to `dist/public`.

## Netlify

Import this folder into Netlify. The included `netlify.toml` sets the build command to `pnpm build`, publishes `dist/public`, and supports client-side routing.

## Local verification

```bash
pnpm install
pnpm check
pnpm build
pnpm exec vite preview --host
```

The Formspree contact form is already configured with the provided endpoint.

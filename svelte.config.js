/**
 * svelte.config.js  SvelteKit Configuration
 *
 * This file tells SvelteKit how to build your site.
 * The most important setting here is the "adapter" which determines
 * what kind of output is created when you run `npm run build`.
 *
 * We use @sveltejs/adapter-static which creates plain HTML/CSS/JS files
 * that can be hosted on any static file server (like GitHub Pages).
 *
 * Learn more: https://svelte.dev/docs/kit/configuration
 */
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const gitHubPagesBase = isGitHubActions && repoName ? `/${repoName}` : '';
const basePath = gitHubPagesBase || process.env.BASE_PATH || '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Enable SCSS preprocessing in <style lang="scss"> blocks
  preprocess: vitePreprocess(),
  kit: {
    // The static adapter builds your site as plain HTML/CSS/JS files
    // These can be hosted anywhere (GitHub Pages, Netlify, etc.)
    adapter: adapter({
      pages: 'build', // Output directory for HTML pages
      assets: 'build', // Output directory for static assets
      fallback: undefined, // No fallback page (we're fully static)
      precompress: false, // Don't pre-compress files
      strict: true, // Fail if any routes can't be prerendered
    }),
    // On GitHub Actions, always use the repository name as the base path.
    // This prevents accidental wrong deploy paths like /storybook.
    // Outside CI, BASE_PATH can still be set manually for local test builds.
    paths: {
      base: basePath,
      relative: false,
    },
  },
};

export default config;

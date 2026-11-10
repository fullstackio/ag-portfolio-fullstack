import nextPlugin from '@next/eslint-plugin-next';

import { reactLibraryConfig } from './react-library.js';

/** @type {import('eslint').Linter.Config[]} */
export const nextConfig = [
  ...reactLibraryConfig,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];

export default nextConfig;

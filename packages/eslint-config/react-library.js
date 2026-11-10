import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { baseConfig } from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export const reactLibraryConfig = [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
];

export default reactLibraryConfig;

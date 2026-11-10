import globals from 'globals';

import { baseConfig } from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export const nestjsConfig = [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Nest resolves constructor-injected providers from the runtime
      // "design:paramtypes" metadata TypeScript emits for value imports.
      // Auto-converting those imports to `import type` silently breaks DI.
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
];

export default nestjsConfig;

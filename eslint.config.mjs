import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      quotes: ['warn', 'single', { avoidEscape: true }],
      semi: ['warn', 'always'],

      // Regra para ordenar imports (path mappings primeiro)
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@shared/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@domain/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@infrastructure/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@application/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'import/internal-regex': '^@/',
    },
  },
  ...tseslint.configs.recommended,
];

import { Linter } from 'eslint';

const config: Linter.Config = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Utilisation recommandée avec Prettier
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'react/prop-types': 'off', // Désactive la vérification des propTypes pour les composants React
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect', // Détecte automatiquement la version de React pour les règles ESLint
    },
  },
  parser: '@typescript-eslint/parser', // Spécifie le parseur TypeScript pour ESLint
  parserOptions: {
    ecmaVersion: 12, // Spécifie la version ECMAScript à utiliser (ECMAScript 2021)
    sourceType: 'module', // Indique que le code est de type module (ES modules)
  },
};

export default config;

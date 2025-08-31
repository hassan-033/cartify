
# Cartify

Cartify is a modern e-commerce shopping cart demo built with React, TypeScript, Vite, and Tailwind CSS. It showcases a clean UI, cart management, product listing, and sidebar interactions.

## Features

- Product listing with mock data
- Product details modal
- Add/remove items from cart
- Cart sidebar with item management
- Responsive design using Tailwind CSS
- Context API for global cart state

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- ESLint

## Getting Started

1. Install dependencies:
  ```sh
  npm install
  ```
2. Start the development server:
  ```sh
  npm run dev
  ```
3. Build for production:
  ```sh
  npm run build
  ```

## Project Structure

- `src/components` - UI and feature components
- `src/context` - Cart context provider
- `src/data` - Mock product data
- `src/hooks` - Custom hooks
- `src/types` - Type definitions
- `src/utils` - Utility functions

## License

MIT

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

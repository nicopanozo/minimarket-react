# MiniMarket React

MiniMarket is a modern e-commerce application built with React, TypeScript, Vite, and TailwindCSS. This project follows a feature-based architecture, allowing for scalable and maintainable code.

## Dependencies for initial project setup

```
npm install
```

```
npm install react-router-dom@6
```

```
npm install @reduxjs/toolkit react-redux
```

```
npm install react-hook-form yup @hookform/resolvers
```

# Instalar TailwindCSS versión 3

npm install -D tailwindcss@3
npx tailwindcss init
npm install -D tailwindcss postcss autoprefixer
npm install --save-dev prettier
npm install --save-dev vitest @testing-library/react@testing-library/jest-dom
npm install --save-dev jsdom

## Features

- **Responsive Design**: Utilizes TailwindCSS for styling, ensuring a responsive and modern UI.
- **State Management**: Implements Redux Toolkit for global state management.
- **Routing**: Uses React Router for seamless navigation between pages.
- **Feature-Based Structure**: Organized by features for better maintainability.

## Project Structure

```
minimarket-ecommerce
├── src
│   ├── components
│   │   └── Navbar.tsx
│   ├── features
│   │   ├── cart
│   │   │   ├── CartPage.tsx
│   │   │   └── cartSlice.ts
│   │   ├── products
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── productsSlice.ts
│   │   ├── user
│   │   │   ├── LoginPage.tsx
│   │   │   └── userSlice.ts
│   │   └── admin
│   │       ├── AdminDashboard.tsx
│   │       └── adminSlice.ts
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Checkout.tsx
│   │   ├── Confirmation.tsx
│   │   └── NotFound.tsx
│   ├── redux
│   │   └── store.ts
│   ├── routes
│   │   └── index.tsx
│   ├── types
│   │   └── Product.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/nicopanozo/minimarket-react
   ```

2. Navigate to the project directory:

   ```
   cd minimarket-react
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to see the application in action.

## 🧹 Code Formatting

This project uses **Prettier** for consistent code style.

### 🔧 Scripts

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

### 🛠 Usage

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm run format`       | Formats the entire project based on `.prettierrc`   |
| `npm run format:check` | Checks if files are correctly formatted (read-only) |

### 💡 VSCode

- Requires [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Auto-format on save is preconfigured in `.vscode/settings.json`

### Folder Structure

- **src/components**: Contains reusable components like the Navbar.
- **src/features**: Contains feature-specific components and Redux slices.
- **src/pages**: Contains the main pages of the application.
- **src/redux**: Contains the Redux store configuration.
- **src/routes**: Contains the routing configuration.
- **src/types**: Contains TypeScript type definitions.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

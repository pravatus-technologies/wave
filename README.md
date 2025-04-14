<img src="./mobile/assets/images/icon.png" height=128 margin="auto"/>

<h1>Wave</h1>

<p>Wave Social from Pravatus Technologies</p>

<h2>Folder Structure</h2>
<p>The project is composed of two main projects and one documentation folder</p>
<ul>
  <li><p><strong>mobile</strong>- this contains the React Native mobile application project</p></li>
  <li><p><strong>api-dev</strong>- this is the nodejs express backend api for feeding mock data into the app. As of now it only loads posts in the homescreen</p></li>
  <li><p><string>docs</strong>- this is the documentation folder. Anything relevant to document, put it here</p></li>
</ul>

<h2>Build Instruction</h2>
<p>The mobile app project is running on hybrid workflow (bare + expo managed) in order to use the React Native Firebase native modules. This app also has customized build flow as defined in app.config.js that determines what environment to build into according to the APP_ENV environment variable</p>
<p>If you're going to run the development build on your simulator, you'll need to issue the following command first: npx expo run:ios<p>
<p>After that it will create a development build and install it on the simulator. You can also use npx expo build --profile "development|preview|production" and use EAS build service to download a development build.</p>
<p>Always use the correct device profile especially with IOS. If you have a phone you want to use, make sure to run npx expo create:device and create a new device profile. This will use your Apple Developer account if building for IOS. Make sure your Apple Developer account is current.</p>
<p>You can manage your devices from within developer.apple.com</p>

## 🚀 Project Code Standards

This project follows strict conventions for **code quality**, **linting**, **formatting**, and **import management** to ensure clean and maintainable code.

---

## 🧼 Code Quality & Commit Hygiene

### 🔧 Linting + Formatting Stack

| Tool                     | Purpose                                                |
| ------------------------ | ------------------------------------------------------ |
| **ESLint**               | Linting and import organization                        |
| **Prettier**             | Code formatting (quotes, spacing, line length, etc.)   |
| **eslint-plugin-import** | Grouping and sorting of import statements              |
| **Husky**                | Git hooks that run before commits                      |
| **lint-staged**          | Runs ESLint & Prettier only on files you're committing |

---

### 📦 Local Setup

Make sure you’ve installed all dependencies:

```bash
npm install
```

> This automatically sets up **Husky** via the `prepare` script in `package.json`.

---

### 🧪 Run Format & Lint Manually

```bash
npm run lint:imports      # Fix import order and lint issues
npm run format            # Format code using Prettier
```

---

### 🪝 Pre-Commit Auto-Fix

When you stage files (`git add .`) and commit (`git commit -m "..."`), the following happens automatically:

✅ ESLint runs and fixes errors  
✅ Prettier formats your code  
✅ Imports are grouped + alphabetized

> Only changed files are affected — your commits stay clean and fast.

---

### 🧠 Import Order Convention

All imports are grouped and sorted as follows:

1. **Built-in modules** (`react`, `react-native`, `fs`, etc.)
2. **Third-party packages** (`axios`, `react-navigation`, etc.)
3. **Project aliases** (`@components`, `@utils`, etc.)
4. **Relative paths** (`./MyComponent`)

---

### ✨ VSCode Recommended Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```

---

## 📜 Barrel File Generator (Optional)

Automatically generate `index.ts` barrel files for grouped exports (components, hooks, utils, etc.)

```bash
npm run generate-barrels
```

> Pro tip: Add a watcher in dev mode for auto-rebuilds!

---

## 🛡️ Linting & Formatting CI Badge

![Lint & Format](https://github.com/pravatus-tecnologies/wave/actions/workflows/lint-format.yml/badge.svg)

---

## ⚙️ GitHub CI Workflow

```yaml
name: Lint & Format Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    name: Run ESLint + Prettier
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint:imports

      - name: Run Prettier check
        run: npx prettier --check "src/**/*.{ts,tsx}"
```

> Optional: Add `npx tsc --noEmit` for type checking too.

---

## 🧪 Full Lint/Format Script Setup

In `package.json`:

```json
"scripts": {
  "lint:imports": "eslint 'src/**/*.{ts,tsx}' --fix",
  "format": "prettier --write 'src/**/*.{ts,tsx}'",
  "prepare": "husky install"
},
"lint-staged": {
  "src/**/*.{js,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

---

## ✅ Summary

- ✅ Pre-commit hooks fix code & enforce order
- ✅ GitHub Actions enforce it in CI
- ✅ Barrel file generator for clean exports
- ✅ VSCode settings for developer experience

---

> Let’s keep our codebase elegant, clean, and scalable 💫

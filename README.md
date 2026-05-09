# Tree Visualizer

An interactive hierarchical tree structure renderer built with **React**, **TypeScript**, and **React Flow**. Supports expand/collapse of subtrees, smooth layout recalculation, and a clean dark-theme UI.

---

## Features

- Visual tree layout with automatic spacing — parents centered above their children
- **Expand / Collapse** any node with children; layout re-adjusts automatically
- Smooth animated re-centering of the viewport on every toggle
- Hover highlighting on nodes
- Dark glass-morphic design with dot-grid canvas background
- Fully client-side — no backend required

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| React Flow 11 | Graph / tree rendering |
| Vite | Dev server & bundler |

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher — [https://nodejs.org](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)

Verify your versions:

```bash
node -v
npm -v
```

---

## Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/SuzalKori/tree-visualizer.git
cd tree-visualizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
tree-visualizer/
├── src/
│   ├── components/
│   │   └── TreeNode.tsx       # Custom React Flow node component
│   ├── data/
│   │   └── treeData.ts        # Tree structure definition
│   ├── utils/
│   │   └── layoutTree.ts      # Layout algorithm (positions nodes)
│   ├── App.tsx                # Root component with React Flow setup
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

---

## Customising the Tree

Edit `src/data/treeData.ts` to change the tree structure. Each node takes:

```ts
{
  id: string;        // unique identifier (used internally)
  label?: string;    // display text — falls back to id if omitted
  children?: Node[]; // nested child nodes
}
```

Example:

```ts
export const treeData = {
  id: "root",
  children: [
    {
      id: "child-1",
      label: "Child 1",
      children: [
        { id: "leaf-1", label: "Leaf A", children: [] },
        { id: "leaf-2", label: "Leaf B", children: [] },
      ],
    },
    { id: "child-2", label: "Child 2", children: [] },
  ],
};
```

The layout engine supports tree depths of **3–6 levels**.

# How to Run the Universal Unit Converter

## Prerequisites

Before running the application, make sure you have:

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

## Step 1: Install Dependencies

Open a terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install all required packages:

```bash
npm install
```

## Step 2: Start the Development Server

From the `frontend` directory, run:

```bash
npm run dev
```

You should see output similar to:

```
VITE v6.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

## Step 3: Open in Browser

Open your web browser and go to:

```
http://localhost:5173
```

The app will load immediately. You should see:

- The **Universal Unit Converter** header
- A **Home** page with all available converters
- Navigation links to each converter
- Dark/Light theme toggle

## Available Converters

| Converter | Route |
|-----------|-------|
| Height Converter | `/height` |
| Weight Converter | `/weight` |
| Volume Converter | `/volume` |
| Currency Converter | `/currency` |
| Planet Weight Converter | `/planet-gravity` |

## Troubleshooting

### Blank Page

If you see a blank page:

1. Open your browser's developer console (F12)
2. Check for any red error messages
3. Run `npm run build` to check for TypeScript errors
4. Ensure all dependencies are installed with `npm install`

### Port Already in Use

If port 5173 is already in use, the dev server will automatically try the next available port. Check the terminal output for the correct URL.

### Module Not Found Errors

If you get import errors, try:

```bash
# Clean install
rm -rf node_modules
npm install
```

## Production Build

To create a production build:

```bash
cd frontend
npm run build
```

The output will be in the `frontend/dist/` folder, ready for deployment to Vercel or any static hosting.

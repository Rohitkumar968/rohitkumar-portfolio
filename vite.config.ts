import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: false,
    port: 4000,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for web vitals
    target: 'es2015',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-popover', '@radix-ui/react-tooltip', '@radix-ui/react-context-menu', '@radix-ui/react-dropdown-menu', 'sonner'],
          'utils': ['clsx', 'class-variance-authority', 'tailwind-merge', 'date-fns', 'zod'],
          'charts': ['recharts'],
          'icons': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}));





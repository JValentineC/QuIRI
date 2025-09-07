/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      manifest: {
        name: "QuIRI (Quantum Innovation and Research Institute)",
        short_name: "QuIRI",
        description: "Academic networking platform for research collaboration",
        theme_color: "#3b82f6",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          "react-vendor": ["react", "react-dom", "react-router-dom"],

          // UI libraries
          "ui-vendor": ["lucide-react", "daisyui"],

          // Form and validation
          "form-vendor": ["react-hook-form", "zod"],

          // Data fetching
          "query-vendor": [
            "@tanstack/react-query",
            "@tanstack/react-query-devtools",
          ],

          // Utilities
          utils: ["./src/lib/socialUtils.ts", "./src/lib/constants.ts"],

          // Hooks
          hooks: [
            "./src/hooks/useApi.ts",
            "./src/hooks/useApiAction.ts",
            "./src/hooks/useQueries.ts",
            "./src/hooks/usePagination.ts",
            "./src/hooks/useAccessibility.ts",
          ],

          // Components
          components: [
            "./src/components/Pagination.tsx",
            "./src/components/Toast.tsx",
            "./src/components/ErrorBoundary.tsx",
            "./src/components/SkipLink.tsx",
          ],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 200,
  },
  // Test configuration
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
});

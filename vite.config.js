import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";
import mkcert from "vite-plugin-mkcert";
export default defineConfig({
  plugins: [sveltekit(), mkcert()],
  resolve: {
    alias: {
      $components: path.resolve("./src/components"),
      $lib: path.resolve("./src/lib"),
      $icons: path.resolve("./src/lib/assets/icons"),
    },
  },
});

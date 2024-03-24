import { defineConfig } from "tsup";

export default defineConfig({
  bundle: false,
  clean: true,
  format: ["cjs", "esm"],
  experimentalDts: true,
});

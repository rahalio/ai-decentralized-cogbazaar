import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/**/index.ts", "src/**/usecases/index.ts"],
  format: ["esm"],
  dts: false,
  outDir: "dist",
  tsconfig: "./tsconfig.json",
  external: [
    "@aws-sdk/lib-dynamodb",
    "@aws-sdk/client-dynamodb",
    "@cogbazaar/core",
    /.*\/api-server\/.*/,
    /.*\/adapters\/.*/,
  ],
});

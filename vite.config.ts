// Vite+ runs only the formatter (`vp fmt`), the linter (`vp lint`) and the pre-commit checks (`vp staged`) here:
// the app itself is still built and served by Next.js.
import { defineConfig, type UserConfig } from "vite-plus";

import oxfmtConfig from "./.oxfmtrc.json" with { type: "json" };
import oxlintConfig from "./.oxlintrc.json" with { type: "json" };

// The options live in the JSON files so that the VS Code Oxc extension (standalone oxfmt/oxlint) sees them too
const { $schema: _fmtSchema, ...fmt } = oxfmtConfig as NonNullable<
  UserConfig["fmt"]
> & { $schema?: string };
const { $schema: _lintSchema, ...lint } = oxlintConfig as NonNullable<
  UserConfig["lint"]
> & { $schema?: string };

export default defineConfig({
  // Check-only on the staged files (run by .vite-hooks/pre-commit): the hook never modifies files.
  staged: {
    "*.{js,mjs,cjs,jsx,ts,mts,tsx,json,md,yml,yaml,css,scss,html}":
      "vp fmt --check --no-error-on-unmatched-pattern",
    "*.{js,mjs,cjs,jsx,ts,mts,tsx}": "vp lint --deny-warnings",
  },
  fmt,
  lint,
});

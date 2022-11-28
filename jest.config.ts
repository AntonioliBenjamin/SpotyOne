import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  "collectCoverage": true,
  "coverageReporters": ["json", "html"]
};
export default config;
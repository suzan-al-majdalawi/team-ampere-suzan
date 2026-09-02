import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "testresultat/**", "mock-api/**"],
  },

  // Vanliga JS-filer
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "off",
    },
  },


  // Cypress
  {
    files: ["cypress/**/*.cy.js"],
    languageOptions: {
      globals: {
        ...globals.browser,

        // Cypress
        cy: "readonly",
        Cypress: "readonly",

        // Mocha / Cypress test functions
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        before: "readonly",
        after: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
    },
  },
];
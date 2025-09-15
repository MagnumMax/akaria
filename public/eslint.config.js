export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        FormData: "readonly",
        Event: "readonly",
        CustomEvent: "readonly",
        addEventListener: "readonly",
        removeEventListener: "readonly",
        HTMLElement: "readonly",
        Element: "readonly",
        Node: "readonly",
        NodeList: "readonly",
        HTMLCollection: "readonly",
        module: "readonly",
        exports: "readonly",
        require: "readonly",
        ICONS: "readonly",
        ContactsTable: "readonly",
        ContactsCards: "readonly",
        HeaderPanel: "readonly",
        AddContactModal: "readonly",
        ContactViewModal: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": "off",
      "semi": "off",
      "quotes": "off",
      "indent": "off",
      "no-trailing-spaces": "off",
      "eol-last": "off"
    }
  },
  {
    ignores: ["node_modules/**", "public/**", "*.min.js", "**/*.d.ts", "types.d.ts"]
  }
];

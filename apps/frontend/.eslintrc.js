module.exports = {
    extends: [
        "next/core-web-vitals", "plugin:@typescript-eslint/recommended", "plugin:sonarjs/recommended", "plugin:security/recommended"],
    plugins: ["@typescript-eslint", "sonarjs", "security"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"],
        sourceType: "module",
        tsconfigRootDir: __dirname,
    },
    root: true,
    rules: {
        "@typescript-eslint/consistent-type-imports": "error",
        "sonarjs/no-duplicate-string": "warn",
        "@typescript-eslint/no-empty-function": "warn",
        "security/detect-non-literal-fs-filename": 0
    },
    ignorePatterns: ["**/__deprecated__/**/*"]
}

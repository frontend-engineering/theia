/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        '../../configs/build.eslintrc.json'
    ],
    ignorePatterns: [".yalc/**/*"],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json'
    },
    overrides: [{
        "files": ["*.ts", "*.tsx"],
        "rules": {
            "@typescript-eslint/tslint/config": 0,
            "@typescript-eslint/semi": 0,
            "@typescript-eslint/quotes": 0,
            "import/no-extraneous-dependencies": 0,
            "arrow-body-style": 0

        }
    },]
};

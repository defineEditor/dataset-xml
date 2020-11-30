module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'jest'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript'
    ],
    parserOptions: {
        ecmaVersion: 8,
        project: "./tsconfig.json",
        ecmaFeatures: {
            es6: true,
            modules: true
        }
    },
    rules: {
        // disable rules
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-prototype-builtins': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/ban-types': 'off',
        // enable additional rules
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'always'],
        '@typescript-eslint/semi': ['error', 'always'],
        'comma-dangle': 0,
        '@typescript-eslint/member-delimiter-style': ['error', {
            'multiline': {
                'delimiter': 'semi',
                'requireLast': true
            },
            'singleline': {
                'delimiter': 'semi',
                'requireLast': false
            }
        }]
    }
};

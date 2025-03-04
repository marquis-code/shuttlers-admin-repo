module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/essential',
		'plugin:@typescript-eslint/recommended',
		'@nuxtjs/eslint-config-typescript'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: [
		'vue',
		'@typescript-eslint'
	],
	rules: {
		'vue/no-v-html': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-tabs': 'off',
		'no-unmodified-loop-condition': 'off',
		'vue/max-attributes-per-line': 'off',
		'import/no-named-as-default-member': 'off',
		'vue/first-attribute-linebreak': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'vue/no-v-model-argument': 'off',
		'no-unused-expressions': 'off',
		'no-unused-vars': 'off',
		'no-prototype-builtins': 'off',
		'import/no-mutable-exports': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'vue/no-multiple-template-root': 'off',
		'import/no-named-as-default': 'off',
		'vue/no-template-shadow': 'off',
		'no-var': 'error',
		'space-before-function-paren': 'off',
		camelcase: 'off',
		'accessor-pairs': 'off',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		indent: ['off', 'tab', { SwitchCase: 1 }],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
		'prefer-const': ['error'],
		'arrow-parens': ['error', 'always'],
		'no-return-assign': 'off',
		'vue/multi-word-component-names': 'off',
		curly: 'off',
		'vue/html-indent': ['error', 'tab', {
			attribute: 1,
			baseIndent: 1,
			closeBracket: 0,
			alignAttributesVertically: true,
			ignores: []
		}],
		'vue/no-mutating-props': 'off',
		'object-property-newline': 'off',
		'require-atomic-updates': 'off',
		'require-await': 'off'
	},

	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				jest: true
			}
		}
	]
}

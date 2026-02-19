// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require(`eslint/config`);
const expoConfig = require(`eslint-config-expo/flat`);
const stylistic = require(`@stylistic/eslint-plugin`);
const preferArrowFunctions = require(`eslint-plugin-prefer-arrow-functions`);

module.exports = defineConfig([
	expoConfig,
	{
		ignores: [`dist/*`],
		plugins: {
			'prefer-arrow-functions': preferArrowFunctions,
			'@stylistic': stylistic,
		},
		rules: {
			"no-empty": `warn`,
			"no-console": `warn`,
			"prefer-const": `warn`,

			// 화살표 함수 자동 변환
			'prefer-arrow-functions/prefer-arrow-functions': [
				`warn`,
				{
					classPropertiesAllowed: false,
					disallowPrototype: false,
					returnStyle: `unchanged`,
					singleReturnOnly: false,
				},
			],

			// 문자열 백틱 강제
			'@stylistic/quotes': [`warn`, `backtick`],
			'@stylistic/quote-props': [`warn`, `as-needed`],

			// 들여쓰기 및 공백 관리 (@stylistic)
			'@stylistic/object-curly-newline': [`warn`, {
				multiline: true,
				consistent: true
			}],
			'@stylistic/object-property-newline': [`warn`, { allowAllPropertiesOnSameLine: false }],
			'@stylistic/array-element-newline': [`warn`, `consistent`],
			'@stylistic/semi': [`warn`, `always`],
			'@stylistic/comma-spacing': [`warn`, {
				before: false,
				after: true
			}],

			// JSX 관련 포맷팅
			"@stylistic/indent": [`warn`, `tab`],
			'@stylistic/jsx-max-props-per-line': [`warn`, {
				maximum: 1,
				when: `multiline`
			}],
			'@stylistic/jsx-first-prop-new-line': [`warn`, `multiline-multiprop`],
			'@stylistic/jsx-self-closing-comp': `warn`,
			'@stylistic/jsx-closing-bracket-location': [`warn`, `line-aligned`],
		}
	},
]);

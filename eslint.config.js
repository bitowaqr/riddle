// eslint.config.js
import pluginVue from 'eslint-plugin-vue';
import withNuxt from './.nuxt/eslint.config.mjs'


export default withNuxt(
  // Ignore build/generated directories and files we don't want to lint
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.git/',
      '.nuxt/',
      '.output/',
      '.nitro/',
      'coverage/',
      '*.d.ts',
    ],
  },

  // JavaScript files - only basic syntax checking
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        // Nuxt auto-imports
        useMainStore: 'readonly',
        useState: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        navigateTo: 'readonly',
        $fetch: 'readonly',
        // composables auto-imports
        siteInfo: 'readonly',
        openingHours: 'readonly',
        teamMembers: 'readonly',
        contactDetails: 'readonly',
        // ...
      },
    },
    rules: {
      // Only include rules that catch actual compilation errors
      'no-undef': 'error',
      'no-unused-vars': 'off',
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'off',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-obj-calls': 'error',
      'no-regex-spaces': 'error',
      'no-sparse-arrays': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
    },
  },

  // Vue files - minimal rules, no naming conventions
  ...pluginVue.configs['flat/base'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        // Nuxt auto-imports
        useMainStore: 'readonly',
        useState: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        navigateTo: 'readonly',
        $fetch: 'readonly',
      },
    },
    rules: {
      // Only Vue rules that catch actual errors, not style/convention
      'vue/no-dupe-keys': 'error',
      'vue/no-duplicate-attributes': 'error',
      'vue/no-parsing-error': 'error',
      'vue/no-reserved-keys': 'error',
      'vue/no-shared-component-data': 'error',
      'vue/no-template-key': 'error',
      'vue/no-textarea-mustache': 'error',
      'vue/no-unused-components': 'off',
      'vue/no-unused-vars': 'off',
      'vue/require-component-is': 'error',
      'vue/require-render-return': 'error',
      'vue/require-v-for-key': 'error',
      'vue/require-valid-default-prop': 'error',
      'vue/return-in-computed-property': 'error',
      'vue/valid-template-root': 'error',
      'vue/valid-v-bind': 'error',
      'vue/valid-v-else': 'error',
      'vue/valid-v-else-if': 'error',
      'vue/valid-v-for': 'error',
      'vue/valid-v-html': 'error',
      'vue/valid-v-if': 'error',
      'vue/valid-v-model': 'error',
      'vue/valid-v-on': 'error',
      'vue/valid-v-once': 'error',
      'vue/valid-v-pre': 'error',
      'vue/valid-v-show': 'error',
      'vue/valid-v-text': 'error',
      
      // Basic JS rules for <script> sections
      'no-undef': 'error',
      'no-unused-vars': 'off',
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      
      // Disable naming convention rules
      'vue/multi-word-component-names': 'off',
      
      // Disable Vue attribute ordering warning
      'vue/attributes-order': 'off',
    },
  })
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules'
  ],
  
  rules: {
    // CSS Modules specific rules
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local']
      }
    ],
    
    // Custom property rules for design system
    'custom-property-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    
    // Class naming convention for CSS Modules
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      {
        message: 'CSS Module classes should be camelCase'
      }
    ],
    
    // Design system token validation
    'declaration-property-value-allowed-list': {
      'color': [
        '/^var\\(--[a-z-]+\\)$/',
        'transparent',
        'currentColor',
        'inherit',
        'initial',
        'unset'
      ],
      'background-color': [
        '/^var\\(--[a-z-]+\\)$/',
        'transparent',
        'currentColor',
        'inherit',
        'initial',
        'unset'
      ]
    },
    
    // Spacing consistency
    'declaration-property-unit-allowed-list': {
      'margin': ['rem', 'em', 'px', '%', 'vh', 'vw'],
      'padding': ['rem', 'em', 'px', '%', 'vh', 'vw'],
      'gap': ['rem', 'em', 'px'],
      'width': ['rem', 'em', 'px', '%', 'vh', 'vw', 'fr'],
      'height': ['rem', 'em', 'px', '%', 'vh', 'vw'],
      'font-size': ['rem', 'em', 'px']
    },
    
    // Composition validation
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes']
      }
    ],
    
    // Performance rules
    'no-duplicate-selectors': true,
    'declaration-block-no-redundant-longhand-properties': true,
    
    // Accessibility rules
    'color-contrast': null, // Would need additional plugin
    
    // Formatting rules
    'indentation': 2,
    'string-quotes': 'single',
    'color-hex-case': 'lower',
    'color-hex-length': 'short'
  },
  
  // Ignore patterns
  ignoreFiles: [
    '**/node_modules/**',
    '**/build/**',
    '**/.next/**',
    '**/dist/**'
  ],
  
  // Custom syntax for CSS Modules
  customSyntax: require.resolve('postcss-scss')
};
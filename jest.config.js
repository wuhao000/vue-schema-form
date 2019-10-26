module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'jsx',
    'json',
    'vue'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

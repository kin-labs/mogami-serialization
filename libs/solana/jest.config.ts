/* eslint-disable */
export default {
  displayName: 'solana',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/'
  ],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/solana',
};

// transform: {
//   '^.+\\.[tj]s$': 'ts-jest',
// },

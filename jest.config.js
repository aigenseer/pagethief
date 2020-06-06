module.exports = {
    roots: ['<rootDir>/test', '<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'js'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    //moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  }
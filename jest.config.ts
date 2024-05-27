export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./tests'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

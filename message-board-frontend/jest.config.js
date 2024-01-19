module.exports = {
    testEnvironment: 'jsdom', // or 'node' for Node.js environment
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: [
      "**/__tests__/**/*.test.ts",
      "**/?(*.)+(test).ts"
    ],  
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    extensionsToTreatAsEsm: ['.ts'], // Treat TypeScript files as ESM
  };
  

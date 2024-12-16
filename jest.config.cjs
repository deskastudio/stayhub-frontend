module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',  // Menetapkan lingkungan pengujian untuk React
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Setup file untuk testing
  testMatch: [
    '<rootDir>/src/**/*.(test|spec).ts?(x)',  // Mencari file pengujian
  ],
  transformIgnorePatterns: ['node_modules/(?!(some-module)/)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',  // Menangani file CSS
  },
  collectCoverage: true,  // Mengaktifkan laporan cakupan kode
  coverageReporters: ['text', 'lcov'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.app.json',  // Tentukan path yang benar untuk tsconfig aplikasi Anda
    },
  },
};

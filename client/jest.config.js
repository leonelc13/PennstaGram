module.exports = {
    transformIgnorePatterns: ['node_modules/(?!\@?axios)'],
    automock: false,
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    },
    testEnvironment: 'jsdom',
    openHandlesTimeout: 2000
};
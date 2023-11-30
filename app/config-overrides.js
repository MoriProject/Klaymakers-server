const path = require('path');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        fs: false,
        net: false,
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve("path-browserify"),
    };

    return config;
};

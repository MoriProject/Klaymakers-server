const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
        },
    },
};

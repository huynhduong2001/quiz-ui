// Trong tệp setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://quiz-app-nodejs.onrender.com',
            changeOrigin: true,
        }),
    );
};

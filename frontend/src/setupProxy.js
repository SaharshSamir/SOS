const { createProxyMiddleware } = require('http-proxy-middleware');

const TIMEOUT = 30 * 60 * 1000;
module.exports = function (app) {
    app.use(
        ['/api', '/auth', '/profile'],
        createProxyMiddleware({
            target: 'http://localhost:5000',
            // proxyTimeout: TIMEOUT,
            // timeout: TIMEOUT,
        })
    );
};
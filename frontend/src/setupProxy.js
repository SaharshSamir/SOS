const { createProxyMiddleware } = require('http-proxy-middleware');

const TIMEOUT = 30 * 60 * 1000;
module.exports = function (app) {
    app.use(
        ['/api', '/auth'],
        createProxyMiddleware({
            target: 'http://localhost:5000',
            roxyTimeout: TIMEOUT,
            timeout: TIMEOUT,
        })
    );
};
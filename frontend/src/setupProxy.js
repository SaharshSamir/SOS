// const {createProxyMiddleware}  = require("http-proxy-middleware");

// module.exports = app => {
//     app.use(
//         ['/auth'],
//         createProxyMiddleware({
//             target: "http://localhost:8080"
//         })
//     )
// }

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        ["/auth", "/api"],
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true
        })
    );
};
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/account", {
            target: "http://10.20.19.29:30000/",
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                "^/account": "account",
            },
        }),
    );
};

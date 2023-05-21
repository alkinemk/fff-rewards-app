// api/api-proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = createProxyMiddleware({
  target: 'http://198.199.79.252:8000/',
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    '^/api': '/api',
  },
});

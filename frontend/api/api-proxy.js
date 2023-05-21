// api/api-proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware({
  target: 'http://198.199.79.252:8000',
  changeOrigin: true,
  secure: false,
});

module.exports = (req, res) => {
  apiProxy(req, res);
};

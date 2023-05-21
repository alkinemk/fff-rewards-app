// api/api-proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

const backendUrl = 'http://198.199.79.252:8000';

const apiProxy = createProxyMiddleware({
  target: backendUrl,
  changeOrigin: true,
  secure: false,
});

module.exports = (req, res) => {
  apiProxy(req, res);
};

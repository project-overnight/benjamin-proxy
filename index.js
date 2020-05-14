require('dotenv').config();
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyOptions = {
  target: 'localhost:9000',
  changeOrigin: true,

};

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT, () => console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`));

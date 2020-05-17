require('dotenv').config();
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();


app.use(createProxyMiddleware(`http://${process.env.PHOTO_HOST}:${process.env.PHOTO_PORT}/api/photos`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${process.env.DESCRIPTION_HOST}:${process.env.DESCRIPTION_PORT}/api/description`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${process.env.DESCRIPTION_HOST}:${process.env.DESCRIPTION_PORT}/api/place`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${process.env.RESERVATION_HOST}:${process.env.RESERVATION_PORT}/api/room`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${process.env.REVIEWS_HOST}:${process.env.REVIEWS_PORT}/api/reviews`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${process.env.REVIEWS_HOST}:${process.env.REVIEWS_PORT}/api/ratings`, { changeOrigin: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT, () => console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`));

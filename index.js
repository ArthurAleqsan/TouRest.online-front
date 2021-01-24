const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const API = 'https://api.tourest.online/api'


app.use('/public', express.static('public'));
app.use('/locales', express.static('locales'));
app.use('/assets', express.static('assets'));

app.use(
    '/v1/tours',
    createProxyMiddleware({
        target: API,
        changeOrigin: true,
        secure: false
    })
);
app.use(
    '/v1/categories',
    createProxyMiddleware({
        target: API,
        changeOrigin: true,
        secure: false
    })
);
app.use(
    '/v1/blogs',
    createProxyMiddleware({
        target: API,
        changeOrigin: true,
        secure: false
    })
);
app.use(async (req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});


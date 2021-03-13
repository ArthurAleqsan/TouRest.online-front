const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: 'liana.tonian@mayro.org',
        pass: 'Janmayrojan123'
    }
})


const app = express();
const PORT = process.env.PORT || 3000;

const API = 'https://api.tourest.online/api';

router.post('/email', async (request, response, next) => {
    const { name, surname, link, email, message, title, phone } = request.body;
    const { files } = request;
    const file = files ? files.file : null;
    const mailerMessage = {
        from: '"MAYRO MAILER" <email.notify@mayro.org>',
        to: 'info@mayro.school',
        subject: title,
        text: message,
        html: ` <div>
                    <p>Name: ${name} </p>
                    <p>Surname: ${surname} </p>
                    ${title ? `<p>Subject ${title}</p>` : ''}
                    ${link ? `<p>Link of Linkedin or portfolio : ${link} </p>` : ''}
                    ${phone ? `<p>Phone number : ${phone} </p>` : ''}
                    ${message ? `<p>Message : ${message} </p>` : ''}
                    <p>E-Mail: ${email} </p>
                </div>`,
        attachments: file ? {
            filename: file.name,
            content: file.data,
        } : null,
    };
    if (!mailerMessage.attachments) delete mailerMessage.attachments;
    transport.sendMail(mailerMessage, (err) => {
        const success = err ? false : true;
        if (err) console.log(err.message);
        response.status(200).json({ success });
    });
});

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


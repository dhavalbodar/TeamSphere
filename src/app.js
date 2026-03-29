const express = require('express')
const connectDB = require('./config/db')
const app = express()
const authRouter = require('./modules/auth/auth.routes')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
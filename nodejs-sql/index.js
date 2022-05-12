const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./src/utils/HttpException.utils');
const errorMiddleware = require('./src/middleware/error.middleware');
const userRouter = require('./src/routes/user.route');
const feedbackRouter = require('./src/routes/feedback.route');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enables cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 5000);

app.use(`/api/users`, userRouter);
app.use(`/api/feedbacks`, feedbackRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));

module.exports = app;

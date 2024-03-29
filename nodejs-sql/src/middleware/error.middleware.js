function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;

    console.log(`[Error] ${error}`);

    // If status code is 500 - sent Intrnal server error message
    message = status === 500 || !message ? 'Internal Server Error' : message;

    error = {
        type: 'error',
        status,
        message,
        ...(data) && data
    }

    res.status(status).send(error);
}

module.exports = errorMiddleware;

/**
 * {
    type: 'error',
    status: 404,
    message: 'Not Found'
    data: {...} // optional
}
 */

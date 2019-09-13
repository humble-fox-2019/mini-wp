module.exports = {
    errorHandler(err, req, res, next) {
        // console.log(err);
        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';

        if (err.name == 'ValidationError') {
            let errorMessages = [];
            for (let r in err.errors) {
                errorMessages.push(err.errors[r].message);
            }
            res.status(400).json({
                status: 400,
                errors: errorMessages
            });
        } else {
            res.status(status).json({
                status, 
                errors: [message]
            });
        }
    }
}
import { validationResult } from 'express-validator';

class ErrorHandler {
    handler(req, res, next) {
        const errors = validationResult(req);
        console.log(req.body)
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        }
        next();
    }
}

export default new ErrorHandler();
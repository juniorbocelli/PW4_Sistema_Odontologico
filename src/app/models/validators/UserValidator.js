import { body, validationResult } from 'express-validator';
class UserValidator {
    constructor() {
        this._v = [];
        this.validators = this.addNameValidator();
    }

    getValidators() {
        return this.validators;
    }

    addNameValidator() {
        return this._v.push( body('name').isLength({ min: 5 }));
    }

    addNameMail() {
        return this._v.push( body('mail').isEmail());
    }
}

export default new UserValidator;
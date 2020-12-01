import { body } from 'express-validator';
class ToothValidator {
    constructor() {
        this.validator = [];
        this.addCodeValidator();
        this.addNameValidator();
    }

    get validators() {
        return this.validator;
    }

    addCodeValidator() {
        this.validator.push(body('code')
        .trim()
        .toInt()
        .isInt().withMessage('O Código é inválido.'));
    }

    addNameValidator() {
        this.validator.push(body('name')
        .trim()
        .isLength({ min: 5 }).withMessage('O Nome deve ter no mínimo 5 caracteres.')
        .isLength({ max: 100 }).withMessage('O Nome deve ter no máximo 100 caracteres.'));
    }
}

export default new ToothValidator();
import { body } from 'express-validator';

class UserValidator {
    constructor() {
        this.validator = [];
        this.addNameValidator();
        this.addMailValidator();
        this.addPasswordValidator();
    }

    get validators() {
        return this.validator;
    }

    addNameValidator() {
        this.validator.push(body('name')
        .trim()
        .isLength({ min: 5 }).withMessage('O Nome deve ter no mínimo 5 caracteres.')
        .isLength({ max: 100 }).withMessage('O Nome deve ter no máximo 100 caracteres.'));
    }

    addMailValidator() {
        this.validator.push(body('mail')
        .trim()
        .not().isEmpty().withMessage('O E-mail é obrigatório.')
        .isLength({ max: 100 }).withMessage('O E-mail deve ter no máximo 100 caracteres.')
        .isEmail().withMessage('O E-mail informado deve ser válido.'));
    }

    addPasswordValidator() {
        this.validator.push(body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('A Senha deve ter no mínimo 5 caracteres.'));
    }
}

export default new UserValidator();
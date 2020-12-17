import { body } from 'express-validator';

class UserValidator {
    constructor() {
        this.validator = [];
        this.addNameValidator();
        this.addUsernameValidator();
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

    addUsernameValidator() {
        this.validator.push(body('username')
        .trim()
        .not().isEmpty().withMessage('O Nome de Usuário é obrigatório.')
        .isLength({ min: 5, max: 20 }).withMessage('O Nome de Usuário deve ter no mínimo 5 e no máximo 20 caracteres.'));
    }

    addPasswordValidator() {
        this.validator.push(body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('A Senha deve ter no mínimo 5 caracteres.'));
    }
}

export default new UserValidator();
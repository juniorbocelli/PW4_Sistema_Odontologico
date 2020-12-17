import { body } from 'express-validator';

class UserValidator {
    constructor(mode = 'create') {
        this.validator = [];
        this.addNameValidator();
        this.addUsernameValidator();
        if(mode === 'create') this.addPasswordValidator();
        if(mode === 'update') this.addOptionalPasswordValidator();
    }

    get validators() {
        return this.validator;
    }

    addNameValidator() {
        this.validator.push(body('name')
        .trim()
        .isLength({ min: 10 }).withMessage('O Nome deve ter no mínimo 10 caracteres.')
        .isLength({ max: 100 }).withMessage('O Nome deve ter no máximo 100 caracteres.'));
    }

    addUsernameValidator() {
        this.validator.push(body('username')
        .trim()
        .isLength({ min: 5, max: 20 }).withMessage('O Nome de Usuário deve ter no mínimo 5 e no máximo 20 caracteres.'));
    }

    addPasswordValidator() {
        this.validator.push(body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('A Senha deve ter no mínimo 5 caracteres.'));
    }

    addOptionalPasswordValidator() {
        this.validator.push(body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('A Senha deve ter no mínimo 5 caracteres.')
        .optional({checkFalsy: true}));
    }
}

export default UserValidator;
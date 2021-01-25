import { body } from 'express-validator';
class ClientValidator {
    constructor(req) {
        this.validator = [];
        this.addCpfValidator();
        this.addNameValidator();
        this.addGenderValidator();
        this.addBirthDateValidator();
        this.addMailValidator();
        this.addPhoneValidator();
        this.addCellValidator();
    }

    get validators() {
        return this.validator;
    }

    addCpfValidator() {
        this.validator.push(body('cpf')
        .trim()
        .matches(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/i).withMessage('O formato do CPF é inválido.')
        .blacklist('\.-'));
    }

    addNameValidator() {
        this.validator.push(body('name')
        .trim()
        .isLength({ min: 5 }).withMessage('O Nome deve ter no mínimo 5 caracteres.')
        .isLength({ max: 100 }).withMessage('O Nome deve ter no máximo 100 caracteres.'));
    }

    addGenderValidator() {
        this.validator.push(body('gender')
        .trim()
        .matches(/^[MF]$/g).withMessage('O Sexo é inválido.'));
    }

    addBirthDateValidator(){
        this.validator.push(body('birth_date')
        .trim()
        .isDate().withMessage('O formato da data é inválido'));
    }

    addMailValidator() {
        this.validator.push(body('mail')
        .trim()
        .not().isEmpty().withMessage('O E-mail é obrigatório.')
        .isLength({ max: 100 }).withMessage('O E-mail deve ter no máximo 100 caracteres.')
        .isEmail().withMessage('O E-mail informado deve ser válido.'));
    }

    addPhoneValidator() {
            this.validator.push(body('phone')
            .trim()
            .matches(/^\([0-9]{2}\)\s[0-9]{4}-[0-9]{4}$/g).withMessage('O Telefone é inválido.')
            .blacklist('()-\\s')
            .optional({checkFalsy: true}));
    }

    addCellValidator() {
        this.validator.push(body('cell')
        .trim()
        .matches(/^\([0-9]{2}\) 9 [0-9]{4}-[0-9]{4}$/g).withMessage('O Celular é inválido.')
        .blacklist('()-\\s'));
    }
}

export default new ClientValidator();
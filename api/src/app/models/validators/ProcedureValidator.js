import { body } from 'express-validator';

class ProcedureValidator {
    constructor() {
        this.validator = [];
        this.addNameValidator();
        this.addPriceValidator();
        this.addIsDentalValidator();
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

    addPriceValidator() {
        this.validator.push(body('price')
        .trim()
        .isCurrency({symbol: 'R$', 
        require_symbol: false, 
        allow_space_after_symbol: false, 
        symbol_after_digits: false, 
        allow_negatives: false, 
        parens_for_negatives: false, 
        negative_sign_before_digits: false, 
        negative_sign_after_digits: false, 
        allow_negative_sign_placeholder: false, 
        thousands_separator: '.', 
        decimal_separator: ',', 
        allow_decimal: true, 
        require_decimal: false, 
        digits_after_decimal: [2], 
        allow_space_after_digits: false}).withMessage('O Preço é inválido.'));
    }

    addIsDentalValidator() {
        this.validator.push(body('is_dental')
        .not().isEmpty().withMessage('O campo Dental é inválido.')
        .toBoolean());
    }
}

export default new ProcedureValidator();
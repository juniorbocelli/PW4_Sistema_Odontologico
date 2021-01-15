import { body } from 'express-validator';
class ConsultationValidator {
    constructor() {
        this.validator = [];
        this.addTimeValidator();
        this.addClientValidator();
        this.addProcedureValidator();
        this.addToothValidator();
    }

    get validators() {
        return this.validator;
    }

    addTimeValidator() {
        this.validator.push(body('time')
        .trim()
        .matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/).withMessage('A Data e a Hora são obrigatórios.')
        .custom((value, { req })=>{
            try {
                const date = Date.parse(value);
            } catch {
                throw new Error('Data e Hora inválidos.');
            }

            return true;
        }));
    }

    addClientValidator() {
        this.validator.push(body('client_id')
        .trim()
        .toInt()
        .isInt().withMessage('O Cliente é inválido.'));
    }

    addProcedureValidator() {
        this.validator.push(body('procedure_id')
        .trim()
        .toInt()
        .isInt().withMessage('O Procedimento é inválido.'));
    }

    addToothValidator() {
        this.validator.push(body('tooth_code')
        .trim()
        .toInt()
        .isInt().withMessage('O Dente é inválido.')
        .optional({checkFalsy: true}));
    }
}

export default new ConsultationValidator();
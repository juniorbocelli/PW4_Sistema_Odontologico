import Consultation from "../models/entities/Consultation";

class ConsultationController {
  async store(req, res) {
    const consultation = await Consultation.create(req.body);
    // Recentemente (07/12/2020) a equipe do express-validator adicionou um sanatizer replace(), mas aparentemente está bugado
    req.body.value = parseFloat(req.body.value.replace(/\./g, '').replace(',', '.'));
    
    return res.json(consultation)
  }
  async index(req, res) {
    const consultations = await Consultation.findAll({
        attributes: [
            'id','time', 'value', 'is_paid', 'is_confirmed'
        ],
        include: [
            { 
                model: Client,
                as: 'client'
            },
            {
                model: Procedure,
                as: 'procedure'
            },
            {
                model: Tooth,
                as: 'tooth'
            }
        ]
    });
    return res.json(consultations)
  }
  async update(req, res) {
    // Recentemente (07/12/2020) a equipe do express-validator adicionou um sanatizer replace(), mas aparentemente está bugado
    req.body.value = parseFloat(req.body.value.replace(/\./g, '').replace(',', '.'));
    
    let consultation = await Consultation.findByPk(req.params.id)
    consultation = await consultation.update(req.body)
    return res.json(consultation)
  }
  async delete(req, res) {
    let consultation = await Consultation.findByPk(req.params.id)
    consultation = await consultation.destroy(req.body)
    return res.json(consultation)
  }
  async show(req, res) {
    let consultation = await Consultation.findByPk(req.params.id, {
        attributes: [
            'id','time', 'value', 'is_paid', 'is_confirmed'
        ],
        include: [
            { 
                model: Client,
                as: 'client'
            },
            {
                model: Procedure,
                as: 'procedure'
            },
            {
                model: Tooth,
                as: 'tooth'
            }
        ]
    })
    return res.json(consultation)
  }
}

export default new ConsultationController();